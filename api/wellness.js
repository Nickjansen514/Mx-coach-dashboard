export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ATHLETE_ID = 'i575727';
  const API_KEY    = '4ydn5h3mzd246sch2pejmqr8j';
  const { oldest, newest, type } = req.query;

  try {
    let url;
    if (type === 'activities') {
      url = `https://intervals.icu/api/v1/athlete/${ATHLETE_ID}/activities?oldest=${oldest||''}&newest=${newest||''}&limit=10`;
    } else if (type === 'athlete') {
      url = `https://intervals.icu/api/v1/athlete/${ATHLETE_ID}`;
    } else {
      url = `https://intervals.icu/api/v1/athlete/${ATHLETE_ID}/wellness?oldest=${oldest||''}&newest=${newest||''}`;
    }

    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('API_KEY:' + API_KEY).toString('base64'),
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      const txt = await response.text();
      throw new Error(`HTTP ${response.status}: ${txt.slice(0,200)}`);
    }
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
