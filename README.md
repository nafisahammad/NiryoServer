# Niryo NED Community

A GitHub Pages website for the Niryo NED robot community at KUET (Khulna University of Engineering & Technology) Robotics Lab.

## Features

- **Explore Page**: Browse projects, guides, and contributions from the community
- **Submit Work**: Share your projects with GitHub repo links and images
- **GitHub OAuth**: Login with your GitHub account (or submit as guest)
- **Niryo NED Theme**: Custom dark theme with robotic aesthetics
- **KUET Branding**: References to the KUET Robotics Lab throughout

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- GitHub Issues API (as database)
- GitHub OAuth Device Flow
- React Router v6

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/NiryoServer.git
   cd NiryoServer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file from the example:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your values:
   - `VITE_GITHUB_OWNER`: Your GitHub username
   - `VITE_GITHUB_REPO`: The repository name (NiryoServer)
   - `VITE_GITHUB_CLIENT_ID`: Your OAuth App Client ID

5. Start development server:
   ```bash
   npm run dev
   ```

## GitHub OAuth Setup

1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Create a new OAuth App
3. Set the callback URL to your GitHub Pages URL
4. Enable Device Flow in the app settings
5. Copy the Client ID to your `.env` file

## Deployment

Build and deploy to GitHub Pages:

```bash
npm run build
npm run deploy
```

Or use GitHub Actions for automatic deployment.

## Project Structure

```
src/
├── components/      # Reusable UI components
├── hooks/           # Custom React hooks
├── pages/           # Page components
├── utils/           # Utility functions
└── App.jsx          # Main app with routing
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see LICENSE file for details
