# Nutrition Tracker App

A clean, iOS-inspired nutrition tracking application for nutritionists and their clients.

## Features

- **User Authentication**: Simple login system with role-based access (client/coach)
- **Dashboard**: View daily metrics including calories, macros, water intake, and sleep
- **Data Tracking**: Log nutrition data, meals, hydration, and sleep hours
- **Data Sharing**: Clients can share their daily data with their coach
- **Coach View**: Nutritionists can view all shared client data organized by date
- **iOS-Inspired Design**: Clean, modern interface with iOS design principles

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

## Usage

### As a Client

1. Login with any email/password (demo mode)
2. Navigate to "Track Data" to log your daily nutrition and health metrics
3. View your dashboard to see all metrics at a glance
4. Click "Share with Coach" to send your data to your nutritionist

### As a Coach

1. Login with an email containing "coach" (e.g., `coach@example.com`)
2. Navigate to the Coach Dashboard to view all shared client data
3. Data is organized by date with expandable sections

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Local Storage (for data persistence)

## Data Storage

Currently, all data is stored in the browser's local storage. In a production environment, this would be replaced with a backend API and database.

## Deployment to GitHub Pages

This app is configured for GitHub Pages deployment.

### Quick Deploy

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**
   - Save settings

3. **Update base path** (if repo name differs from "bens-app"):
   - Edit `vite.config.ts`
   - Change `base: '/bens-app/'` to match your repository name
   - Commit and push

4. **Access your app:**
   - After deployment completes, visit:
   - `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

See `DEPLOYMENT.md` for detailed instructions.

## Live Demo

Once deployed, your app will be accessible via GitHub Pages at the URL shown above.

