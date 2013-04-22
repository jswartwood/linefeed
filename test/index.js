var chai = require("chai");
var expect = chai.expect;

var linefeed = require('../index.js');

describe("Linefeed", function() {
	var lf,
			incoming;

	beforeEach(function() {
		incoming = "hello\nworld";
		lf = linefeed();
	});

	it("sends all text by end", function() {
		lf.write(incoming);
		lf.end();
		expect(lf.read().toString()).to.equal("hello\nworld");
	});

	it("only sends terminated lines until end", function() {
		lf.write(incoming);
		expect(lf.read().toString()).to.equal("hello\n");
		lf.end();
		expect(lf.read().toString()).to.equal("world");
	});

	it("waits to send lines separated across chunks", function() {
		lf.write(incoming);
		expect(lf.read().toString()).to.equal("hello\n");
		lf.write("ly");
		expect(lf.read()).to.be.null;
		lf.write(" travellers");
		expect(lf.read()).to.be.null;
		lf.write("\nand welcome aboard");
		expect(lf.read().toString()).to.equal("worldly travellers\n");
		lf.end();
		expect(lf.read().toString()).to.equal("and welcome aboard");
	});
});