module.exports = (flashMessages) => {
    if (['username:', 'password:'].some((errorParam) => flashMessages.error[0].includes(errorParam))) {
        let res = flashMessages.error[0].split(':');
        flashMessages.errorParam = [res[0]];
        flashMessages.error[0] = res[1]
    }
    return flashMessages;
}
