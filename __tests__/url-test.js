var url = require('../build/url.min');

it('test url.parse', () => {
  expect(url.parse('http://username:password@localhost:3000/foo/?foo=bar#foo', true))
    .toEqual({
      protocol: 'http',
      auth: 'username:password',
      host: 'localhost:3000',
      pathname: '/foo/',
      query: {foo: 'bar'},
      hash: 'foo'
    });
  expect(url.parse('/foo/bar?foo=bar', true))
    .toEqual({
      protocol: '',
      auth: '',
      host: '',
      pathname: '/foo/bar',
      query: {foo: "bar"},
      hash: ''
    });
  expect(url.parse('/foo/bar?foo=bar'))
    .toEqual({
      protocol: '',
      auth: '',
      host: '',
      pathname: '/foo/bar',
      query: 'foo=bar',
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

it('test url.trimOrigin', () => {
  expect(url.trimOrigin('http://localhost:3000/foo/bar?foo=bar'))
    .toBe('/foo/bar?foo=bar');

  expect(url.trimOrigin('/foo/bar'))
    .toBe('/foo/bar');
});
