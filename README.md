# Portfolio — Siddavatam Sulduz

Personal portfolio and 3D interactive resume for **Siddavatam Sulduz**, Front-End Developer at Tata Consultancy Services.

Built with React 19, Vite, and raw three.js — including a procedurally generated low-poly husky ("Leo") that chases your cursor in real time.

- **GitHub:** [@MayasirSulduz](https://github.com/MayasirSulduz)
- **LinkedIn:** [mayasir-sulduz](https://www.linkedin.com/in/mayasir-sulduz)
- **Email:** shaiksulduz238@gmail.com

---

## Highlights

- **Interactive 3D pet** — a low-poly husky built from three.js primitives that follows the cursor, walks to a doghouse, plays fetch, blinks, pants, and barks. Audio is synthesized at runtime with the Web Audio API, so no audio files ship.
- **Procedurally generated 3D model** — `scripts/generate_husky.js` builds the husky mesh from primitives and exports `husky.glb` / `husky.gltf` via `GLTFExporter`. No external model source.
- **3D model inspector** — an orbit viewer modal with auto-rotate and wireframe toggles, direct model downloads, and integration snippets for Three.js, React Three Fiber, and Blender/Unity.
- **Dual-theme design system** — 18 CSS custom properties, light and dark themes, with theme-aware image swapping for every asset.
- **Working contact form** — a Resend-backed serverless function with a local Vite dev middleware shim.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | React 19 |
| Build tool | Vite 7 |
| 3D / WebGL | three.js (raw WebGLRenderer, no react-three-fiber) |
| Icons | FontAwesome 7, hand-written inline SVG |
| Styling | Hand-written CSS with CSS custom properties (no Tailwind, no CSS-in-JS) |
| Typography | Inter + Outfit (Google Fonts) |
| Email | Resend |
| Linting | ESLint 9 (flat config) |

## Sections

Single-page app with in-page navigation (no router):

- **Home** — hero, availability badge, name pronunciation audio, morphing avatar
- **About** — bio, stats, work-experience timeline
- **Skills** — 6 categorized skill groups with theme-swapped icons
- **Projects** — filterable project grid with autoplaying demo videos
- **Contact** — click-to-copy email, location, and the Resend-backed form
- **Extras** — AI chat assistant, 3D husky pet, 3D model viewer, theme toggle

## Featured Projects

| Project | Stack | Links |
| --- | --- | --- |
| **Online Clipboard Platform** — real-time cross-device clipboard for text and code snippets | React, TypeScript, Node, Postgres | [Live](https://online-clipboard-woad.vercel.app/) · [Code](https://github.com/MayasirSulduz/onlineClipboard) |
| **Test Case Generator V1** — automated generation of structured QA test scenarios | React, TypeScript, Tailwind, Node, REST API | [Live](https://aitestcasegen.vercel.app/) · [Code](https://github.com/MayasirSulduz/TestCaseGenerator) |
| **Real-Time Analytics & Monitoring Dashboard** — enterprise metric streaming and visualization | React, Redux, Grafana, Prometheus | [Code](https://github.com/MayasirSulduz) |

## Getting Started

```bash
git clone https://github.com/MayasirSulduz/Portfolio.git
cd Portfolio
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

### Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server with the local contact API |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across the project |

## Environment Variables

The contact form needs a [Resend](https://resend.com) API key. Create a `.env` file in the project root:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
# Optional. Falls back to "Portfolio <onboarding@resend.dev>"
RESEND_FROM_EMAIL=Portfolio <hello@yourdomain.com>
```

`vite.config.js` reads these with Vite's `loadEnv` and injects them into `process.env` at config time, so both `npm run dev` and the serverless function resolve them.

> Never commit `.env`. It is not currently covered by `.gitignore` — keep it local.

## Contact Form Architecture

`api/contact.js` is written as a Vercel-style handler with the signature `(request, response)`, so the same module works in two places:

- **In production** — deployed as a serverless function at `/api/contact`.
- **Locally** — `contactApiPlugin()` in `vite.config.js` registers a dev-server middleware on `/api/contact`, buffers and parses the request body, and adapts the Node request/response into the `response.status().json()` shape the handler expects.

The handler validates the method and required fields, sends the message via Resend with the visitor set as `replyTo`, and returns `200`, `400`, `405`, `500`, or `502` depending on the outcome.

## Project Structure

```
├── api/
│   └── contact.js              # Resend serverless handler
├── scripts/
│   └── generate_husky.js       # Procedural 3D husky → GLB/GLTF exporter
├── public/
│   ├── husky.glb / husky.gltf  # Generated 3D model
│   └── *.gif / *.png           # Theme-swapped imagery
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Nav, theme toggle, animated sky, pet controls
│   │   ├── Home.jsx            # Hero
│   │   ├── About.jsx           # Bio, stats, timeline
│   │   ├── Skills.jsx          # 6 skill categories
│   │   ├── Projects.jsx        # Filterable project grid + card
│   │   ├── Contact.jsx         # Email, location, form
│   │   ├── AIChatAssistant.jsx # Keyword-matching chat assistant
│   │   ├── PetLeo.jsx          # Full-screen three.js husky pet
│   │   ├── HuskyModelViewer.jsx# Orbit viewer modal
│   │   └── NavbarDoodleIcon.jsx
│   ├── context/
│   │   ├── Theme.jsx           # Light/dark theme + localStorage
│   │   └── PetContext.jsx      # Pet state machine + usePet hook
│   ├── styling/                # One CSS file per component
│   ├── utils/
│   │   └── huskyAudio.js       # Web Audio API bark / howl / yip synthesis
│   └── assets/                 # Images, demo videos, name audio
├── index.html
└── vite.config.js
```

## How the 3D Pet Works

`PetLeo.jsx` runs a three.js scene in a `useEffect` with a mutable ref holding all per-frame state, so animation never triggers a React re-render.

- **State machine** — `FOLLOWING → GOING_HOME → AT_HOME → PLAYING`, managed by `PetContext`.
- **Cursor tracking** — the mouse is unprojected onto the `z = 0` plane by raycasting, then the husky's heading is rotated with a wrap-safe `lerpAngle`.
- **Movement** — the pet is clamped to the viewport and eased toward its target each frame.
- **Physics** — a thrown ball has gravity and a `0.72` restitution bounce.
- **Animation** — proximity drives tail wag speed and amplitude, plus blinking, panting tongue, breathing, ear flicks, and a hello jump.
- **Cleanup** — `cancelAnimationFrame`, listener removal, canvas teardown, and `renderer.dispose()` on unmount.

The `.glb`/`.gltf` model is generated locally rather than downloaded — run the script manually if you want to regenerate it:

```bash
node scripts/generate_husky.js
```

## Theming

`ThemeContext` stores `light-theme` or `dark-theme` in `localStorage` and toggles a class on `<body>`. All colors, shadows, and glass surfaces derive from CSS custom properties in `src/index.css`, so a new theme is a matter of overriding tokens.

Because `prefers-color-scheme` isn't used, every image that changes with the theme has a `_dark` / `_light` pair, and the component picks the right one from context.

## Deployment

The build output in `dist/` is a fully static site. The contact form expects a host that supports Vercel-style serverless functions in `api/`, so deploying to Vercel is the path of least resistance.

```bash
npm run build
```

## License

© Siddavatam Sulduz. All rights reserved.
