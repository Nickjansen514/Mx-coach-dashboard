export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const ATHLETE_ID = 'i575727';
  const API_KEY    = '4ydn5h3mzd246sch2pejmqr8j';
  const { oldest, newest } = req.query;

  try {
    const url = `https://intervals.icu/api/v1/athlete/${ATHLETE_ID}/wellness?oldest=${oldest || ''}&newest=${newest || ''}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from('API_KEY:' + API_KEY).toString('base64'),
        'Accept': 'application/json'
      }
    });
    if (!response.ok) throw new Error('Intervals.icu: ' + response.status);
    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
