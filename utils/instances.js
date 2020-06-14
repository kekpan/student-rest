const Anncmnt = require('../models/anncmnt-model');
const User = require('../models/user-model');
const Photo = require('../models/photo-model');
const Tax = require('../models/tax-model');
const IdCard = require('../models/idCard-model');
const Application = require('../models/application-model');
const Schedule = require('../models/schedule-model');


exports.createAnncmnt = (req) => {    
    return new Anncmnt({
        title: req.body.title,
        author: req.user._id,
        body: req.body.body
    });
}

exports.editedAnncmnt = (req) => {    
    return {
        title: req.body.title,
        body: req.body.body,
        modified: true,
        modifiedAt: Date.now()
    };
}

exports.createUser = (req) => {
    let userType, department, damage;
    if (req.body.userType == 'Φοιτητής') userType = 'student'; else userType = 'pending';
    if (userType == 'student') department = req.body.department[0]; else department = req.body.department[1];
    if (userType == 'student') damage = 0; else damage = -1;
    return new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        motherSurname: req.body.motherSurname,
        username: req.body.username,
        password: req.body.password,
        idNumber: req.body.idNumber,
        userType: userType,
        department: department,
        email: req.body.email,
        mobilePhone: req.body.mobilePhone,
        address: {
            street: req.body.adrStreet,
            number: req.body.adrNumber,
            zipCode: req.body.adrZipCode
        },
        year: req.body.year,
        damage: damage
    });
}

exports.createApplication = (req) => {
    return new Application({
        userId: req.user._id,
        status: '0',
        text: ' ',
        photo: true,
        tax: true,
        idCard: true
    });
}

exports.createIdCard = (req) => {
    let idCard = new IdCard({
        userId: req.user._id
    });
    saveFile(idCard, req.body.idCard);
    return idCard;
}

exports.createTax = (req) => {
    let tax = new Tax({
        userId: req.user._id
    });
    saveFile(tax, req.body.tax);
    return tax;
}

exports.createPhoto = (req) => {
    let photo = new Photo({
        userId: req.user._id
    });
    saveFile(photo, req.body.photo);
    return photo;
}

exports.updateApplication = (req) => {
    let status;
    let photo = true;
    let tax = true;
    let idCard = true;
    if (req.body.answer === 'accept') {
        status = '1';
        text = ' ';
    } else {
        status = '2';
        if (req.body.text === null) text = ' ';
        else text = req.body.text;
        if (req.body.photo === '0') photo = false;
        if (req.body.tax === '0') tax = false;
        if (req.body.idCard === '0') idCard = false;
    }
    return {
        status: status,
        text: text,
        photo: photo,
        tax: tax,
        idCard: idCard
    }
}

exports.updateFile = (fileEncoded) => {
    if (fileEncoded == null) return
    const image = JSON.parse(fileEncoded)
    if (image != null) {
        fileImage = new Buffer.from(image.data, 'base64')
        fileType = image.type
    }
    return {
        fileImage: fileImage,
        fileType: fileType
    }
}

exports.createFirstSchedule = () => {
    return new Schedule({
        monday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        tuesday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        wednesday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        thursday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        friday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        saturday: { breakfast: ' ', lunch: ' ', dinner: ' ' },
        sunday: { breakfast: ' ', lunch: ' ', dinner: ' ' }
    });
}

exports.updateSchedule = (schedule) => {
    return {
        monday: { breakfast: schedule.monday[0], lunch: schedule.monday[1], dinner: schedule.monday[2] },
        tuesday: { breakfast: schedule.tuesday[0], lunch: schedule.tuesday[1], dinner: schedule.tuesday[2] },
        wednesday: { breakfast: schedule.wednesday[0], lunch: schedule.wednesday[1], dinner: schedule.wednesday[2] },
        thursday: { breakfast: schedule.thursday[0], lunch: schedule.thursday[1], dinner: schedule.thursday[2] },
        friday: { breakfast: schedule.friday[0], lunch: schedule.friday[1], dinner: schedule.friday[2] },
        saturday: { breakfast: schedule.saturday[0], lunch: schedule.saturday[1], dinner: schedule.saturday[2] },
        sunday: { breakfast: schedule.sunday[0], lunch: schedule.sunday[1], dinner: schedule.sunday[2] }
    };
}

function saveFile(file, fileEncoded) {
    if (fileEncoded == null) return
    const image = JSON.parse(fileEncoded)
    if (image != null ) {
        file.fileImage = new Buffer.from(image.data, 'base64')
        file.fileType = image.type
    }
}

exports.updateProfile = (body) => {
    return {
        email: body.email,
        mobilePhone: body.phoneNumber,
        address: {
            street: body.adrStreet,
            number: body.adrNumber,
            zipCode: body.adrZipCode
        },
    };
}