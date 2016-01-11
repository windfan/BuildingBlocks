var request = require('supertest');
var app = require('./app');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();


describe('Requests to root path', function(){

	it('Return a 200 status code', function(done){

		request(app)
			.get('/')
			.expect(200, done);

	});

	it('Returns a HTML format', function(done){

		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);

	});

	it('Returns an index file with Cities', function(done){

		request(app)
			.get('/')
			.expect(/cities/i, done);

	});
});

describe('Listing cities on /cities', function(){

	it('Returns 200 status code', function(done){

		request(app)
			.get('/cities')
			.expect(200, done);

	});

	it('Returns JSON format', function(done){

		request(app)
			.get('/cities')
			.expect('Content-Type', /json/, done);
			// .end(function(error){
			// 	if(error) throw error;
			// 	done();
			// });

	});

	it('Returns initial cities', function(done){

		request(app)
			.get('/cities')
			.expect(JSON.stringify([]), done);

	});

});

describe('Creating new cities', function(){

	before(function(){

	});

	it('Returns a 201 status code', function(done){

		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(201, done);

	});

	it('Returns the city name', function(done){

		request(app)
			.post('/cities')
			.send('name=Springfield&description=where+the+simpsons+live')
			.expect(/springfield/i, done);

	});

});

describe('Deleting cities', function(){

	before(function(){
		client.hset('cities', 'Banana', 'A tasty fruit');
	});

	after(function(){
		client.flushdb();
	});

	it('Returns a 204 status code', function(done){

		request(app)
			.delete('/cities/Banana')
			.expect(204, done);

	});

});
