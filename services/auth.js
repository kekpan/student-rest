exports.ensure = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.flash('error', 'Παρακαλώ συνδεθείτε.');
    res.redirect('/users/login');
}

exports.ensureSec = (req, res, next) => {
    if (req.user.userType !== 'pending' && req.user.department === 'Γραμματεία') return next();
    res.redirect('/');
}

exports.ensureStud = (req, res, next) => {
    if (req.user.userType === 'student') return next();
    res.redirect('/');
}
