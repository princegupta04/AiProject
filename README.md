# Estate Listing Platform

A modern real estate listing application built with React and Supabase.

## Features

- User Authentication (Sign up, Login)
- Property Listing Management
- Advanced Search and Filtering
- Modern UI with Tailwind CSS
- Real-time Updates
- Image Upload
- Responsive Design

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Supabase
  - Authentication
  - Database
  - Storage
  - Real-time Subscriptions

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Supabase account

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with your Supabase credentials
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
estate-listing/
├── src/             # React frontend source
├── public/          # Static assets
└── package.json     # Project configuration
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 