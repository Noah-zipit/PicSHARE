# PicShare - Anonymous Image Sharing App

PicShare is a modern web application that allows users to receive anonymous image submissions through personalized sharing links. Similar to NGL but for images, it provides a platform for collecting pictures from friends and followers without revealing the sender's identity.

![PicShare App Banner](https://placeholder-for-app-screenshot.com/banner.png)

## 🌟 Features

- **Anonymous Image Sharing**: Receive images from anyone without revealing their identity
- **Personal Share Links**: Each user gets a unique shareable link
- **User Dashboard**: View all received images in a clean gallery interface
- **Dark/Light Mode**: Choose your preferred theme
- **Mobile Responsive**: Works seamlessly on all devices
- **Social Sharing**: Easily share your link on social media platforms

## 🛠️ Technologies

- **Frontend**: Svelte, Svelte Routing
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Local storage (can be upgraded to Cloudinary)

## 📋 Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

## 🚀 Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/picshare.git
cd picshare
```

### Set up the backend

```bash
cd backend
npm install
```

### Set up the frontend

```bash
cd ../frontend
npm install
```

### Environment Configuration

1. Create a `.env` file in the backend directory:

```
PORT=5001
MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster.mongodb.net/anonymous-pics
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

2. Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5001/api
```

## 🏃‍♂️ Running the Application

### Start the backend server

```bash
cd backend
npm run dev
```

Your backend server should now be running on port 5001.

### Start the frontend development server

```bash
cd frontend
npm run dev
```

Your frontend application should now be running at http://localhost:5173.

## 📱 Usage

1. **Registration**: Create an account to get your unique sharing link
2. **Dashboard**: Access your dashboard to view your sharing link and received images
3. **Share Your Link**: Copy and share your link with friends through social media
4. **Receive Images**: As people visit your link, they can send you images anonymously
5. **View Gallery**: See all received images in your personal dashboard

## 🌐 Deployment

### Backend Deployment (Render)

1. Sign up for [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && node server.js`
5. Add your environment variables
6. Deploy

### Frontend Deployment (Netlify)

1. Sign up for [Netlify](https://netlify.com)
2. Create a new site from Git
3. Connect your GitHub repository
4. Configure the build settings:
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `public`
5. Add environment variables
6. Create a `_redirects` file in the `frontend/public` directory:
   ```
   /* /index.html 200
   ```
7. Deploy

### Database Deployment

1. Create a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
2. Set up a free cluster
3. Create a database user
4. Whitelist IP addresses (0.0.0.0/0 for public access)
5. Get your connection string and update it in your backend environment variables

## 📷 Screenshots

![Home Page](https://placeholder-for-app-screenshot.com/home.png)
![Dashboard](https://placeholder-for-app-screenshot.com/dashboard.png)
![Send Image Page](https://placeholder-for-app-screenshot.com/send-image.png)

## 🛑 Security Considerations

- Never commit `.env` files to version control
- Use strong, unique passwords for your MongoDB Atlas account
- Regularly update dependencies to patch security vulnerabilities
- Consider implementing rate limiting for production deployments

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgements

- [Svelte](https://svelte.dev/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Multer](https://github.com/expressjs/multer)
- [JSON Web Tokens](https://jwt.io/)

---

Created by Noah - A modern anonymous image sharing platform inspired by NGL.
