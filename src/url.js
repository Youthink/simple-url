const qs =  require('qs');

const urlRegex = /^(?:([^:/?#]+):(?=\/\/))?(?:\/\/(?:(.*?)@)?([^/?#]*)?)?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;

const parseUrl = (url) => {
  let match = urlRegex.exec(url);
  return match && {
      protocol: match[1] || '',
      auth: match[2] || '',
      host: match[3] || '',
      pathname: match[4] || '',
      query: qs.parse(match[5]),
      hash: match[6] || ''
  };
};

const url =  {
  parse: parseUrl,
  create: (protocol, host, pathname, query, hash) => {
    protocol = protocol || 'http';
    host = host || 'localhost';
    return `${protocol}://${host}${url.createPath(pathname, query, hash)}`;
  },
  createPath: (pathname, query, hash) => {
    pathname = pathname || '/';
    pathname = pathname.charAt(0) === '/' ? pathname : '/' + pathname;
    query = query ? `?${qs.stringify(query)}` : '';
    hash = hash ? `#${hash}` : '';
    return pathname + query + hash;
  },
  qs: qs
};

module.exports = url;
