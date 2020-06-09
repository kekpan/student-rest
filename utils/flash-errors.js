exports.valid = (req, res, result, redirect) => {
    result.array().forEach((error) => {
        req.flash('error', error.msg); 
        req.flash('errorParam', error.param);
    });
    req.flash('data', req.body)
    res.redirect(redirect);
}

exports.regUser = (req, res, err) => {
    if (err.name === 'MongoError' && err.code === 11000) req.flash('error', 'Υπάρχει κάτι διπλό.');
    else req.flash('error', `Σφάλμα κατά την εγγραφή.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`);
    res.redirect('/users/register');
}

exports.saveAnncmnt = (req, res, err) => {
    req.flash('error', `Σφάλμα κατά την αποθήκευση της ανακοίνωσης στη βάση δεδομένων.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`);
    res.redirect('/anncmnts/add')
}

exports.findAnncmnts = (req, res, err) => {
    req.flash('error', `Σφάλμα κατά την εύρεση των ανακοινώσεων στη βάση δεδομένων.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπέυθυνο. ${err}`);
    res.redirect('/');

}

exports.findAnncmnt = (req, res, err) => {
    req.flash('error', `Σφάλμα κατά την εύρεση της ανακοίνωσης στη βάση δεδομένων.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`);
    res.redirect('/anncmnts');
}

exports.findAuthor = (req, res, err) => {
    req.flash('error', `Σφάλμα κατά την εύρεση του συγγραφέα της ανακοίνωσης στη βάση δεδομένων.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`);
    res.redirect('/anncmnts');
}

exports.updateAnncmnt = (req, res, err, body, anncmntId) => {
    req.flash('error', `Σφάλμα κατά την τροποποίηση της ανακοίνωσης στη βάση δεδομένων.\
    Αν το πρόβλημα επιμένει, επικοινωνείστε με κάποιον υπεύθυνο. ${err}`);
    req.flash('data', body);
    res.redirect(`/anncmnts/${anncmntId}`);
}

exports.missingFile = (req, res, application) => {
    let idCard = false;;
    let photo = false;;
    let tax = false;;
    if (application !== false) {
        idCard = application.idCard;
        photo = application.photo;
        tax = application.tax;
    }
    let missing = false;
    if (req.body.idCard === "" && !idCard) {
        req.flash('error', 'Παρακαλώ εισάγετε φοιτητική ταυτότητα');
        missing = true;
    }
    if (req.body.photo === "" && !photo) {
        req.flash('error', 'Παρακαλώ εισάγετε φωτογραφία');
        missing = true;
    }
    if (req.body.tax === "" && !tax) {
        req.flash('error', 'Παρακαλώ εισάγετε φορολογική δήλωση');
        missing = true;
    }
    if (missing) {
        req.flash('error', 'Βεβαιωθείτε ότι όλα τα αρχεία έχουν ανέβει πλήρως πριν κάνετε την υποβολή σας');
        res.redirect('/card/new');
        return true;
    } else {
        return false;
    }
}
