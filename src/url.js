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
      hash: decodeURIComponent(match[6] || '')
  };
};

const url =  {
  parse: parseUrl,
  create: (options) => {
    options.protocol = options.protocol || 'http';
    options.host = options.host || 'localhost';
    return `${options.protocol}://${options.host}${url.createPath(options.pathname, options.query, options.hash)}`;
  },
  createPath: (pathname, query, hash) => {
    if(typeof pathname === 'object' && pathname !== null){
      query = pathname.query;
      hash = pathname.hash;
      pathname = pathname.pathname;
    }
    pathname = pathname || '/';
    pathname = pathname.charAt(0) === '/' ? pathname : '/' + pathname;
    query = query ? `?${qs.stringify(query)}` : '';
    hash = hash ? `#${encodeURIComponent(hash)}` : '';
    return pathname + query + hash;
  },
  qs: qs
};

module.exports = url;
