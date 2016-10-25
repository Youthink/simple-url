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
  expect(url.create('http', 'localhost', '/foo', {foo: 'bar'}, 'foo'))
    .toBe('http://localhost/foo?foo=bar#foo');
  expect(url.create('http', 'localhost', 'foo/bar'))
    .toBe('http://localhost/foo/bar');
});
