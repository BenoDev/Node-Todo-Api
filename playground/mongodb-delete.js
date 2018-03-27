// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err,client)=>{
	let db = client.db('TodoApp');
	if(err){
		return console.log('Unable to connect to MongodDB server');
	}
	console.log('Connected to MongodDB server');

	// db.collection('Todos').deleteMany({text:'Eat Lunch'}).then((result)=>{
	// 	console.log(result);
	// });

	// db.collection('Todos').deleteOne({text:'Eat Lunch'}).then((result)=>{
	// 	console.log(result);
	// });


	// db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
	// 	console.log(result);
	// });
	
	db.collection('Users').deleteMany({name: "Beno"}).then((result)=>{
		console.log(result);
	});
	db.collection('Users').findOneAndDelete({_id: new ObjectID("5ab9a8995b28a08d1c5d5970")}).then((result)=>{
		console.log(result);
	});


	// client.close();
});