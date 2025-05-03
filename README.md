# AI Movie App

A modern movie booking platform with AI-powered recommendations built with Next.js, MongoDB, and Tailwind CSS.

## Features

- Browse and search movies
- AI-powered movie recommendations
- User authentication
- Ticket booking system
- Responsive design
- Real-time seat selection

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: Custom JWT implementation
- **Styling**: Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ai-movie-app.git
cd ai-movie-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
ai-movie-app/
├── app/                    # Next.js App Router pages
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── models/               # Mongoose models
└── public/               # Static assets
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
