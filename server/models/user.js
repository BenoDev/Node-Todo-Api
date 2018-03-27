const mongoose = require('mongoose');

const User = mongoose.model('User',{
	email : {
		type:String,
		required: true,
		minlength: 1,
		trim : true , //remove all spaces at the start and end
	}
});

module.exports = {User}