
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/user");

passport.use(new LocalStrategy({
    usernameField: "email",
    passReqToCallback: true,
},
    //find user and establish the identity
    async (req, email, password, done) => {

        try {
            const user = await User.findOne({ email: email });
            if (user) {
                if (user.password !== password) {
                    console.log("Invalid Pass");
                    return done(null, false);
                }
                return done(null, user);
            } else {
                console.log("User not found");
                return done();
            }
        } catch (error) {
            console.log(error, "error in finding the user");
            return done(error); 
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.log(error);
        done(error);
    }

});


passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user not signed in
    console.log("user not signed in");
    return res.redirect("/user/sign-in");
}


//creating method in passport to set authenticated user
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;