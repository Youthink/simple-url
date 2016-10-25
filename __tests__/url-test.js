var url = require('../build/url.min');

it('test url.parse', () => {
  expect(url.parse('http://username:password@localhost:3000/foo/?foo=bar#foo'))
    .toEqual({
      protocol: 'http',
      auth: 'username:password',
      host: 'localhost:3000',
      pathname: '/foo/',
      query: {foo: 'bar'},
      hash: 'foo'
    });
  expect(url.parse('/foo/bar?foo=bar'))
    .toEqual({
      protocol: '',
      auth: '',
      host: '',
      pathname: '/foo/bar',
      query: {foo: "bar"},
      hash: ''
    });
});

it('test url.create', () => {
  expect(url.create({protocol: 'http', host: 'localhost', pathname: '/foo', query: {foo: 'bar'}, hash: 'foo'}))
    .toBe('http://localhost/foo?foo=bar#foo');
  expect(url.createPath('/foo/bar', {foo: 'bar'}, 'bar'))
    .toBe('/foo/bar?foo=bar#bar');
  expect(url.createPath({pathname: '/foo/bar', query: {foo: 'bar'}, hash: 'bar'}))
    .toBe('/foo/bar?foo=bar#bar');
});

it('test structured hash', () => {
  expect(url.parse(url.createPath('/foo/bar', {foo: '吧'}, {foo: '吧'}, true), true))
    .toEqual({
      protocol: '',
      auth: '',
      host: '',
      pathname: '/foo/bar',
      query: {foo: "吧"},
      hash: {foo: "吧"}
    });
});
