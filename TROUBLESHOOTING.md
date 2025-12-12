# Troubleshooting Blank Page on GitHub Pages

If you're seeing a blank page when accessing your deployed app, follow these steps:

## 1. Check Browser Console

Open Chrome DevTools (F12 or Right-click → Inspect) and check the Console tab for errors:
- **Red errors** indicate what's wrong
- Common issues:
  - 404 errors for CSS/JS files → Base path mismatch
  - CORS errors → Configuration issue
  - Module errors → Build issue

## 2. Check Network Tab

In DevTools → Network tab:
- Look for failed requests (red)
- Check if `index-BTLiY_Zk.js` and `index-a0eReO8m.css` are loading
- If they show 404, the base path is wrong

## 3. Verify Base Path

The base path in `vite.config.ts` must match your repository name:
- Repository: `itsyagirlalexcote/bens-app`
- Base path should be: `/bens-app/`
- URL will be: `https://itsyagirlalexcote.github.io/bens-app/`

To fix:
1. Edit `vite.config.ts`
2. Change `base: '/bens-app/'` if your repo name differs
3. Commit and push
4. Wait for GitHub Actions to redeploy

## 4. Clear Browser Cache

Sometimes cached files cause issues:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Or clear cache: Settings → Privacy → Clear browsing data

## 5. Check GitHub Actions

1. Go to your repository → **Actions** tab
2. Check if the latest workflow run completed successfully
3. If it failed, check the error message
4. If it succeeded but page is blank, check the deployment URL

## 6. Verify Files Are Deployed

Check that these files exist in your GitHub Pages deployment:
- `index.html`
- `404.html`
- `assets/index-*.js`
- `assets/index-*.css`

## 7. Test Direct Asset URLs

Try accessing these directly in your browser:
- `https://itsyagirlalexcote.github.io/bens-app/assets/index-BTLiY_Zk.js`
- `https://itsyagirlalexcote.github.io/bens-app/assets/index-a0eReO8m.css`

If these fail, the base path is incorrect.

## Common Fixes

### Issue: Assets return 404
**Solution:** Update base path in `vite.config.ts` to match repository name

### Issue: Page loads but is blank
**Solution:** Check console for JavaScript errors, may need to clear cache

### Issue: Routes don't work (404 on refresh)
**Solution:** The 404.html file should handle this. Make sure it's in the `public/` folder and gets deployed.

## Still Not Working?

1. Share the browser console errors
2. Share the Network tab showing which files fail to load
3. Verify the repository name matches the base path exactly

