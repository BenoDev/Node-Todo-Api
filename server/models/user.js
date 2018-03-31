const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
	email : {
		type:String,
		required: true,
		minlength: 1,
		trim : true , //remove all spaces at the start and end
		unique : true,
		validate:{
		validator: (value)=>{
						return validator.isEmail(value);
					},
					 message:'{VALUE} is not a valid Email'

		},

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

	user.tokens = user.tokens.concat({access,token})
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

UserSchema.pre('save', function(next){
	let user = this;

	if(user.isModified('password')){
		bcrypt.genSalt(10,(err,salt)=>{
			bcrypt.hash(user.password,salt,(err,hash)=>{
				user.password = hash;
				next();
			});
		});
	}else{
		next();
	}

});

const User = mongoose.model('User', UserSchema);

module.exports = {User}