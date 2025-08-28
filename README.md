# Uwizeyimana Furaha Justine - Portfolio

A modern, professional portfolio website for UI/UX Designer Uwizeyimana Furaha Justine, built with Next.js and featuring AI-powered chat functionality, appointment scheduling, and a reflection journal.

## Features

- **Modern Design**: Clean, professional design with custom color scheme
- **Responsive Layout**: Optimized for all devices and screen sizes
- **AI Chat Widget**: Interactive AI assistant to answer questions about work and experience
- **Appointment Scheduling**: Integrated booking system with Google Calendar sync
- **Reflection Journal**: Blog-style articles with AI summarization
- **Contact Forms**: Protected with reCAPTCHA
- **Admin Dashboard**: Content management system for portfolio updates

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend (Optional)
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **OpenAI API** - AI chat functionality
- **Google Calendar API** - Appointment scheduling
- **SendGrid** - Email notifications

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/uwize-portfolio.git
cd uwize-portfolio
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Set up environment variables:
\`\`\`bash
cp .env.example .env.local
\`\`\`

4. Update the environment variables in `.env.local` with your actual values.

5. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Netlify (Frontend Only)

1. Build the project:
\`\`\`bash
npm run build
\`\`\`

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Add environment variables in Netlify dashboard

### Vercel (Recommended)

1. Install Vercel CLI:
\`\`\`bash
npm i -g vercel
\`\`\`

2. Deploy:
\`\`\`bash
vercel
\`\`\`

## Environment Variables

### Required for Frontend
- `NEXT_PUBLIC_API_URL` - Backend API URL (optional for static features)
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` - reCAPTCHA site key (optional)

### Required for Backend (if using)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `OPENAI_API_KEY` - OpenAI API key for chat functionality
- `SENDGRID_API_KEY` - SendGrid API key for emails
- `GOOGLE_CALENDAR_CLIENT_ID` - Google Calendar API credentials
- `GOOGLE_CALENDAR_CLIENT_SECRET` - Google Calendar API credentials

## Features Overview

### Portfolio Sections
- **Hero Section**: Introduction with profile image and call-to-action buttons
- **Get to Know Me**: Personal journey and design philosophy in card layout
- **Latest Work**: Showcase of design projects and case studies
- **Reflection Journal**: Blog-style articles with categories and AI summarization
- **Professional Materials**: Downloadable CV and cover letter
- **Connect**: Links to Behance and Dribbble profiles
- **Contact**: Contact form with reCAPTCHA protection

### Interactive Features
- **AI Chat Widget**: Floating chat button with intelligent responses
- **Appointment Booking**: Calendar integration with available time slots
- **Journal Navigation**: Full journal listing with search and filtering
- **Responsive Design**: Mobile-first approach with smooth animations

## Customization

### Colors
The portfolio uses a custom color scheme defined in `app/globals.css`:
- Primary: #FF6F61 (Coral)
- Secondary: #D4AF7F (Gold)
- Background: #FFF8F0 (Soft Cream)
- Text: #333333 (Dark Gray)

### Content
Update the content in the respective component files:
- Hero content: `components/sections/hero-section.tsx`
- About content: `components/sections/get-to-know-me-section.tsx`
- Projects: `components/sections/latest-work-section.tsx`
- Journal articles: `components/sections/reflection-journal-section.tsx`

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Uwizeyimana Furaha Justine
- Email: uwizefuraha@gmail.com
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn Profile]
