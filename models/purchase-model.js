const mongoose = require('mongoose');


const purchaseSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    cart: {type: Object, required: true},
    paymentId: {type: String, required: true}
});


module.exports = mongoose.model('Purchase', purchaseSchema);
