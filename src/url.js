const qs =  require('qs');

const urlRegex = /^(?:([^:/?#]+):(?=\/\/))?(?:\/\/(?:(.*?)@)?([^/?#]*)?)?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;

const parseUrl = (url, parseQuery) => {
  let match = urlRegex.exec(url);
  return match && {
      protocol: match[1] || '',
      auth: match[2] || '',
      host: match[3] || '',
      pathname: decodeURI(match[4] || ''),
      query: parseQuery === true ? qs.parse(match[5]) : match[5],
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
    query = query || {};
    query = typeof query === 'string' ? `?${query}` : ( isEmptyObj(query) ? '' : `?${qs.stringify(query)}`);
    hash = hash ? `#${hash}` : '';
    return encodeURI(pathname) + query + hash;
  },
  trimOrigin: (url) => {
    url = url || '';
    url = url.replace(/(.*?)\/\/(.*?)\//, '');
    url = url.charAt(0) === '/' ? url : '/' + url;
    return url;
  },
  qs: qs
};

module.exports = url;

function isEmptyObj(obj) {
  for(var key in obj){
    if(obj.hasOwnProperty(key)){
      return false;
    }
  }
  return true;
}
