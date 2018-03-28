const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');


// const id = '5abb01c6fbe82625a405c255hgh';

// //cheack validit ID method
// if(!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// }
// Todo.find({
// 	_id : id  //mongoose tranduce itself the string in ObkectId
// }).then((todos)=>{
// 	console.log('Todos', todos)
// });

// //find only single document
// Todo.findOne({
// 	_id : id  
// }).then((todo)=>{
// 	console.log('Todos', todo)
// });

// //find by Id (ideal when use id to queey)
// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found')
// 	}
// 	console.log('Todo by Id',todo)
// }).catch(e => console.log(e.message))

const idUser = '5abaa6d733db4a06b8ec57e5';

User.findById(idUser).then((user)=>{
	if(!user){
		return console.log('ID not found');
	}
	console.log('User by Id', user)
}).catch(e => console.log(e.message));