//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
var nodemailer = require("nodemailer");



var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "fortesting883@gmail.com",
        pass: "HIDDEN_PASSWORD",
    },
});

const getDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formattedToday = dd + "/" + mm + "/" + yyyy;
    return formattedToday;
};

const getTime = () => {
    const today = new Date();
    let hrs = today.getHours();
    let min = today.getMinutes();

    if (hrs < 10) hrs = "0" + hrs;
    if (min < 10) min = "0" + min;

    const formattedToday = hrs + ":" + min;
    return formattedToday;
};

const app = express();

// To call a value form .env file
// console.log(process.env.SECRET);

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: "gateEntry",
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true }
    })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/gateEntry");

const userSchema = new mongoose.Schema({
    username: String,
    currentStatus: String,
    entry: [
        {
            date: String,
            time: String,
            status: String,
        },
    ],
});

const managementSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);
const Management = new mongoose.model("Management", managementSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.get("/", function (req, res) {
    res.render("login");
});

app.get("/admin", function (req, res) {
    res.render("admin");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.get("/registerManagement", function (req, res) {
    res.render("register");
});

app.get('/verifyManagement', function (req, res) {
    const username = req.query.username;
    Management.find(
        { username: username },
        function (err, foundUser) {

            if (err) {
                console.log(err);
            } else {
                // console.log(foundUser);
                res.send(foundUser);
            }
        }
    );
});


app.get("/apply-leave", function (req, res) {
    User.findById({ _id: req.user.id }, function (err, foundUser) {
        if (err) {
            console.log(err);
        } else {
            if (foundUser) {
                console.log(foundUser.id);
                // res.render(foundUser.entry);
                // console.log(foundUser.entry)
                res.render("base", { attendances: foundUser });
                // if(foundUser.attendance != null){
                //     res.render("base", {attendances: foundUser})
                // }
                // else{
                //     res.render("submit")
                // }
            }
        }
    });
});

app.get("/checkEntry", (req, res) => {
    // console.log(req.query);
    const rollNumber = req.query.rollNumber;
    console.log(rollNumber);
    User.find(
        { username: rollNumber + "@iiitu.ac.in" },
        function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    // console.log(foundUser[0])
                    res.send(foundUser[0]);
                }
            }
        }
    );
});

app.get("/verifyEmail", (req, res) => {
    const rollNumber = req.query.rollNumber;
    const otp = (Math.random() * 1000000).toFixed(0);
    var mailOptions = {
        from: 'Tushar <tushargarg0987@gmail.com>',
        to: `${rollNumber}@iiitu.ac.in`,
        subject: "Sending Email for verification",
        text: `${otp} is the OTP for your email verification`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });
    res.send(`${otp}`);
});

app.get("/submit", function (req, res) {
    if (req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});


app.get("/adminSubmit", (req, res)=> {
    // const rollNumber = req.body.att;
    // const submittedTime = req.body.time;
    const rollNumber = req.query.rollNumber;
    // console.log(req.query);
    User.find(
        { username: rollNumber + "@iiitu.ac.in" },
        function (err, foundUser) {
            // console.log(foundUser[0].entry);

            if (err) {
                console.log(err);
            } else {
                const formattedDate = getDate();
                const formattedTime = getTime();
                foundUser[0].entry = [
                    ...foundUser[0].entry,
                    {
                        date: formattedDate,
                        time: formattedTime,
                        status: foundUser[0].currentStatus == "out" ? "in" : "out",
                    },
                ];
                foundUser[0].currentStatus =
                    foundUser[0].currentStatus == "out" ? "in" : "out";
                foundUser[0].save(function () {
                    res.redirect("/admin");
                });
            }
        }
    );
});

app.get('/outStudents', (req, res) => {
    // console.log('requested');
    User.find(
        { currentStatus: 'out' },
        function (err, foundUser) {
            if (err) {
                console.log(err);
            } else {
                if (foundUser) {
                    // console.log(foundUser[0])
                    res.send(foundUser);
                }
            }
        }
    )
})

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/register", function (req, res) {
    var user = new User({
        username: req.body.username,
        currentStatus: "in",
    });
    user.save();

    res.redirect("/submit");
});


app.post("/registerManagement", function (req, res) {
    var security = new Management({
        username: req.body.username,
        password: req.body.password,
    });
    security.save();

    res.redirect("/registerManagement");
});

app.post("/login", function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local")(req, res, function () {
                res.redirect("/checkEntry");
            });
        }
    });
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
