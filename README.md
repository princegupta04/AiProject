# AiProject - Real Estate Listing Application

A modern real estate listing application built with React, Supabase, and Tailwind CSS.

## Features

- User authentication (Sign up, Login, Logout)
- Create, read, update, and delete property listings
- Image upload and management
- Property search and filtering
- Responsive design
- Real-time updates

## Tech Stack

- React
- Vite
- Supabase (Authentication, Database, Storage)
- Tailwind CSS
- React Router
- React Hot Toast

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/AiProject.git
cd AiProject
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

## Project Structure

```
src/
├── components/     # Reusable components
├── pages/         # Page components
├── utils/         # Utility functions
└── App.jsx        # Main application component
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 