var util = require("util"),
		stream = require("stream");

var lineMatcher = /(?:\n)|(?:\r\n)|(?:\r)/;

function LineStream( opts ) {
	if (!(this instanceof LineStream))
		return new LineStream(opts);

	stream.Transform.call(this, opts);

	this.newline = (opts && 'newline' in opts) ? opts.newline : "\n";
	this._temp = "";
}

util.inherits(LineStream, stream.Transform);

LineStream.prototype._transform = function _transform( chunk, encoding, done ) {
	var lines = chunk.toString().split(lineMatcher),
			last = lines.length - 1;
	
	for (var i = 0; i <= last; i++) {
		if (i < last) {
			this.push(this._temp + lines[i])
			this._temp = "";
			if (this.newline) this.push(this.newline);
		} else {
			this._temp += lines[i];
		}
	}

	done();
};

LineStream.prototype._flush = function _flush( done ) {
	this.push(this._temp);
	done();
};

module.exports = LineStream;

