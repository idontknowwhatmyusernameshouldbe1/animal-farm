# Animal Farm

Personal pet gallery webapp — upload photos, add a name and description. Runs as a static site on **GitHub Pages**.

Photos and pet data are stored **in your browser** (IndexedDB) on that device. They are not uploaded to GitHub.

## Use on GitHub Pages

After deploy, open:

`https://YOUR_GITHUB_USERNAME.github.io/animal-farm/`

### One-time GitHub setup

1. Push this repo to GitHub (repo name must be `animal-farm`).
2. Repo **Settings → Pages**:
   - **Source:** GitHub Actions
3. Push to `main` (or run the **Deploy to GitHub Pages** workflow manually).
4. Wait for the workflow to finish, then open the Pages URL.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Locally there is no `/animal-farm` prefix. Production Pages URLs include it.

```bash
npm run build
npm start
```

Serves the static `out/` folder (with the `/animal-farm` base path).
