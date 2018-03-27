// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

// const obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017', (err,client)=>{
	let db = client.db('TodoApp');
	if(err){
		return console.log('Unable to connect to MongodDB server');
	}
	console.log('Connected to MongodDB server');

	// db.collection('Todos').insertOne({
	// 	text:'Something to do',
	// 	completed : false
	// },(err,result)=>{
	// 	if(err){
	// 		return console.log('Unable to insert todo',err);
	// 	}
	// 	console.log(JSON.stringify(result.ops,undefined,2));
	// });

	// db.collection('Users').insertOne({
	// 	name:'Beno',
	// 	age : 27,
	// 	location :'Italy'
	// },(err,result)=>{
	// 	if(err){
	// 		return console.log('Unable to insert user',err);
	// 	}
	// 	// console.log(JSON.stringify(result.ops,undefined,2));
	// 	console.log(result.ops[0]._id.getTimestamp())
	// });

	client.close();
});