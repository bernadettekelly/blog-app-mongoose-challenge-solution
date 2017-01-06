const faker = require('faker');
const mongoose = require('mongoose');
const chai = require('chai');
const chaiHTTP = require('chai-http');

const should = chai.should();

const {DATABASE_URL} = require('../config');
const {BlogPost} = require('../models');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHTTP);

function tearDownDB() {
	return new Promise((resolve, reject) => {
		console.warn('Deleting database');
		mongoose.connection.dropDatabase()
		.then(result => resolve(result))
		.catch(er => reject(err))
	});
}

function seedBlogPostData() {
	console.info('seeding blog post data');
	const seedData = [];
	for (let i=1; i<=10; i++) {
		seedData.push({
			title: faker.x.sentence(),
			content: faker.x.text(),
			created: faker.x.date(),
			author: {
				firstName: faker.name.firstName(),
				lastName: faker.name.lastName()
			},
			});
	}
	return BlogPost.insertMany(seedData);
}
describe('blog posts API resource', function() {
	before(function() {
		return runServer(TEST_DATABASE_URL);
	});


	beforeEach(function() {
		return seedBlogPostData();
	});

	afterEach(function() {
		return tearDownDB();
	});

	after(funtion() {
		return closeServer();
	});
}

describe('GET endpoint', function() {

it('should return all existing Blog Posts', function() {
	let res;
	return chai.request(app)
	.get('/BlogPosts')
	.then(function(_res) {
		res = _res;
		res.should.gave.status(200);
		res.body.BlogPosts.should.have.length.of.at.least(1);
		return BlogPosts.count();
	});
	.then(function(count) {
		res.body.BlogPosts.should.have.length.of(count);
	});
});

const newBlogPost = generateBlogPostData();
let mostRecentPost;

describe('POST endpoint', function() {
it('should add new blog post', function() {

return chai.request(app)
.post('/BlogPosts')
.send(newBlogPost)
.then(function(res) {
	res.should.have.status.of(201);
	res.should.be.json;
	res.body.should.be.an('object');
	res.body.should.include.keys(
		'id', 'title', 'author', 'content', 'created');
	res.body.title.should.equal(newBlogPost.title);
	res.body.id.should.not.be.null;
	res.body.author.should.equal(newBlogPost.author);
	res.body.content.should.equal(newBlogPost.content);
	res.body.created.should.equal(newBlogPost.created);
})
.then(function(restaurant) {
	res.body.title.should.equal(newBlogPost.title);
	res.body.id.should.not.be.null;
	res.body.author.should.equal(newBlogPost.author);
	res.body.content.should.equal(newBlogPost.content);
	res.body.created.should.equal(newBlogPost.created);

});

describe('PUT endpoint', function() {
	it('should update field submitted', function() {
const updateData = {
	title: 'How to Make Chocolate Cake',
	content: 'recipe'
};

return BlogPosts
.findOne()
.exec()
.then(function(BlogPosts) {
	updateData.id = BlogPosts.id;

	return chai.request(app)
	.put('/BlogPosts/${BlogPosts.id'})
	.send(updateData);
})
.then(function(res) {
	res.should.have.status(204);
	return BlogPosts.findById(updateData.id).exec();
})
.then(function(BlogPosts) {
	BlogPosts.title.should.equal(updateData.title);
	BlogPosts.content.should.equal(updateData.content);
});

describe('DELETE endpoint', function() {
	it('should delete a post by id', function() {

let BlogPosts;

BlogPosts
.findOne()
.exec()
.then(function(_BlogPosts) {
	BlogPosts = _BlogPosts;
	return chai.request(app).delete(`/BlogPosts/${BlogPosts.id}`);
})
.then(function(res) {
	res.should.have.status(204);
	return BlogPosts.findById(BlogPosts.id).exex();
})
.then(function(_BlogPosts) {
	should.not.exist(_BlogPosts);
});
});
});
});
