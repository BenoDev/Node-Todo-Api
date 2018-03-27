const mongoose = require('mongoose');

const Todo = mongoose.model('Todo',{
	text : {
		type:String,
		required: true,
		minlength: 1,
		trim : true , //remove all spaces at the start and end
	},
	completed :{
		type: Boolean,
		default : false
	},
	completedAt:{
		type: Number,
		default: null
	}
});

module.exports = {Todo}