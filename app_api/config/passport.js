const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (username, password, done) => {
            const q = await User.findOne({ email: username })
            .exec();

            //Uncomment the following line to show results of query
            //on console
            // console.log(q);
            
            if (!q) {
                return done(null, false, {
                    message: "Incorrect username.",
                });
            }
            if (!q.validPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password.",
                });
            }
            return done(null, q);
        }
    )
);