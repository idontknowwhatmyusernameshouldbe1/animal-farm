# Animal Farm

Personal pet gallery webapp — upload photos, add a name and description. Runs as a static site on **GitHub Pages**.

Photos and pet data are stored **in your browser** (IndexedDB) on that device. They are not uploaded to GitHub.

## Live site

https://idontknowwhatmyusernameshouldbe1.github.io/animal-farm/

### If the site shows this README instead of the app

1. Open [Pages settings](https://github.com/idontknowwhatmyusernameshouldbe1/animal-farm/settings/pages)
2. Under **Build and deployment → Source**, choose **Deploy from a branch**
3. **Branch:** `master` · **Folder:** `/docs`
4. Click **Save**
5. Wait a minute, then hard-refresh the live site

(Alternatively, set **Source** to **GitHub Actions** — the deploy workflow builds the same app.)

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Locally there is no `/animal-farm` prefix. Production Pages URLs include it.
