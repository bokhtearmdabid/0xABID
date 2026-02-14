require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const indexRoutes = require('./routes/index');
app.use('/', indexRoutes);

// 404 Error Handler
app.use((req, res) => {
  res.status(404).render('404', { 
    data: { 
      name: 'Bokhtear Md Abid',
      contact: {
        email: 'bokhtearmdabid@gmail.com',
        linkedin: 'bokhtear-md-abid-928459136',
        github: 'bokhtearmdabid',
        instagram: 'bokhtearmdabid'
      }
    } 
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   🚀 Server is running successfully!   ║
  ╠════════════════════════════════════════╣
  ║   Environment: ${process.env.NODE_ENV || 'development'}           ║
  ║   Port: ${PORT}                          ║
  ║   URL: http://localhost:${PORT}         ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
