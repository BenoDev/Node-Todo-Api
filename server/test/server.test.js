const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user')
const {todos,populateTodos,users,populateUsers} = require('./seed/seed')


beforeEach(populateTodos);
beforeEach(populateUsers);

describe('POST /todos', () => {

	it('should create a new todo', (done)=>{
		let text = 'Test todo text';

		request(app)
			.post('/todos')
			.set('x-auth',users[0].tokens[0].token)
			.send({text})
			.expect(200)
			.expect((res)=>{
				expect(res.body.text).toBe(text);
			})
			.end((err,res)=>{

				if(err){
					return done(err);
				}
				Todo.find({text}).then((todos)=>{
					expect(todos.length).toBe(1);
					expect(todos[0].text).toBe(text);

					done();
				}).catch((e)=>done(e))
			});
	});

	it('should not create todo with invalid body data',(done)=>{
		request(app)
		.post('/todos')
		.set('x-auth',users[0].tokens[0].token)
		.send({})
		.expect(400)
		.end((err,res)=>{
			if(err){
				return done(err);
			}
			Todo.find().then((todos)=>{
				expect(todos.length).toBe(3);
				done();
			}).catch(e => done(e));
		});
	});
});


describe('GET /todos',()=>{
	it('should get all todos', (done)=>{
		request(app)
			.get('/todos')
			.set('x-auth',users[0].tokens[0].token)

			.expect(200)
			.expect((res)=>{
				expect(res.body.todos.length).toBe(1);
			})
			.end(done)
	});
});

describe('GET /todos/:id', ()=>{
	it('should return todo doc', (done)=>{
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.set('x-auth',users[0].tokens[0].token)
		.expect(200)
		.expect(res =>{
			expect(res.body.todo.text).toBe(todos[0].text);
		})
		.end(done)
	});

	it('should return 404 if todo is not found', (done)=>{
		let newId = new ObjectID();
		request(app)
		.get(`/todos/${newId}`)
		.set('x-auth',users[0].tokens[0].token)
		.expect(404)
		.end(done)
	});
	it('should return 404 for non object id', (done)=>{

		request(app)
		.get(`/todos/123`)
		.expect(404)
		.end(done)
	});
});

describe('DELETE /todos/:id', () =>{
	it('should remove a todo', (done)=>{
		let hexId = todos[1]._id.toHexString();

		request(app)
			.delete(`/todos/${hexId}`)
			.expect(200)
			.expect((res)=>{
				expect(res.body.todo._id).toBe(hexId)
			})
			.end((err,res)=>{
				if(err){
					return done(err);
				}
				Todo.findById(hexId).then((todo)=>{
					expect(todo).toBeFalsy();
					done();
				}).catch((e)=>done(e));
			})
	});
	it('should return 404 if todo not found', (done)=>{
		let newId = new ObjectID();
		request(app)
		.delete(`/todos/${newId}`)
		.expect(404)
		.end(done)
	});
	it('should return 404 if objectID is invalid', (done)=>{
		request(app)
		.delete(`/todos/123`)
		.expect(404)
		.end(done)
	});
});


describe('PATCH /todos/:id', () =>{
	it('should update the todo', (done)=>{
		let hexId = todos[0]._id.toHexString();
		let text  = "Update from server.test";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({text: text, completed:true})
		.expect(200)
		.expect((res) =>{
			expect(res.body.todo._id).toBe(hexId);
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(res.body.todo.completedAt).toBeTruthy();
		})
		.end(done);
	});

	it('should cleare completedAt when todo is not completed', (done)=>{
		let hexId = todos[1]._id.toHexString();
		let text  = "Update from server.test 2";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({text:text, completed:false})
		.expect(200)
		.expect((res) =>{
			expect(res.body.todo._id).toBe(hexId);
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(false);
			expect(res.body.todo.completedAt).toBeFalsy();
		})
		.end(done);
	});	
});

describe('GET /user/me', ()=>{
	it('should return user if authenticate', (done)=>{
		request(app)
		.get('/users/me')
		.set('x-auth', users[0].tokens[0].token)
		.expect(200)
		.expect((res)=>{
			expect(res.body._id).toBe(users[0]._id.toHexString())
			expect(res.body.email).toBe(users[0].email)
		})
		.end(done)
	});
	it('should return 404 if not authenticate', (done)=>{
		request(app)
		.get('/users/me')
		.expect(401)
		.expect((res) =>{
			expect(res.body).toEqual({});
		})
		.end(done)
	});
})

describe('POST /users', function () {
	this.timeout(4000)
	it('should create a user', (done)=>{
		let email = 'example@example.com';
		let password = '123asd123'

		request(app)
		.post('/users')
		.send({email, password})
		.expect(200)
		.expect((res)=>{
			expect(res.header['x-auth']).toBeTruthy();
			expect(res.body._id).toBeTruthy;
			expect(res.body.email).toBe(email)
		})
		.end(done)
		// .end((err)=>{
		// 	if(err){
		// 		return done();
		// 	}
		// 	User.findOne({email}).then((user)=>{
		// 		expect(user).toExist();
		// 		expect(user.password).toNotBe(password);
		// 		done();
		// 	})
		// })
	})

	it('should return validation errors if request invalid', (done)=>{
		request(app)
		.post('/users')
		.send({email: 'and', password:123})
		.expect(400).
		end(done)
	});

	it('should not create user if email in use', (done)=>{
		request(app)
		.post('/users')
		.send({email: users[0].email, password:'asdd123'})
		.expect(400).
		end(done)
	});
});