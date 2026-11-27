# ORAYEN

### Technology & Digital Solutions

ORAYEN is a Sri Lankan technology and digital solutions company. We build and design digital experiences for businesses and individuals.

## Services

- Web Development
- Mobile Application Development
- UI/UX Design
- Graphic Design
- Canva Design

## Team

| Name | Role |
| --- | --- |
| Senura | Development |
| Thathsarani | Business |
| Dineth | Design |

## Technology stack

React, Vite, and JavaScript power the site. Tailwind CSS is used for styling. The team uses Git and GitHub for version control.

## Project status

Currently under development.

## Run in VS Code on Windows

1. Extract the ZIP. In VS Code, choose **File → Open Folder** and open the folder that directly contains `package.json`.
2. Open **Terminal → New Terminal**. Run these commands one at a time in PowerShell.

   ```powershell
   npm install --include=dev
   npm run dev
   ```

3. Open the URL shown in the terminal, usually <http://localhost:5173>. Press **Ctrl+C** to stop the server.

Use Node.js 20.19 or newer in the Node 20 series, or Node.js 22.12 or newer. Run `node -v` to check your version. If npm says it cannot find `package.json`, run `dir package.json` to check that your terminal is in the project folder.

## Production build

```powershell
npm run build
npm run preview
```

Vite places the build in `dist/`.

## AI chatbot

The floating chatbot sends messages to the Vercel Function in `api/chat.js`, which calls OpenAI without exposing the API key to site visitors.

To enable it:

1. In Vercel, open the project’s **Settings → Environment Variables**.
2. Add `OPENAI_API_KEY` with your OpenAI API key. Keep it server-side; do not use a `VITE_` prefix or commit the key.
3. Redeploy the site.

For local development, create an ignored `.env.local` file in the project root with `OPENAI_API_KEY=your_openai_api_key`, then run `npm run dev`. The Vite development server routes `/api/chat` to the same handler. Never prefix the key with `VITE_` or commit it.

## Supabase content tables

Run `supabase/content.sql` in the Supabase SQL Editor to create and seed the `public.portfolios` and `public.services` tables. The script can be rerun safely; it updates existing rows by slug. Row-level security allows public reads of published entries only. Portfolio image values are filenames in `public/assets/`.

## Edit your site

| File | What to change |
| --- | --- |
| `src/content.js` | Services, team members, and technology stack |
| `src/Hero.jsx`, `src/About.jsx` | Homepage and company introduction |
| `src/Contact.jsx`, `src/config.js` | Enquiry form and contact email |
| `src/index.css` | Tailwind styles, colors, fonts, and layout |
| `public/assets/` | Logo, imagery, and fonts |

## Contact

[orayen.tech@gmail.com](mailto:orayen.tech@gmail.com)

The form opens an email draft for the visitor to review and send. Visitors can also download a copy of their project brief.

## Image and font credits

- Orayen logo supplied by the project owner. The navigation wordmark and favicon derive from the supplied PNG.
- Sample photographs are from Unsplash. Photo files by source image ID: office/studio `1497366754035-f200968a6e72`, architecture `1600585154340-be6161a56a0c`, forest `1441974231531-c6227db76b6e`, laptop `1498050108023-c5249f4df085`, and retail `1441986300917-64674bd600d8`. See <https://unsplash.com/license>.
- Barlow and DM Sans are available under the SIL Open Font License. License files are in `public/assets/`.

© 2026 ORAYEN. All Rights Reserved.
