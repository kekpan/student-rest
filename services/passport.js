const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user-model');


module.exports = (passport) => {
    passport.use(new LocalStrategy((username, password, done) => {
        User.findOne({username: username}, (err, user) => {
            if (err) return done(null, false, {message: `Σφάλμα κατά την επικοινωνία με τη βάση δεδομένων. Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`});
            if (!user) return done(null, false, {message: 'username:Δεν υπάρχει αυτό το όνομα χρήστη.'});
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) return done(null, false, {message: `Σφάλμα κατά την επικοινωνία με τη βάση δεδομένων. Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`});
                if (!isMatch) return done(null, false, {message: 'password:Λανθασμένος κωδικός πρόσβασης.'}); 
                done(null, user);
            });
        });
    }));
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            if (err) return done(null, false, {message: `Σφάλμα κατά την επικοινωνία με τη βάση δεδομένων. Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`});
            done(err, user);
        });
    });
}
