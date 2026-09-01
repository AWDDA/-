/**
 * מאזן — שרת זיהוי מנות
 * פרוקסי דק ל-Anthropic API. תפקידו היחיד: להחזיק את המפתח בצד השרת
 * כדי שהוא לא ייחשף בקוד של האתר.
 *
 * פריסה:
 *   npm i -g wrangler
 *   wrangler login
 *   wrangler deploy worker.js --name maazan-vision --compatibility-date 2026-01-01
 *   wrangler secret put ANTHROPIC_API_KEY --name maazan-vision
 *
 * אחר כך הדבק את הכתובת שקיבלת (https://maazan-vision.<user>.workers.dev)
 * בשדה «שרת זיהוי מנות» במסך הפרופיל של האפליקציה.
 *
 * שנה את ALLOWED לדומיין שלך אחרי שהעלית — אחרת כל אתר יוכל לצרוך
 * את המכסה שלך.
 */

const ALLOWED = '*'; // למשל: 'https://<user>.github.io'

function cors(origin) {
  return {
    'Access-Control-Allow-Origin': ALLOWED === '*' ? (origin || '*') : ALLOWED,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400'
  };
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin');
    const headers = cors(origin);

    if (request.method === 'OPTIONS') return new Response(null, { headers });
    if (request.method !== 'POST') {
      return new Response('POST only', { status: 405, headers });
    }
    if (!env.ANTHROPIC_API_KEY) {
      return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY לא הוגדר' }),
        { status: 500, headers: { ...headers, 'Content-Type': 'application/json' } });
    }

    let body;
    try { body = await request.json(); }
    catch (e) { return new Response('bad json', { status: 400, headers }); }

    // תקרה על גודל הבקשה, שלא ישמש כצינור לתמונות ענק
    const raw = JSON.stringify(body);
    if (raw.length > 6_000_000) {
      return new Response('payload too large', { status: 413, headers });
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: body.model || 'claude-sonnet-4-6',
        max_tokens: Math.min(body.max_tokens || 1000, 2000),
        messages: body.messages || []
      })
    });

    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: { ...headers, 'Content-Type': 'application/json' }
    });
  }
};
