# Niryo NED Robot Community Website - Implementation Plan

## Overview
A React + Vite website hosted on GitHub Pages for the Niryo NED robot lab community. Features an explore page for browsing submissions, GitHub OAuth authentication, and GitHub Issues as the database.

---

## Tech Stack
| Component | Technology |
|-----------|-----------|
| Frontend | React 18 + Vite |
| Routing | React Router v6 |
| Styling | Tailwind CSS |
| GitHub API | Octokit.js |
| Auth | GitHub OAuth Device Flow |
| Database | GitHub Issues API |
| Hosting | GitHub Pages |

---

## Project Structure

```
NiryoServer/
├── public/
│   └── images/              # Static images (logo, hero)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Footer.jsx        # Footer
│   │   ├── PostCard.jsx      # Card for explore page
│   │   ├── SubmissionForm.jsx # Form for new submissions
│   │   ├── LoginButton.jsx   # GitHub login button
│   │   └── MarkdownRenderer.jsx # Render markdown content
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Explore.jsx       # Browse all submissions
│   │   ├── Post.jsx          # Individual post view
│   │   ├── Submit.jsx        # Submit new work
│   │   ├── Guide.jsx         # Robot guides/tutorials
│   │   └── About.jsx         # About the lab
│   ├── hooks/
│   │   ├── useGitHubAuth.js  # GitHub OAuth hook
│   │   └── useIssues.js      # Fetch/create issues hook
│   ├── utils/
│   │   └── github.js         # Octokit configuration
│   ├── App.jsx               # Router setup
│   ├── main.jsx              # Entry point
│   └── index.css             # Tailwind imports
├── package.json
├── vite.config.js
├── tailwind.config.js
└── .env                      # GitHub tokens (not committed)
```

---

## Data Model (GitHub Issues)

### Issue Format
Each submission is a GitHub issue with this structure:

```markdown
---
author: "John Doe"
github_username: "johndoe"
repo_url: "https://github.com/johndoe/niryo-project"
category: "project"
images:
  - "https://i.imgur.com/abc123.jpg"
  - "https://i.imgur.com/def456.jpg"
tags: ["pick-and-place", "opencv", "python"]
---

## Description
Detailed description of the project...

## How to Run
1. Clone the repo
2. Install dependencies
3. Run the script
```

### Labels for Categorization
- `submission` - All posts
- `project` - Project showcases
- `guide` - Tutorials/guides
- `question` - Q&A
- `featured` - Highlighted content

---

## Authentication Flow (GitHub Device Flow)

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  User Clicks │     │   GitHub    │     │    User     │
│  "Login"     │────▶│  Device     │────▶│  Enters     │
│              │     │  Flow API   │     │  Code       │
└─────────────┘     └─────────────┘     └─────────────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Get Access │     │  Poll for   │
                    │  Token      │◀────│  Token      │
                    └─────────────┘     └─────────────┘
```

**Why Device Flow?**
- Works without a backend server
- Secure (no client secret exposed)
- Perfect for GitHub Pages deployment

---

## Pages

### 1. Home Page
- Hero section with Niryo NED robot image
- Brief description of the lab
- Quick links to Explore, Guide, Submit
- Featured submissions carousel

### 2. Explore Page
- Grid/list of all submissions (from GitHub Issues)
- Filter by: category, tags, date
- Search functionality
- Pagination (10 per page)

### 3. Post Page
- Full post content (markdown rendered)
- Image gallery
- Author info
- GitHub repo link
- Related posts

### 4. Submit Page
- Two options:
  - **Logged in**: Submit with GitHub account
  - **Guest**: Submit with name only
- Form fields:
  - Title (required)
  - Description (markdown supported)
  - Category (project/guide/question)
  - GitHub repo URL
  - Image URLs
  - Tags

### 5. Guide Page
- Curated guides for Niryo NED
- Getting started
- Basic operations
- Programming tutorials
- Common issues

### 6. About Page
- Lab information
- Team members
- Contact info
- Contributing guidelines

---

## Environment Variables (.env)

```env
VITE_GITHUB_OWNER=your-username
VITE_GITHUB_REPO=NiryoServer
VITE_GITHUB_CLIENT_ID=your-oauth-app-client-id
```

**Note**: Never commit `.env` file!

---

## GitHub OAuth App Setup

1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Create new OAuth App
3. Set callback URL to your GitHub Pages URL
4. Note the Client ID
5. Enable Device Flow in the app settings

---

## Image Hosting Strategy

Since GitHub Issues don't support direct image uploads via API:
- Users provide image URLs (Imgur, Google Drive, etc.)
- Or use a free image host like:
  - [Imgur](https://imgur.com)
  - [Cloudinary](https://cloudinary.com) (free tier)
  - [Postimages](https://postimages.org)

---

## Build & Deploy

### Development
```bash
npm install
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to GitHub Pages
- Vite config: `base: '/NiryoServer/'`
- Use `gh-pages` package or GitHub Actions

---

## Implementation Steps

### Phase 1: Project Setup
1. Initialize Vite + React project
2. Install dependencies
3. Configure Tailwind CSS
4. Set up React Router

### Phase 2: Core Components
5. Create Navbar and Footer
6. Build PostCard component
7. Implement MarkdownRenderer

### Phase 3: GitHub Integration
8. Set up Octokit
9. Implement GitHub Device Flow auth
10. Create useIssues hook

### Phase 4: Pages
11. Build Home page
12. Build Explore page with filters
13. Build Post detail page
14. Build Submit form
15. Build Guide and About pages

### Phase 5: Polish & Deploy
16. Add responsive design
17. Test all features
18. Deploy to GitHub Pages
19. Create README documentation

---

## Future Enhancements (Optional)
- Comments on posts (GitHub Issue comments)
- User profiles
- Email notifications
- Mobile app (PWA)
