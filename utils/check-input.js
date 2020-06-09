exports.register = (req) => {
    req.checkBody('firstName', 'Το όνομα είναι απαραίτητο.').notEmpty();
    if (req.body.firstName) {
        req.checkBody('firstName', 'Το όνομα μπορεί να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
        req.checkBody('firstName', 'Το όνομα πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    }
    req.checkBody('lastName', 'Το επώνυμο είναι απαραίτητο.').notEmpty();
    if (req.body.lastName) {
        req.checkBody('lastName', 'Το επώνυμο μπορεί να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
        req.checkBody('lastName', 'Το επώνυμο πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    }
    req.checkBody('fatherName', 'Το όνομα πατέρας είναι απαραίτητο.').notEmpty();
    if (req.body.fatherName) {
        req.checkBody('fatherName', 'Το όνομα πατέρας μπορεί να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
        req.checkBody('fatherName', 'Το όνομα πατέρας πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    }
    req.checkBody('motherSurname', 'Το επώνυμο μητέρας είναι απαραίτητο.').notEmpty();
    if (req.body.motherSurname) {
        req.checkBody('motherSurname', 'Το επώνυμο μητέρας μπορεί να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
        req.checkBody('motherSurname', 'Το επώνυμο μητέρας πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    }
    req.checkBody('idNumber', 'Ο ΑΜ/ΑΜΚΑ είναι απαραίτητος.').notEmpty();
    if (req.body.idNumber) req.checkBody('idNumber', 'Ο ΑΜ/ΑΜΚΑ μπορεί να περιέχει μόνο αριθμούς.').isNumeric();
    req.checkBody('year', 'Το έτος είναι απαραίτητο.').notEmpty();
    if (req.body.year) {
        req.checkBody('year', 'Το έτος πρέπει να είναι ακέραιος αριθμός.').isInt();
        req.checkBody('year', 'Το έτος δεν μπορεί να είναι πάνω από 100 χρόνια πριν ή μετά από το τρέχον.').isInt({min: 1920, max: 2020});
    }
    req.checkBody('username', 'Το username είναι απαραίτητο.').notEmpty();
    if (req.body.username) {
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο λατινικούς αλφαριθμητικούς χαρακτήρες').isAlphanumeric();
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο πεζά γράμματα').isLowercase();
    }
    req.checkBody('userType', 'Ο τύπος χρήστη είναι απαραίτητος. Χρησιμοποιείστε τα κουμπιά στο πάνω μέρος της φόρμας.').notEmpty();
    if (req.body.userType) req.checkBody('userType', 'Ο τύπος χρήστη δεν είναι έγκυρος. Χρησιμοποιείστε τα κουμπιά στο πάνω μέρος της φόρμας.').isIn(['Φοιτητής', 'Εργαζόμενος', 'Διαχειριστής']);
    req.checkBody('password', 'Ο κωδικός πρόσβασης είναι απαραίτητος.').notEmpty();
    req.checkBody('password2', 'Η επαλήθευση κωδικού είναι απαραίτητη.').notEmpty();
    if (req.body.password && req.body.password2) req.checkBody('password2', 'Οι κωδικοί δεν ταιριάζουν.').equals(req.body.password);
    if (req.body.department[0] == '' && req.body.department[1] == '') req.checkBody('department', 'Το τμήμα είναι απαραίτητο. Χρησιμοποιείστε το dropdown μενού.').notEmpty();
    if (req.body.email) req.checkBody('email', 'Το email δεν είναι έγκυρο.').isEmail();
    if (req.body.mobilePhone) req.checkBody('mobilePhone', 'Ο αριθμός τηλεφώνου δεν είναι έγκυρος.').isMobilePhone('el-GR');
    if (req.body.adrStreet || req.body.adrNumber || req.body.adrZipCode) {
        req.checkBody('adrStreet', 'Προσθέστε οδό ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
        req.checkBody('adrNumber', 'Προσθέστε αριθμό ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
        req.checkBody('adrZipCode', 'Προσθέστε ΤΚ ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
    }
    if (req.body.adrStreet) {
        req.checkBody('adrStreet', 'Η οδός της διεύθυνσης μπορεί να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
        req.checkBody('adrStreet', 'Η οδός της διεύθυνσης πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    }
    if (req.body.adrNumber) req.checkBody('adrNumber', 'Ο αριθμός της διεύθυνσης πρέπει να είναι ακέραιος αριθμός.').isInt();
    if (req.body.adrZipCode) req.checkBody('adrZipCode', 'Ο ΤΚ της διεύθυνσης δεν είναι έγκυρος.').isPostalCode('GR');
}

exports.login = (req) => {
    req.checkBody('username', 'Το username είναι απαραίτητο.').notEmpty();
    if (req.body.username) {
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο λατινικούς αλφαριθμητικούς χαρακτήρες').isAlphanumeric();
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο πεζά γράμματα').isLowercase();
    }
    req.checkBody('password', 'Ο κωδικός πρόσβασης είναι απαραίτητος.').notEmpty();
}

exports.anncmnt = (req) => {
    req.checkBody('title', 'Ο τίτλος είναι απαραίτητος.').notEmpty();
    req.checkBody('body', 'Το περιεχόμενο είναι απαραίτητο.').notEmpty();
}
