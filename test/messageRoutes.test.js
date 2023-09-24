const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

const server = require('../index'); 

describe('Message Routes', () => {
    it('should get all messages', (done) => {
        chai.request(server)
            .get('/messages')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });

    it('should create a new message', (done) => {
        chai.request(server)
            .post('/messages')
            .send({ content: 'Test Message', sender: 'Test User' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.text).to.equal('Message sent successfully');
                done();
            });
    });
});
