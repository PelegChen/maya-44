# Hebrew Birthday Greeting

A customizable Hebrew birthday greeting built with Vite, TypeScript, and Three.js.

## Get started

Use Node.js 20.19+ and npm:

```sh
npm install
npm run dev
```

Open the local URL printed by Vite to preview the greeting. Create a production
build with `npm run build`; preview it locally with `npm run preview`.

## Customize the greeting

1. Edit `index.html` to change the page title, greeting, and message.
   The sample greeting includes both `ישראל` and `ישראלה`; replace them with
   the recipient's name (choose the appropriate form). The message is written
   to work for any recipient and does not include an age or personal details.
2. Replace `src/assets/happy-birthday.jpg` with a photo or background image of
   your choice. Keep the same filename, or update the image path in `index.html`.
3. Edit `src/assets/style.css` to adjust the typography, layout, and colors.
   The page uses the Hebrew fonts in `src/assets/fonts`.
4. Update the Three.js animation in `src/ts/main.ts` and `src/ts/sky.ts` if you
   want to change the 3D scene.

The site is configured for right-to-left Hebrew text. Keep `lang="he"` and
`dir="rtl"` on the corresponding HTML elements when adapting the copy.

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy-site.yml` builds and deploys the site
when changes are pushed to the `main` or `deploy` branch, or when started
manually from GitHub Actions. Make sure GitHub Pages is configured to use
GitHub Actions for the repository.
