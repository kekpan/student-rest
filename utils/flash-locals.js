const formatLoginErr = require('../utils/login-err');


module.exports = (res) => {
    let flashMessages = res.locals.getMessages();
    let showErrors, showSuccesses = false;
    if (flashMessages.error) {showErrors = true; flashMessages = formatLoginErr(flashMessages);}
    if (flashMessages.success) showSuccesses = true;
    let locals = {
        showErrors: showErrors,
        errors: flashMessages.error,
        errorsParam: flashMessages.errorParam,
        showSuccesses: showSuccesses,
        successes: flashMessages.success
    };
    console.log(flashMessages.data)
    if (flashMessages.data) locals.data = flashMessages.data[0];
    return locals;
}
