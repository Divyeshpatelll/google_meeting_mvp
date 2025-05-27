# Google Meet Scheduler

A modern web application built with Next.js that allows users to create instant Google Meet links and schedule meetings for future dates. The application uses Google Calendar API for meeting creation and NextAuth.js for authentication.

## Features

- 🔐 Google Authentication
- 🚀 Instant Meeting Creation
- 📅 Schedule Future Meetings
- ⏰ Time Validation
  - Prevents scheduling meetings in the past
  - Ensures end time is after start time
  - Validates required time fields
- 🎨 Modern UI with Tailwind CSS
- 🔄 Loading States & Indicators
- 📱 Responsive Design

## Prerequisites

Before you begin, ensure you have:
- Node.js 16+ installed
- A Google Cloud Project with:
  - Google Calendar API enabled
  - OAuth 2.0 credentials configured
  - Authorized redirect URIs set up

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd google-meeting-mvp
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Enable the Google Calendar API
4. Configure OAuth consent screen:
   - Add required scopes:
     - `openid`
     - `email`
     - `profile`
     - `https://www.googleapis.com/auth/calendar`
5. Create OAuth 2.0 credentials:
   - Add authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://google-meeting-mvp.vercel.app/`

## Deployment on Vercel

1. Push your code to a GitHub repository

2. Visit [Vercel](https://vercel.com) and:
   - Create a new project
   - Import your GitHub repository
   - Add environment variables:
     ```
     GOOGLE_CLIENT_ID=your_google_client_id
     GOOGLE_CLIENT_SECRET=your_google_client_secret
     NEXTAUTH_URL=https://your-domain.com
     NEXTAUTH_SECRET=your_nextauth_secret
     ```
   - Deploy the project

3. After deployment:
   - Add your production domain to Google Cloud Console's authorized redirect URIs
   - Update the OAuth consent screen settings if needed

## Usage

1. Sign in with your Google account
2. Create an instant meeting:
   - Click "Generate Meet Link"
   - Copy and share the meeting link

3. Schedule a future meeting:
   - Select start date and time
   - Select end date and time
   - Click "Schedule Meeting"
   - Share the generated meeting link

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Google Calendar API](https://developers.google.com/calendar) - Meeting creation
- [Vercel](https://vercel.com) - Deployment

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
