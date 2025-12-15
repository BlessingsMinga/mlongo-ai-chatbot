
[Uploading Screencast from 2025-12-12 22-14-58.webm…]()




mlongo-ai-chatbot
=================

Lightweight frontend for experimenting with multiple AI assistants (OpenAI, Google, Meta, DeepSeekAI, OpenRouter). Built with Vite + React, with a small Node server for proxying requests.

**Features**
- **Multiple backends:** Includes connector files for OpenAI, GoogleAI, MetaAI, DeepSeekAI and OpenRouter under [src/assistants](src/assistants).
- **Componentized UI:** Chat, Controls, Sidebar, Loader, Messages and Assistant components live under [src/component](src/component).
- **Local dev server:** Minimal server implementation at [server/index.js](server/index.js) used by the frontend for API calls.

**Prerequisites**
- **Node.js:** v16+ recommended
- **npm** or **pnpm**

**Install**
Run these commands in the project root:

```bash
npm install
```

**Run (development)**
- Start the frontend (Vite):

```bash
npm run dev
```

- If you need the local Node server (for API proxying), run:

```bash
node server/index.js
```

**Project structure (key files)**
- **Front-end entry:** [src/main.jsx](src/main.jsx)
- **App component:** [src/App.jsx](src/App.jsx)
- **Assistants:** [src/assistants](src/assistants) (per-provider adapters)
- **Components:** [src/component](src/component) (UI components grouped by feature)
- **Local server:** [server/index.js](server/index.js)
- **Legacy placeholder:** [src/component/server/index.js](src/component/server/index.js) (deprecated shim)
- **Package manifest:** [package.json](package.json)

**How to add a new assistant**
1. Create a new adapter file under [src/assistants](src/assistants).
2. Follow the pattern used in the existing adapters (request + response normalization).
3. Wire the adapter into the UI where assistants are selected.

**Notes & troubleshooting**
- The file [src/component/server/index.js](src/component/server/index.js) is a deprecated shim that warns and points to the real server at [server/index.js](server/index.js).
- If you see CORS or API-key issues, ensure the server is running (if required) and environment variables are set as described in the adapter you are using.

**Contributing**
- Open issues and PRs are welcome. Keep changes small and focused.

**License**
- MIT (or adapt to your preferred license)
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
