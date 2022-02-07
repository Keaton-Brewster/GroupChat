const passport = require("passport");
// const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");

passport.use(
    "local",
    new LocalStrategy(
        {
            usernameField: "email",
        },
        /// I wonder if I can implement some form of double authentication for this
        /// The way most modern apps handle authentication
        (email, id, done) => {
            console.log("enter into passport function")
            db.User.findOne({
                email,
            }).then((user) => {
                // If there's no user with the given email
                if (!user) {
                    return done(null, false, {
                        message: "Incorrect email!",
                    });
                }
                // checking the users password in db with the entered password
                if (user.g_id !== id) {
                    return done(null, false, {
                        message: "Error authenticating",
                    });
                }
                // If none of the above, return the user
                return done(null, user);
            });
            return console.log("End of passport function")
        }
    )
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;