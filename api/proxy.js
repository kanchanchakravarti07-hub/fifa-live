const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL');

  // Preserve all query parameters from the original URL (including the token)
  const fullUrl = targetUrl + (req.url.includes('?') ? '&' + req.url.split('?')[1] : '');

  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const response = await fetch(fullUrl, {
      headers: {
        'Referer': 'https://c2f2zq.fubo18.com/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.buffer();
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(data);
  } catch (err) {
    res.status(500).send('Proxy Error');
  }
};
