# Animal Farm

Personal pet gallery webapp — upload photos, add a name and description. Works in the browser on PC and phone.

## Run locally

```bash
npm install
npm run dev
```

- **PC:** open [http://localhost:3000](http://localhost:3000)
- **Phone (same Wi‑Fi):** open `http://YOUR_PC_IP:3000`

Photos and data are stored on this machine under `data/`.

## Deploy online (Railway)

Gives you a public HTTPS URL that works on any device. Photos and the database are stored on a Railway volume.

1. Push this project to GitHub.
2. Sign up at [railway.app](https://railway.app) and **New Project → Deploy from GitHub repo** (select this repo).
3. Open the service → **Settings → Volumes** → add a volume with mount path `/data`.
4. Under **Settings → Networking**, generate a public domain.
5. Redeploy if needed, then open the Railway URL on your phone or any PC.

Optional: set environment variable `DATA_DIR=/data` (the Docker image already defaults to this).

**Note:** Anyone with the URL can add, edit, or delete pets (there is no login yet).
