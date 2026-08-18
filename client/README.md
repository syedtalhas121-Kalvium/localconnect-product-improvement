# LocalConnect Web Client

The LocalConnect client is a React and Vite frontend for neighborhood updates, issue reporting, community events, and local recommendations.

## Setup

```bash
cd client
npm install
npm run dev
```

The development server runs on the Vite-provided local URL. The client expects the API at `http://localhost:5000` by default.

To use a hosted API, create `client/.env` with:

```bash
VITE_API_URL=https://your-api-host.example.com
```

Then create a production build:

```bash
npm run lint
npm run build
```

Deploy the `client` directory to a static host such as Vercel or Netlify. Set `VITE_API_URL` in the host's build environment to the public backend URL.

  
