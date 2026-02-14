# 0xabid - Portfolio Website

A modern, responsive portfolio website for Bokhtear Md Abid built with Node.js, Express, EJS, and Tailwind CSS.

## 🎨 Features

- **Modern Design**: Black and maroon gradient color scheme with smooth animations
- **Responsive Layout**: Fully responsive across all devices
- **Fast Performance**: Optimized for speed and performance
- **SEO Friendly**: Properly structured with meta tags
- **Easy to Customize**: Clean, well-organized code structure

## 🚀 Technologies Used

- **Backend**: Node.js, Express.js
- **Template Engine**: EJS (Embedded JavaScript)
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Playfair Display, Inter)

## 📁 Project Structure

```
0xabid/
├── public/
│   ├── css/
│   │   └── style.css          # Custom styles
│   ├── js/
│   │   └── main.js            # JavaScript functionality
│   └── images/                # Image assets
├── routes/
│   └── index.js               # Application routes
├── views/
│   ├── header.ejs             # Header/Navbar partial
│   ├── footer.ejs             # Footer partial
│   ├── home.ejs               # Home page
│   ├── about.ejs              # About page
│   ├── projects.ejs           # Projects page
│   ├── skills.ejs             # Skills page
│   ├── contact.ejs            # Contact page
│   └── 404.ejs                # 404 Error page
├── server.js                  # Express server
├── package.json               # Dependencies
├── .env                       # Environment variables (local)
├── .env.example               # Example environment variables
├── vercel.json                # Vercel deployment config
├── README.md                  # Documentation
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### API Endpoints

- **GET** `/api/portfolio` - Returns portfolio data in JSON format (for future integrations)
- **GET** `/download/cv` - Download CV PDF file

### Routes Structure

All routes are managed in `/routes/index.js` for better organization and maintainability.

## 📱 Features Highlight

- ✅ Smooth scroll animations
- ✅ Interactive navbar with active states
- ✅ Mobile-responsive design with working hamburger menu
- ✅ Gradient text effects
- ✅ Hover animations on cards
- ✅ Custom scrollbar styling
- ✅ Social media integration
- ✅ Contact form with email notifications
- ✅ Custom 404 error page
- ✅ Animated profile photo border

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is already in use, you can change it:
```javascript
const PORT = process.env.PORT || 3001; // Change to any available port
```

### CSS Not Loading
Make sure the static files middleware is properly configured in `server.js`:
```javascript
app.use(express.static(path.join(__dirname, 'public')));
```

## 📝 License

This project is open source and available for personal use.

## 👤 Author

**Bokhtear Md Abid**
- Email: bokhtearmdabid@gmail.com
- LinkedIn: [bokhtear-md-abid-928459136](https://linkedin.com/in/bokhtear-md-abid-928459136)
- GitHub: [bokhtearmdabid](https://github.com/bokhtearmdabid)

## 🙏 Acknowledgments

- Design inspired by modern portfolio trends
- Icons by Font Awesome
- Fonts from Google Fonts

---

**Made with ❤️ by Bokhtear Md Abid**
