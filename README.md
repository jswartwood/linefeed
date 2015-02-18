# linefeed

A transform stream which converts various line endings into simple newlines, conveniently emitting a single chunk per line.

## Library usage

Convert Windows linefeeds to Unix:

```js
var fixlines = require('linefeed');
fs.createReadStream("WINDWS~1.TXT").pipe(fixlines()).pipe(process.stdout);
```

Or vice versa:

```js
var LineStream = require('linefeed'),
    converter = new LineStream({newline:"\r"});
fs.createReadStream("some_unix_file.txt").pipe(converter).pipe(process.stdout);
```

Or just grab the lines:

```js
var LineStream = require('linefeed'),
    splitter = new LineStream({newline:"", objectMode:true});
fs.createReadStream("README.md").pipe(splitter).on('data', function (line) {
    console.log("Got a line:", line);
});
```

Besides the usual [stream.Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) configuration, the only other option is `{newline:string}`. Set it to any desired newline separator, including the empty string (which is especially useful with an object mode transform).


## CLI

There is also a minimal shell script you can pipe through if installed globally (or locally, if "./node_modules/.bin/" is in your path):

```sh
cat README.md | linefeed > README.unix_endings.txt

```

Currently no options can be provided.


## MIT License

Copyright (c) 2013 Jacob Smartwood
Copyright (c) 2014 Nathan Vander Wilt

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
