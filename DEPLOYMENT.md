# GitHub Pages Deployment Guide

This guide will help you deploy the Nutrition Tracker app to GitHub Pages.

## Prerequisites

- A GitHub account
- The repository pushed to GitHub

## Deployment Steps

### Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** tab
   - Scroll down to **Pages** section
   - Under **Source**, select **GitHub Actions**
   - Save the settings

3. **Update the base path (if needed):**
   - Open `vite.config.ts`
   - If your repository name is NOT "bens-app", update the base path:
     ```typescript
     base: '/your-repo-name/',
     ```
   - Commit and push the change

4. **Trigger the workflow:**
   - The GitHub Actions workflow will automatically run on push
   - Go to **Actions** tab to see the deployment progress
   - Once complete, your app will be available at:
     `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option 2: Manual Deployment

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Push the dist folder to gh-pages branch:**
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. **Enable GitHub Pages:**
   - Go to repository Settings → Pages
   - Select source branch: `gh-pages`
   - Save

## Important Notes

- **Repository Name:** Make sure the base path in `vite.config.ts` matches your repository name
- **Custom Domain:** If using a custom domain, change base to `'/'` in `vite.config.ts`
- **Routing:** The app uses React Router with the correct base path configuration
- **Local Storage:** Data is stored in the browser's local storage (client-side only)

## Troubleshooting

- **404 on refresh:** Make sure the base path matches your repository name
- **Assets not loading:** Check that `vite.config.ts` has the correct base path
- **Build fails:** Ensure all dependencies are installed with `npm install`

## Access Your Deployed App

Once deployed, your app will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

