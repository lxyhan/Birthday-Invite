# 🎂 Birthday Party Invitation Website

A sophisticated, minimal birthday party invitation website built with Next.js, TypeScript, Tailwind CSS, and Supabase. Features a clean, premium design inspired by modern SaaS products.

## ✨ Features

- **Elegant Design**: Sophisticated, minimal aesthetic with clean typography and subtle shadows
- **RSVP Form**: Beautiful form with validation and real-time feedback
- **Guest List**: Live display of attendees with their contributions
- **Real-time Updates**: Instant updates when new guests RSVP
- **Responsive Design**: Works perfectly on desktop and mobile
- **Modern Stack**: Built with Next.js 14, TypeScript, and Tailwind CSS

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. In your project dashboard, go to **Settings > API**
3. Copy your **Project URL** and **anon/public key**

### 3. Create Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Set Up Database Table

In your Supabase dashboard, go to **SQL Editor** and run this SQL:

```sql
-- Create the rsvps table
CREATE TABLE rsvps (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  bringing TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read and insert access
CREATE POLICY "Allow public read access" ON rsvps FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON rsvps FOR INSERT WITH CHECK (true);
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your birthday invitation website!

## 🎨 Customization

### Party Information

Edit the party details in `src/app/page.tsx`:

```tsx
<h2 className="text-xl md:text-2xl font-medium text-slate-800 mb-3">
  James Han&apos;s Birthday Celebration  {/* Change the name here */}
</h2>
<div className="space-y-1 text-slate-600 text-sm">
  <p>Saturday, September 27th, 2025</p>  {/* Change date */}
  <p>5:00 PM</p>                         {/* Change time */}
  <p>57 St Joseph Street</p>             {/* Change location */}
  <p className="text-slate-500 text-xs">Meet in the lobby</p>  {/* Additional info */}
</div>
```

### Colors and Styling

The design uses a sophisticated slate color palette. You can customize colors by modifying the Tailwind classes:

- Primary background: `bg-slate-50`, `bg-white`
- Text colors: `text-slate-900`, `text-slate-800`, `text-slate-600`
- Accent colors: `bg-slate-900` (buttons), `bg-emerald-50` (success states)

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (recommended)

## 📱 Features in Detail

### RSVP Form
- Clean, accessible form design
- Real-time validation
- Loading states and success feedback
- Error handling for failed submissions

### Guest List
- Real-time updates when new RSVPs are submitted
- Elegant card-based display
- Guest count indicator
- Empty state with encouraging message

### Design System
- Consistent spacing and typography
- Subtle shadows and borders
- Smooth transitions and hover effects
- Mobile-responsive layout

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to add these environment variables in your deployment platform:

```
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key
```

## 🔒 Security

- Row Level Security (RLS) is enabled on the database
- Public read/insert policies allow guests to RSVP and view the list
- No sensitive data is exposed in the frontend
- Environment variables keep your Supabase credentials secure

## 🎯 Future Enhancements

- Email notifications for new RSVPs
- Admin panel for managing guests
- Photo sharing functionality
- Calendar integration
- Custom themes and branding options

---

Built with ❤️ using Next.js and Supabase
