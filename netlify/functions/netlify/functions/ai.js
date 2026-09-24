const MODEL = process.env.OPENAI_MODEL || 'gpt-5.6-luna';

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' }
  });
}

function extractText(response) {
  if (typeof response.output_text === 'string') return response.output_text;

  const chunks = [];

  for (const item of response.output || []) {
    for (const part of item.content || []) {
      if (
        part.type === 'output_text' &&
        typeof part.text === 'string'
      ) {
        chunks.push(part.text);
      }
    }
  }

  return chunks.join('\n').trim();
}

export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('', { status: 204 });
  }

  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return json(
      { error: 'OPENAI_API_KEY is not configured on Netlify.' },
      500
    );
  }

  let body;

  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON request.' }, 400);
  }

  const prompt = String(body.prompt || '').trim();
  const code = body.code || {};
  const attachments = Array.isArray(body.attachments)
    ? body.attachments
    : [];

  const identity = body.siteIdentity || {};
  const language = String(body.language || 'ar');

  if (!prompt) {
    return json(
      { error: 'Write what you want the AI to do.' },
      400
    );
  }

  const safeAttachments = attachments.slice(0, 5).map((f) => ({
    name: String(f.name || 'file.txt').slice(0, 120),
    content: String(f.content || '').slice(0, 250000)
  }));

  const instructions = `You are RE cod AI inside a web Code Lab.

Your job is to modify or generate the user's HTML, CSS, and JavaScript according to their request.

NON-NEGOTIABLE RULES:

1. Return ONLY valid JSON. No markdown fences and no extra text.
2. The JSON must have exactly these fields:
html, css, js, message
3. html, css, and js must always be complete strings.
4. Make the requested change while preserving existing functionality.
5. Preserve the RE cod visual identity.
6. Do NOT redesign the main RE cod website.
7. Only change the code currently in the Code Lab according to the user's request.
8. If attached files are supplied, use them as source material.
9. Keep HTML/CSS/JS self-contained.
10. Do not require npm packages or build tools.
11. Avoid external libraries unless explicitly requested.
12. If the request is ambiguous, make a sensible implementation.
13. Never put API keys, secrets, or private credentials in returned code.
14. The user's interface language is ${language}.

RE cod visual identity:

Background: ${identity.background || '#0b0a0f'}
Cards: ${identity.card || '#121118'}
Borders: ${identity.border || '#1f1e26'}
Main text: ${identity.text || '#ffffff'}
Muted text: ${identity.muted || '#9492a6'}
Accent: ${identity.accent || '#7c3aed'}
Font: ${identity.font || 'system-ui'}

Return JSON exactly like:

{
  "html": "...",
  "css": "...",
  "js": "...",
  "message": "brief explanation"
}`;

  const userText = [
    `USER REQUEST:\n${prompt}`,

    `CURRENT HTML:\n${String(code.html || '').slice(0, 350000)}`,

    `CURRENT CSS:\n${String(code.css || '').slice(0, 250000)}`,

    `CURRENT JAVASCRIPT:\n${String(code.js || '').slice(0, 250000)}`,

    safeAttachments.length
      ? 'ATTACHED FILES:\n' +
        safeAttachments
          .map(
            (f) => `--- ${f.name} ---\n${f.content}`
          )
          .join('\n')
      : 'ATTACHED FILES: none'
  ].join('\n\n');

  try {
    const upstream = await fetch(
      'https://api.openai.com/v1/responses',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: MODEL,
          instructions,
          input: userText,
          max_output_tokens: 30000,
          store: false
        })
      }
    );

    const data = await upstream.json().catch(() => ({}));

    if (!upstream.ok) {
      const message =
        data?.error?.message ||
        `OpenAI HTTP ${upstream.status}`;

      return json(
        { error: message },
        upstream.status >= 400 && upstream.status < 600
          ? upstream.status
          : 502
      );
    }

    const output = extractText(data);

    if (!output) {
      return json(
        { error: 'OpenAI returned an empty response.' },
        502
      );
    }

    return json({ output });

  } catch (error) {
    return json(
      { error: error?.message || 'AI request failed.' },
      500
    );
  }
};
