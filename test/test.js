//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

/*
  * Test the /POST route
  */
describe('/POST hero', () => {
  it('it should POST a hero', done => {
    var hero = {
      id: '12345',
      name: 'simona',
      saying: 'blah'
    };
    chai
      .request('http://localhost:7071')
      .put('/api/CreateHero')
      .send(hero)
      .end((err, res) => {
        console.log(`this is my result ${res}`);
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('id').eql('12345');
        res.body.should.have.property('saying').eql('blah');
        res.body.should.have.property('name').eql('simona');
        done();
      });
  });
});
