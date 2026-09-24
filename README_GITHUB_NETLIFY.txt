RE cod AI — GitHub + Netlify setup

1) Replace your existing index.html with the included index.html.
2) Copy the netlify folder into the root of your project so this exact file exists:
   netlify/functions/ai.js
3) Copy netlify.toml into the project root.
4) Push the project to GitHub.
5) In Netlify, connect/import that GitHub repository. Do NOT use GitHub Pages for this version because the AI needs a server-side function.
6) In Netlify: Project configuration > Environment variables.
   Add:
   OPENAI_API_KEY = your OpenAI API key
   Optional:
   OPENAI_MODEL = gpt-5.6-luna
   The key must NOT be placed in index.html or committed to GitHub.
7) Make sure the variable is available to Functions, then create a new deploy. Netlify applies environment-variable changes to new deploys.
8) Open your site, go to مختبر الأكواد, type what you want, optionally attach .html/.css/.js/.txt/.json files, then press تنفيذ بالذكاء الاصطناعي.

Important:
- The browser sends the current Code Lab code to /.netlify/functions/ai.
- The server-side function calls the OpenAI Responses API.
- The API key stays on Netlify and is never written into the website code.
- Do not paste your API key into GitHub or into the chat.
