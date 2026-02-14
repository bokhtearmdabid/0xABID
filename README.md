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
└── VERCEL_DEPLOYMENT.md       # Deployment guide
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Extract the ZIP file**
   ```bash
   unzip 0xabid.zip
   cd 0xabid
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Setup Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` file if needed (default values work for local development)

4. **Run the Development Server**
   ```bash
   npm start
   ```

   Or for development with auto-restart:
   ```bash
   npm run dev
   ```

5. **Open in Browser**
   ```
   http://localhost:3000
   ```

## 📄 Pages

- **Home** (`/`) - Hero section with introduction and featured projects
- **About** (`/about`) - Detailed information about education and certifications
- **Projects** (`/projects`) - Showcase of all projects with details
- **Skills** (`/skills`) - Comprehensive technical skills overview
- **CV** (`/cv`) - Download CV page with professional preview ⭐ NEW
- **Contact** (`/contact`) - Contact information and form
- **404** (any invalid route) - Custom 404 error page

### API Endpoints

- **GET** `/api/portfolio` - Returns portfolio data in JSON format (for future integrations)
- **GET** `/download/cv` - Download CV PDF file ⭐ NEW

### Routes Structure

All routes are managed in `/routes/index.js` for better organization and maintainability.

## 🎨 Customization

### Updating Personal Information

Edit the `portfolioData` object in `/routes/index.js`:

```javascript
const portfolioData = {
  name: 'Your Name',
  title: 'Your Title',
  contact: {
    phone: 'Your Phone',
    email: 'your@email.com',
    // ... other fields
  },
  // ... other sections
};
```

### Adding Your Images

**See [IMAGE_GUIDE.md](IMAGE_GUIDE.md) for detailed instructions**

Quick steps:
1. Add your profile photo to `public/images/profile.jpg`
2. Update `views/home.ejs` to display it
3. Add project images to `public/images/projects/`

### Setting Up Email Notifications

**See [EMAIL_SETUP.md](EMAIL_SETUP.md) for complete setup guide**

Quick steps:
1. Enable 2-Step Verification in Gmail
2. Generate App Password
3. Update `.env` with your credentials
4. Test the contact form

### Changing Colors

Edit CSS variables in `public/css/style.css`:

```css
:root {
  --maroon: #800020;
  --maroon-dark: #5c0017;
  --maroon-light: #a6002a;
  --black: #0a0a0a;
  /* ... other colors */
}
```

### Adding New Pages

1. Create a new EJS file in `views/` directory
2. Add a route in `server.js`:
   ```javascript
   app.get('/new-page', (req, res) => {
     res.render('new-page', { data: portfolioData });
   });
   ```
3. Update navigation in `views/header.ejs`

## 🌐 Deployment

### Deploy to Vercel (Recommended)

**For detailed step-by-step instructions, see [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)**

Quick deploy:

1. Push code to GitHub
2. Import project in Vercel Dashboard
3. Click Deploy!

Or use Vercel CLI:
```bash
npm install -g vercel
vercel login
vercel --prod
```

Your site will be live at: `https://your-project-name.vercel.app`

### Deploy to Render

1. Push your code to GitHub
2. Connect your repository to Render
3. Set build command: `npm install`
4. Set start command: `npm start`

### Deploy to Heroku

1. Install Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create your-app-name`
4. Deploy: `git push heroku main`

### Environment Variables for Production

When deploying, set these environment variables:
- `NODE_ENV=production`
- `PORT` (usually auto-set by hosting platform)

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

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - Get started in 5 minutes
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Deploy to Vercel step-by-step
- **[EMAIL_SETUP.md](EMAIL_SETUP.md)** - Configure email notifications
- **[IMAGE_GUIDE.md](IMAGE_GUIDE.md)** - Add your photos and images
- **[CV_SETUP.md](CV_SETUP.md)** - Enable CV downloads ⭐ NEW

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
