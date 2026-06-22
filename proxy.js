const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  
  if (!targetUrl) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://iptv-eldbert.xyz/',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
      }
    });

    const data = await response.buffer();
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(data);
  } catch (err) {
    res.status(500).send('Error fetching stream: ' + err.message);
  }
};
