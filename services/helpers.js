exports.consoleLog = (something) => {
    return console.log(something);
};

exports.joinStr = (str1, str2) => {
    return str1.concat(str2);
}

exports.joinStrSp = (str1, str2) => {
    return str1.concat(' ', str2);
}

exports.dmyFormat = (t) => {
    let dd = t.getDate(); if (dd < 10) dd = '0' + dd;
    let mm = t.getMonth() + 1; if (mm < 10) mm = '0' + mm;
    return dd + '/' + mm + '/' + t.getFullYear();
}

exports.dmyTimeFormat = (t) => {
    let dd = t.getDate(); if (dd < 10) dd = '0' + dd;
    let mm = t.getMonth() + 1; if (mm < 10) mm = '0' + mm;
    let hh = t.getHours(); if (hh < 10) hh = '0' + hh;
    let ms = t.getMinutes(); if (ms < 10) ms = '0' + ms;
    return dd + '/' + mm + '/' + t.getFullYear() + ' - ' + hh + ':' + ms;
}

exports.slice = (str) => {
    if (str.length <= 201) return str.slice(0, 200);
    else return str.slice(0, 200).concat('...');
}

exports.checkIfValid = (arr, inputName) => {
    if (!arr) return;
    if (arr.includes(inputName)) return 'border border-danger';
}

exports.checkDisplay = (data, compare) => {
    if (data == compare) return;
    else return 'display: none;';
}

exports.makeLink = function (path, objectId) {
    return path + objectId.toString();
}

exports.ifEqual = function (arg1, arg2) {
    if (arg1 === arg2) return true;
    else return false;
}

exports.imagePath = function (file) {
    return `data:${file.fileType};charset=utf-8;base64,${file.fileImage.toString('base64')}`;
}

exports.userIsSec = function (userType, userDep) {
    if (userDep === 'Γραμματεία' && userType !== 'pending') {
        return true;
    } else {
        return false;
    }
}

exports.userIsStud = function (userType) {
    if (userType === 'student') {
        return true;
    } else {
        return false;
    }
}

exports.cardAccess = function (user) {
    if (user.userType === 'student' || (user.department === 'Γραμματεία' && user.userType !== 'pending')) {
        return true;
    } else {
        return false;
    }
}

exports.checkFormVisibility = (arr1, arr2) => {
    if (arr1 || arr2) return;
    else return 'display: none;';
}

exports.checkDeptValue = (arr, arrPos) => {
    if (!arr) return;
    if (arr[arrPos] !== '') return arr[arrPos];
    else return false;
}

exports.userIsAdmin = function (userType) {
    if (userType === 'admin') {
        return true;
    } else {
        return false;
    }
}