const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');
const jwt = require('jsonwebtoken');

const userOneId =new ObjectID();
const userTwoId =new ObjectID();


const users = [{
	_id : userOneId , 
	email: 'benoDev@test.com',
	password : "userOnePassword",
	tokens : [{
		access: 'auth',
		token :  jwt.sign({_id: userOneId,access:'auth'}, process.env.JWT_SECRET).toString()
	}]
},{
	_id : userTwoId ,
	email: 'fakebenoDev@test.com',
	password : "userTwoPassword",
	tokens : [{
		access: 'auth',
		token :  jwt.sign({_id: userTwoId,access:'auth'}, process.env.JWT_SECRET).toString()
	}]
}
]


const todos = [{
	_id: new ObjectID(),
	text: "First test todo"
	_creator:userOneId
},{
	_id: new ObjectID(),
	text: "Second test todo",
	completed: true,
	completedAt : 333
	_creator:userTwoId
}
];

const populateTodos = (done)=>{
	Todo.remove({}).then(()=>{
		Todo.insertMany(todos);
	}).then(()=> done());
}

const populateUsers = (done)=>{
	User.remove({}).then(()=>{
		let userOne = new User(users[0]).save()
		let userTwo = new User(users[1]).save()
		Promise.all([userOne,userTwo]);
	}).then(()=> done());
}


module.exports = {
	todos,
	users,
	populateTodos,
	populateUsers
}