const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) return res.status(400).send('Missing URL');

  // Add these headers to allow your GitHub site to access the proxy
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://1nyaler.streamhostingcdn.top/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    });

    const data = await response.buffer();
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(data);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};
