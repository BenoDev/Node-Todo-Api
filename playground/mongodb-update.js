// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err,client)=>{
	let db = client.db('TodoApp');
	if(err){
		return console.log('Unable to connect to MongodDB server');
	}
	console.log('Connected to MongodDB server');

	// db.collection('Todos').findOneAndUpdate({
	// 	_id: new ObjectID("5aba772c3cb61227ffe37952")
	// },{
	// 	$set:{
	// 		completed:true
	// 	}
	// },{
	// 	returnOriginal:false
	// }).then(result => console.log(result))
	
	db.collection('Users').findOneAndUpdate({
		_id: new ObjectID("5ab9a8a65b28a08d1c5d597a")
	},{
		$set:{
			name: "Beno"
		},
		$inc:{
			age: 1
		}
	},{
		returnOriginal:false
	}).then(result => console.log(result))


	// client.close();
});