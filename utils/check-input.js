exports.register = (req) => {
    // Check name validity
    req.checkBody('firstName', 'Το όνομά σας είναι απαραίτητο.').notEmpty();
    if (req.body.firstName) {
        if (req.body.firstName.includes('-')) {
            let separatedNames = req.body.firstName.split('-');
            if (separatedNames.length !=2 ){
                req.checkBody('firstName', 'Τα ονόματά σας δεν είναι έγκυρα.\
                Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
            } else {
                req.body.firstName1 = separatedNames[0]
                req.checkBody('firstName1', 'Το πρώτο όνομά σας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                req.checkBody('firstName1', 'Το πρώτο όνομά σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                req.body.firstName2 = separatedNames[1]
                req.checkBody('firstName2', 'Το δεύτερο όνομά σας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                req.checkBody('firstName2', 'Το δεύτερο όνομά σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
            }
        } else {
            req.checkBody('firstName', 'Το όνομά σας πρέπει να περιέχει μόνο ελληνικά γράμματα.\
            Αν έχετε δύο ονόματα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
            req.checkBody('firstName', 'Το όνομά σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
        }
    }
    // Check surname validity
    req.checkBody('lastName', 'Το επώνυμό σας είναι απαραίτητο.').notEmpty();
    if (req.body.lastName) {
        if (req.body.lastName.includes('-')) {
            let separatedNames = req.body.lastName.split('-');
            if (separatedNames.length !=2 ){
                req.checkBody('lastName', 'Τα επώνυμά σας δεν είναι έγκυρα.\
                Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
            } else {
                req.body.lastName1 = separatedNames[0]
                req.checkBody('lastName1', 'Το πρώτο επώνυμό σας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                req.checkBody('lastName1', 'Το πρώτο επώνυμό σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                req.body.lastName2 = separatedNames[1]
                req.checkBody('lastName2', 'Το δεύτερο επώνυμό σας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                req.checkBody('lastName2', 'Το δεύτερο επώνυμό σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
            }
        } else {
            req.checkBody('lastName', 'Το επώνυμό σας πρέπει να περιέχει μόνο ελληνικά γράμματα.\
            Αν έχετε δύο επώνυμα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
            req.checkBody('lastName', 'Το επώνυμό σας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
        }
    }
    // Check father name and surname validity
    req.checkBody('fatherName', 'Το όνομα και το επώνυμο πατέρα είναι απαραίτητα.').notEmpty();
    if (req.body.fatherName) {
        if (!req.body.fatherName.includes(' ')) {
            req.checkBody('fatherName', 'Το όνομα και το επώνυμο πατέρα πρέπει να χωρίζονται με κενό.').isEmpty();
        } else {
            let separatedNameSurname = req.body.fatherName.split(' ');
            if (separatedNameSurname.length != 2) {
                req.checkBody('fatherName', 'Το όνομα και το επώνυμο πατέρα δεν είναι έγκυρα.\
                Βεβαιωθείτε ότι έχετε αφήσει ένα και μόνο ένα κενό μεταξύ τους.').isEmpty();
            } else {
                req.body.fatherName1 = separatedNameSurname[0];
                req.body.fatherName2 = separatedNameSurname[1];
                if (req.body.fatherName1.includes('-')) {
                    let separatedNames = req.body.fatherName1.split('-');
                    if (separatedNames.length !=2) {
                        req.checkBody('fatherName', 'Το ονόματα πατέρα δεν είναι έγκυρα.\
                        Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
                    } else {
                        req.body.fatherName11 = separatedNames[0]
                        req.checkBody('fatherName11', 'Το πρώτο όνομα πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('fatherName11', 'Το πρώτο όνομα πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                        req.body.fatherName12 = separatedNames[1]
                        req.checkBody('fatherName12', 'Το δεύτερο όνομα πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('fatherName12', 'Το δεύτερο όνομα πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                    }
                } else {
                    req.checkBody('fatherName1', 'Το όνομα πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.\
                    Αν πρόκειται για δύο ονόματα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
                    req.checkBody('fatherName1', 'Το όνομα πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                }
                if (req.body.fatherName2.includes('-')) {
                    let separatedNames = req.body.fatherName2.split('-');
                    if (separatedNames.length !=2) {
                        req.checkBody('fatherName', 'Το επώνυμα πατέρα δεν είναι έγκυρα.\
                        Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
                    } else {
                        req.body.fatherName21 = separatedNames[0]
                        req.checkBody('fatherName21', 'Το πρώτο επώνυμο πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('fatherName21', 'Το πρώτο επώνυμο πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                        req.body.fatherName22 = separatedNames[1]
                        req.checkBody('fatherName22', 'Το δεύτερο επώνυμο πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('fatherName22', 'Το δεύτερο επώνυμο πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                    }
                } else {
                    req.checkBody('fatherName2', 'Το επώνυμο πατέρα πρέπει να περιέχει μόνο ελληνικά γράμματα.\
                    Αν πρόκειται για δύο επώνυμα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
                    req.checkBody('fatherName2', 'Το επώνυμο πατέρα πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                }
            }
        }
    }
    // Check mother name and surname validity
    req.checkBody('motherSurname', 'Το όνομα και το επώνυμο μητέρας είναι απαραίτητα.').notEmpty();
    if (req.body.motherSurname) {
        if (!req.body.motherSurname.includes(' ')) {
            req.checkBody('motherSurname', 'Το όνομα και το επώνυμο μητέρας πρέπει να χωρίζονται με κενό.').isEmpty();
        } else {
            let separatedNameSurname = req.body.motherSurname.split(' ');
            if (separatedNameSurname.length != 2) {
                req.checkBody('motherSurname', 'Το όνομα και το επώνυμο μητέρας δεν είναι έγκυρα.\
                Βεβαιωθείτε ότι έχετε αφήσει ένα και μόνο ένα κενό μεταξύ τους.').isEmpty();
            } else {
                req.body.motherSurname1 = separatedNameSurname[0];
                req.body.motherSurname2 = separatedNameSurname[1];
                if (req.body.motherSurname1.includes('-')) {
                    let separatedNames = req.body.motherSurname1.split('-');
                    if (separatedNames.length !=2) {
                        req.checkBody('motherSurname', 'Το ονόματα μητέρας δεν είναι έγκυρα.\
                        Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
                    } else {
                        req.body.motherSurname11 = separatedNames[0]
                        req.checkBody('motherSurname11', 'Το πρώτο όνομα μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('motherSurname11', 'Το πρώτο όνομα μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                        req.body.motherSurname12 = separatedNames[1]
                        req.checkBody('motherSurname12', 'Το δεύτερο όνομα μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('motherSurname12', 'Το δεύτερο όνομα μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                    }
                } else {
                    req.checkBody('motherSurname1', 'Το όνομα μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.\
                    Αν πρόκειται για δύο ονόματα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
                    req.checkBody('motherSurname1', 'Το όνομα μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                }
                if (req.body.motherSurname2.includes('-')) {
                    let separatedNames = req.body.motherSurname2.split('-');
                    if (separatedNames.length !=2) {
                        req.checkBody('motherSurname', 'Το επώνυμα μητέρας δεν είναι έγκυρα.\
                        Βεβαιωθείτε ότι τα έχετε διαχωρίσει με μία και μόνο μία παύλα (-) μεταξύ τους.').isEmpty();
                    } else {
                        req.body.motherSurname21 = separatedNames[0]
                        req.checkBody('motherSurname21', 'Το πρώτο επώνυμο μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('motherSurname21', 'Το πρώτο επώνυμο μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                        req.body.motherSurname22 = separatedNames[1]
                        req.checkBody('motherSurname22', 'Το δεύτερο επώνυμο μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.').isAlpha('el-GR');
                        req.checkBody('motherSurname22', 'Το δεύτερο επώνυμο μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                    }
                } else {
                    req.checkBody('motherSurname2', 'Το επώνυμο μητέρας πρέπει να περιέχει μόνο ελληνικά γράμματα.\
                    Αν πρόκειται για δύο επώνυμα, βεβαιωθείτε ότι τα διαχωρίσατε με παύλα (-) και χωρίς κενά.').isAlpha('el-GR');
                    req.checkBody('motherSurname2', 'Το επώνυμο μητέρας πρέπει να γραφεί μόνο με κεφαλαία γράμματα.').isUppercase('el-GR');
                }
            }
        }
    }
    // Check ID number validity
    let idNumberType;
    if (req.body.userType == 'Φοιτητής') idNumberType = 'ΑΜ'; else idNumberType = 'ΑΜΚΑ'
    req.checkBody('idNumber', `Ο ${idNumberType} είναι απαραίτητος.`).notEmpty();
    if (req.body.idNumber) {
        req.checkBody('idNumber', `Ο ${idNumberType} μπορεί να περιέχει μόνο αριθμούς.`).isNumeric();
        req.checkBody('idNumber', `Ο ${idNumberType} πρέπει να έχει τουλάχιστον τέσσερα ψηφία.`).isLength({min: 4, max: undefined});
    }
    // Check year validity
    req.checkBody('year', 'Το έτος είναι απαραίτητο.').notEmpty();
    if (req.body.year) {
        req.checkBody('year', 'Το έτος πρέπει να είναι ακέραιος αριθμός.').isInt();
        req.checkBody('year', 'Το έτος δεν μπορεί να είναι πάνω από 100 χρόνια πριν ή μετά από το τρέχον.').isInt({min: 1920, max: 2020});
    }
    // Check username validity
    req.checkBody('username', 'Το username είναι απαραίτητο.').notEmpty();
    if (req.body.username) {
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο λατινικούς αλφαριθμητικούς χαρακτήρες').isAlphanumeric();
        req.checkBody('username', 'Το username μπορεί να περιέχει μόνο πεζά γράμματα').isLowercase();
    }
    // Check user type validity
    req.checkBody('userType', 'Ο τύπος χρήστη είναι απαραίτητος. Χρησιμοποιείστε τα κουμπιά στο πάνω μέρος της φόρμας.').notEmpty();
    if (req.body.userType) req.checkBody('userType', 'Ο τύπος χρήστη δεν είναι έγκυρος. Χρησιμοποιείστε τα κουμπιά στο πάνω μέρος της φόρμας.').isIn(['Φοιτητής', 'Εργαζόμενος']);
    // Check password validity
    req.checkBody('password', 'Ο κωδικός πρόσβασης είναι απαραίτητος.').notEmpty();
    req.checkBody('password', 'Ο κωδικός πρόσβασης πρέπει να έχει τουλάχιστον τρεις χαρακτήες.').isLength({min: 3, max: undefined});
    req.checkBody('password2', 'Η επαλήθευση κωδικού είναι απαραίτητη.').notEmpty();
    if (req.body.password && req.body.password2) req.checkBody('password2', 'Οι κωδικοί δεν ταιριάζουν.').equals(req.body.password);
    // Check department validity
    if (req.body.department[0] == '' && req.body.department[1] == '') req.checkBody('department', 'Το τμήμα είναι απαραίτητο. Χρησιμοποιείστε το dropdown μενού.').notEmpty();
    // Check email validity
    if (req.body.email) req.checkBody('email', 'Το email δεν είναι έγκυρο.').isEmail();
    // Check mobile phone validity
    if (req.body.mobilePhone) req.checkBody('mobilePhone', 'Ο αριθμός τηλεφώνου δεν είναι έγκυρος.').isMobilePhone('el-GR');
    // Check address validity
    if (req.body.adrStreet || req.body.adrNumber || req.body.adrZipCode) {
        req.checkBody('adrStreet', 'Προσθέστε οδό ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
        req.checkBody('adrNumber', 'Προσθέστε αριθμό ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
        req.checkBody('adrZipCode', 'Προσθέστε ΤΚ ή διαγράψτε τα υπόλοιπα στοιχεία της διεύθυνσης.').notEmpty();
    }
    if (req.body.adrStreet) req.checkBody('adrStreet', 'Η οδός της διεύθυνσης πρέπει να γραφτεί με κεφαλαία γράμματα.').isUppercase('el-GR');
    if (req.body.adrNumber) req.checkBody('adrNumber', 'Ο αριθμός της διεύθυνσης πρέπει να είναι ακέραιος αριθμός.').isInt();
    if (req.body.adrZipCode) req.checkBody('adrZipCode', 'Ο ΤΚ της διεύθυνσης δεν είναι έγκυρος.').blacklist(' ').isPostalCode('GR');
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

exports.checkout = (req) => {
    req.checkBody('card-name', 'Το όνομα του κατόχου της κάρτας είναι απαραίτητο.').notEmpty();
    req.checkBody('card-number', 'Ο αριθμός της πιστωτικής κάρτας είναι απαραίτητος.').notEmpty();
    req.checkBody('card-expiry-month', 'Ο μήνας λήξης της κάρτας είναι απαραίτητος.').notEmpty();
    req.checkBody('card-expiry-year', 'Το έτος λήξης της κάρτας είναι απαραίτητο.').notEmpty();
    req.checkBody('card-cvc', 'Ο κωδικός ασφαλείας της κάρτας είναι απαραίτητος').notEmpty();
}
