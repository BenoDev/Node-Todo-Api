const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

//todo.remove

// Todo.remove({}).then(result=>{
// 	console.log(result);
// });

// Todo.findOneAndRemove({_id:"5abd00f68cd74ae2819f76f8"}).then((todo)=>{
// 	console.log(todo);
// });


Todo.findByIdAndRemove('5abd00f68cd74ae2819f76f8').then((todo)=>{
	console.log(todo);
});
