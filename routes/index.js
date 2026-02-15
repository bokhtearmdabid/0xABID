const express = require('express');
const router = express.Router();
const { sendEmail, createContactEmailTemplate } = require('../config/email');

// Portfolio data
const portfolioData = {
  name: 'Bokhtear Md Abid',
  title: 'Full-Stack Web Developer',
  contact: {
    phone: '+8801628759989',
    email: 'bokhtearmdabid@gmail.com',
    address: '[Hidden], Azimpur, Dhaka-1205',
    linkedin: 'bokhtear-md-abid-928459136',
    instagram: 'abix404',
    github: 'bokhtearmdabid'
  },
  profile: 'Detail-oriented Web Developer and final-year Computer Science student with hands-on experience building responsive, scalable web applications using Django, Node.js, and modern front-end technologies. Skilled in REST API integration, authentication systems, database design, and deployment. Passionate about clean code, performance optimization, and delivering user-centric digital solutions.',
  skills: {
    languages: ['Python (Advanced)', 'JavaScript' , 'C' , 'HTML5/CSS3'],
    frameworks: ['Django', 'React', 'Bootstrap', 'Express'],
    softwareEngineering: ['OOP', 'SDLC'],
    dataManagement: ['SQL', 'Firebase'],
    versionControl: ['Git and GitHub'],
    deployment: ['Render' , 'Vercel'],
    connectivity: ['REST APIs']
  },
  projects: [
    {
      name: 'RoktoDan BD',
      subtitle: 'Full-Stack Web Platform',
      url: 'https://roktodanbd.onrender.com/',
      description: 'Built a fully functional platform to bridge the gap between blood donors and patients in critical need. Features include secure user authentication (Donor & Recipient), real-time donor search, and profile management.',
      tech: ['Django', 'HTML5', 'CSS3', 'Render'],
      image: "/images/projects/roktodanbd.png"
    },
    {
      name: 'Rannaghore Protidin',
      subtitle: 'E-Commerce Web Platform',
      url: 'https://rannaghore-protidin.onrender.com/',
      description: 'Developed a fully functional e-commerce platform for selling baking supplies and household essentials. Includes user-friendly product browsing, cart system, order management, and responsive design for seamless shopping across devices.',
      tech: ['Django', 'HTML5', 'CSS3', 'Neon SQL', 'Render'],
      image: "/images/projects/rannaghoreprotidin.png"
    },
    {
      name: 'HUMMI',
      subtitle: 'Social Communication App',
      url: 'https://github.com/bokhtearmdabid/HUMMI-Social_Communication_App',
      description: 'Built a TypeScript-based social communication app that enables users to match and connect with others based on mutual interest. Features include user profile creation, swipe-style matching system, real-time interaction logic, and clean modular architecture for scalability.',
      tech: ['TypeScript', 'React Native', 'Expo', 'Firebase', 'Firestore DB'],
      image: "/images/projects/hummi_app.png"
    },

    {
      name: 'Prediction of Dengue Cases in Bangladesh',
      subtitle: 'Machine Learning & Python',
      description: 'Designed a predictive model to analyze historical data and forecast Dengue outbreaks in Bangladesh. Applied Machine Learning algorithms to identify trends, aiding in proactive public health measures.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Data Visualization'],
    },
    {
      name: 'Himaagar-Share',
      subtitle: 'Cold Storage Solution | System Analysis & Design',
      description: 'Conceptualized an "Airbnb-style" platform connecting farmers with available cold storage to reduce agricultural waste. Designed the system architecture and database schema to optimize supply chain logistics.',
      tech: ['System Design', 'Database Architecture'],
      image: "/images/projects/himaagarshare.png"
    }
  ],
  education: [
    {
      degree: 'B.Sc. in Computer Science & Engineering',
      institution: 'University of Asia Pacific, Dhaka',
      year: '2022-2026',
      cgpa: '3.08',
      status: '4th Year, Final Semester (Expected Graduation: 2026)'
    },
    {
      degree: 'Higher Secondary Certificate',
      institution: 'Birshreshtha Munshi Abdur Rouf Public College',
      year: '2020',
      gpa: '5.0'
    },
    {
      degree: 'Secondary School Certificate',
      institution: 'Birshreshtha Munshi Abdur Rouf Public College',
      year: '2018',
      gpa: '5.0'
    }
  ],
  certifications: [
    'AI+ Prompt Engineer (AI CERTs)',
    'Flutter App Development'
  ],
  languages: ['English (Advanced)', 'Bengali (Native)']
};

// Home Route
router.get('/', (req, res) => {
  res.render('home', { data: portfolioData });
});

// About Route
router.get('/about', (req, res) => {
  res.render('about', { data: portfolioData });
});

// Projects Route
router.get('/projects', (req, res) => {
  res.render('projects', { data: portfolioData });
});

// Skills Route
router.get('/skills', (req, res) => {
  res.render('skills', { data: portfolioData });
});

// Contact Route
router.get('/contact', (req, res) => {
  res.render('contact', { data: portfolioData });
});

// CV Page Route
router.get('/cv', (req, res) => {
  res.render('cv', { data: portfolioData });
});

// CV Download Route
router.get('/download/cv', (req, res) => {
  const file = `${__dirname}/../public/cv/CV_Bokhtear_Md_Abid.pdf`;
  res.download(file, 'CV_Bokhtear_Md_Abid.pdf', (err) => {
    if (err) {
      console.error('Error downloading CV:', err);
      res.status(404).send('CV not found. Please add your CV file to public/cv/ directory.');
    }
  });
});

// Contact Form Submission
router.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate input
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Create email template
    const emailTemplate = createContactEmailTemplate({
      name,
      email,
      subject,
      message
    });

    // Send email
    const result = await sendEmail(
      { name, email },
      `Portfolio Contact: ${subject}`,
      emailTemplate.text,
      emailTemplate.html
    );

    if (result.success) {
      return res.json({
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send message. Please try again or email me directly.'
      });
    }
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred. Please try again later.'
    });
  }
});

// API endpoint to get portfolio data (optional - for future use)
router.get('/api/portfolio', (req, res) => {
  res.json(portfolioData);
});

module.exports = router;
