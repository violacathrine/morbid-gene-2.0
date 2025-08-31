# 🔥 Morbid Gene 2.0 - Official Band E-Commerce Platform

A full-stack modern web application built for the Swedish metal band Morbid Gene, featuring an integrated e-commerce solution with Spreadshirt API integration, user authentication, and a comprehensive content management system.

## 🎯 Project Overview

This application serves as both the official band website and merchandise store for Morbid Gene. Built with React 19 and Node.js, it provides a seamless user experience across multiple device types with a focus on mobile-first design and accessibility.

**Live Demo:** [www.morbidgeneofficial.com]

## ✨ Key Features

### 🛍️ E-Commerce
- **Merchandise Store** with real-time Spreadshirt API integration
- **Shopping Cart** with persistent state management
- **Product Catalog** with filtering and search capabilities
- **Secure Checkout** with external payment processing
- **User Favorites** with authenticated wishlist functionality

### 👤 User Management
- **JWT Authentication** with secure httpOnly cookies
- **User Registration & Login** with password encryption
- **Account Settings** with profile management
- **Session Management** with automatic cleanup

### 🎵 Band Content
- **Media Gallery** with responsive image displays
- **Gigs Schedule** with venue and ticket information
- **Contact Forms** for general inquiries and booking requests

### 📱 Technical Excellence
- **Fully Responsive** design (320px - 1600px+)
- **Accessibility Compliant** with WCAG standards
- **Progressive Enhancement** with loading states
- **Real-time Updates** via Context API state management

## 🏗️ Technical Architecture

### Frontend Stack
- **React 19** - Latest React with modern hooks
- **Vite** - Fast build tool and development server
- **React Router DOM 7** - Client-side routing with nested routes
- **Styled Components** - CSS-in-JS styling solution
- **Context API** - Global state management
- **React Icons** - Comprehensive icon library

### Backend Stack
- **Node.js** with **Express 4** - RESTful API server
- **MongoDB** with **Mongoose** - Document database
- **JWT** - Secure token-based authentication
- **bcryptjs** - Password hashing and validation
- **Nodemailer** - Email service integration
- **Axios** - HTTP client for external APIs

### External Integrations
- **Spreadshirt API** - Merchandise and fulfillment
- **Email Service** - Contact form and notifications
- **Cookie Management** - Secure session handling

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

### Environment Variables

Create `.env` files in both frontend and backend directories:

**Backend `.env`:**
```env
# Database
MONGO_URL=mongodb://localhost:

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-here

# Spreadshirt API
SPREADSHOP_ID=your-spreadshop-id
SPREADSHOP_API_KEY=your-api-key
SPREAD_USER_AGENT=YourApp/1.0

# Email Service (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password

# Server
PORT=8080
```

**Frontend `.env` (if needed):**
```env
VITE_API_URL=http://localhost:
```

### Installation Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/morbid-gene-2.0.git
cd morbid-gene-2.0
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Start development servers**

In separate terminals:

```bash
# Backend (from backend directory)
npm run dev

# Frontend (from frontend directory)  
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080`

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start production backend
cd ../backend
npm start
```

## 🗂️ Project Structure

```
morbid-gene-2.0/
├── backend/                    # Node.js API server
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth & request processing
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API endpoints
│   ├── services/             # External API integrations
│   ├── utils/                # Helper functions
│   └── server.js             # Express server setup
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── contexts/         # React Context providers
│   │   ├── hooks/            # Custom React hooks
│   │   ├── pages/            # Route components
│   │   ├── styles/           # Global styles & themes
│   │   ├── utils/            # Helper functions
│   │   └── App.jsx           # Main application component
│   │
│   ├── public/               # Static assets
│   └── package.json          # Frontend dependencies
│
└── README.md                 # This file
```

## 🎮 Usage Guide

### For Users

1. **Browse Merchandise**: Visit the shop to see available products
2. **Create Account**: Register to save favorites
3. **Add to Cart**: Select size, color, and quantity for products
4. **Secure Checkout**: Complete purchase through Spreadshirt
5. **Manage Account**: Update profilesettings

### For Developers

1. **API Integration**: Use the RESTful endpoints (see API.md)
2. **Theme Customization**: Modify `styles/theme.js` for visual changes
3. **Component Development**: Follow the established patterns in `/components`
4. **State Management**: Use Context providers for global state

## 🚀 Deployment

### Backend Deployment
The backend can be deployed to any Node.js hosting service:
- Railway
- Heroku  
- DigitalOcean App Platform
- AWS EC2

### Frontend Deployment
The frontend builds to static files compatible with:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

### Database
MongoDB can be hosted on:
- MongoDB Atlas (recommended)
- Local MongoDB instance
- DigitalOcean Managed Databases

## 🔧 Development

### Available Scripts

**Frontend:**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

**Backend:**
```bash
npm run dev      # Start with nodemon (development)
npm start        # Start production server
```

### Development Guidelines

1. **Code Style**: Follow existing patterns and use ESLint
2. **Components**: Keep components focused and reusable
3. **State Management**: Use Context API for global state
4. **Styling**: Use styled-components with the theme system
5. **API Calls**: Use the established API utilities

### Custom Hooks

The application includes several custom React hooks:

- `useProduct(productId)` - Fetch single product data
- `useMerch()` - Fetch product catalog with filtering
- `useProductImages(productId, colorId)` - Fetch product images

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## 🎸 About Morbid Gene

Morbid Gene is a Swedish metal band formed in [2021]. Known for their melodoc, crushing riffs and atmospheric soundscapes, they have performed across Sweden and are working on their way to the top. 

## 📧 Support

For technical issues or questions:
- Contact: [cathrineohlsson@live.se]

For band-related inquiries:
- Use the contact form on the website
- Email: [morbidgenemusic@gmail.com]

---

**Built with ❤️ and 🤘 by [Cathi]**

*This project represents the culmination of modern full-stack web development practices, combining React 19, Node.js, and MongoDB to create a production-ready e-commerce platform.*