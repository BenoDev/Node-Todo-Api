const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash')

let UserSchema = new mongoose.Schema({
	email : {
		type:String,
		required: true,
		minlength: 1,
		trim : true , //remove all spaces at the start and end
		unique : true,
		validate :{
		validator: validator.isEmail,
		message : '{VALUE} is not valid email'
		}
	},
	password: {
		type:String,
		required: true,
		minlength:6
	},
	tokens : [{
		access:{
			type:String,
			required:true
		},
		token : {
			type:String,
			required:true
		}
	}]
});

UserSchema.methods.toJSON = function () {
	let user = this;
	let userObject = user.toObject();

	return _.pick(userObject,['_id','email']);
};

UserSchema.methods.generateAuthToken = function () {
	let user = this;
	let access = 'auth';
	let token = jwt.sign({_id: user._id.toHexString(),access}, 'asd123').toString();

	user.tokens.push({access,token})
	return user.save().then(()=>{
		return token;
	});
};

UserSchema.statics.findByToken = function(token) {
	let User = this;
	let decoded;

	try{
		decoded = jwt.verify(token, 'asd123' )
	}catch(e){
		return Promise.reject('test');
	}

	return User.findOne({
		'_id': decoded._id,
		'tokens.token': token,
		'tokens.access' : 'auth'
	})
}

const User = mongoose.model('User', UserSchema);

module.exports = {User}