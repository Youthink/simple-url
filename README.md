# simple-url
**simple-url** is a lib of utilities for url.

## Installing
Use via npm:
```bash
npm install simple-url
```
```javascript
var url = require('simple-url');

// Use es6 import
import url from 'simple-url';
```
Use in browser:

Scripts for browser is under [build](https://github.com/Jimmy-YMJ/simple-url/tree/master/build) directory, use `url.js` for development (contains inline source maps) or use `url.min.js` for production. The reference in browser is `window.simpleUrl`.

## Structure of url
The following illustration comes from [nodejs docs](https://nodejs.org/api/url.html).
```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                    href                                     │
├──────────┬┬───────────┬─────────────────┬───────────────────────────┬───────┤
│ protocol ││   auth    │      host       │           path            │ hash  │
│          ││           ├──────────┬──────┼──────────┬────────────────┤       │
│          ││           │ hostname │ port │ pathname │     search     │       │
│          ││           │          │      │          ├─┬──────────────┤       │
│          ││           │          │      │          │ │    query     │       │
"  http:   // user:pass @ host.com : 8080   /p/a/t/h  ?  query=string   #hash "
│          ││           │          │      │          │ │              │       │
└──────────┴┴───────────┴──────────┴──────┴──────────┴─┴──────────────┴───────┘
(all spaces in the "" line should be ignored -- they are purely for formatting)
```

## Examples

Parse a url:
```javascript
var urlUtils = require('simple-url');

var parsedUrl = urlUtils.parse('http://foo.com/pathname/?foo=bar');
console.log(parsedUrl);
/**
* The output is:
* {
*   protocol: 'http',
*   auth: '',
*   host: 'foo.com',
*   pathname: '/pathname/',
*   query: {foo: 'bar'},
*   hash: ''
* }
*/
```

Parse a url with structured hash:
```javascript
var urlUtils = require('simple-url');

var parsedUrl = urlUtils.parse('https://github.com/#colors%5B0%5D=red&colors%5B1%5D=green&colors%5B2%5D=blue');
console.log(parsedUrl);
/**
* The output is:
* {
*   protocol: 'https',
*   auth: '',
*   host: 'github.com',
*   pathname: '/',
*   query: {},
*   hash: {colors: ['red', 'green', 'blue']}
* }
*/
```

Create a url with structured hash:
```javascript
var urlUtils = require('simple-url');

var url = urlUtils.create({protocol: 'https', host: 'github.com', hash: {colors: ['red', 'green', 'blue']}}, true);
console.log(url);
/**
* The output is:
* https://github.com/#colors%5B0%5D=red&colors%5B1%5D=green&colors%5B2%5D=blue
*/
```

Create a path:
```javascript
var path1 = urlUtils.createPath('/foo/bar', {colors: ['red', 'green', 'blue']});
console.log(path);
/*
* The output is:
* /foo/bar?colors%5B0%5D=red&colors%5B1%5D=green&colors%5B2%5D=blue
*/

var path2 = urlUtils.createPath({pathname: '/foo/bar', query: {colors: ['red', 'green', 'blue']}});
console.log(path1 === path2)
/**
* The output is:
* true
*/
```

## methods
### url.parse(url[, structuredHash])

| **Params** | **Description** |
| --- | --- |
| url |  Url to parse. |
| structuredHash | If it's true, the hash will be parsed by [qs](https://github.com/ljharb/qs)'s `parse` method, the default value is `false`.|

This method parses the given `url` and returns `null`(invalid url) or `object` like:
```javascript
{
  protocol: 'http', // '' if mismatch
  auth: 'user:pass', // '' if mismatch
  host: 'host.com:8080', // '' if mismatch
  pathname: '/p/a/t/h', // '' if mismatch
  query: {foo: 'bar'}, // {} if mismatch
  hash: 'hash' // '' if mismatch
}
```
__Note:__ `url` for **url.parse** is not necessary to be a complete url, it can be `//host.com : 8080/path?query=string#hash`, `/path?query=string`, etc.

### url.create(options[, structuredHash])

| **Params** | **Description** |
| --- | --- |
| options |  Options to create a url. |
| structuredHash | If it's true, the hash will be encoded by [qs](https://github.com/ljharb/qs)'s `stringify` method, the default value is `false`.|

This method creates a url with the given options.

| **Options** | **default** |
| --- | --- |
| protocal |  'http' |
| auth | '' |
| host |  'localhost' |
| pathname |  '/' |
| query |  {} |
| hash |  '' |

None of these options is required, it will produce a `"http://localhost"` if you call `url.create()` only.

### url.createPath(pathname, query, hash[, structuredHash]) or url.createPath(options[, structuredHash])

This mehtod simply crates a path and it's params have the same defaults with **url.create**'s. It leaves param `hash` there for convenience though it is not a part of path.

### url.qs

This is exactly a reference to [qs](https://github.com/ljharb/qs), which is the only dependency of **simple-url**. It is exposed just for convenience.

## License
MIT
