// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err,client)=>{
	let db = client.db('TodoApp');
	if(err){
		return console.log('Unable to connect to MongodDB server');
	}
	console.log('Connected to MongodDB server');

	// db.collection('Todos').find({
	// 	_id : new ObjectID('5ab99492d3fe39081ca45201')
	// 		}).toArray().then((docs)=>{
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs,undefined,2));
	// }).catch(err=>console.log('Unable to fetch todos',err))

	// db.collection('Todos').find().count().then((count)=>{
	// 	console.log(`Todos count:${count}`);
	// }).catch(err=>console.log('Unable to fetch todos',err))

	db.collection('Users').find({
		name:'Beno'
			}).toArray().then((docs)=>{
		console.log('Todos');
		console.log(JSON.stringify(docs,undefined,2));
	}).catch(err=>console.log('Unable to fetch todos',err))

	// client.close();
});