const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // 1. Handle Pre-flight OPTIONS request
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Range');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const targetUrl = req.query.url;
  if (!targetUrl) return res.status(400).send('Missing URL');

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'Referer': 'https://1nyaler.streamhostingcdn.top/',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    const data = await response.buffer();
    
    // 2. Pass headers back to the browser
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', response.headers.get('content-type'));
    res.send(data);
  } catch (err) {
    res.status(500).send('Error: ' + err.message);
  }
};
