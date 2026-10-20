// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    
    // Toggle icon
    const icon = menuBtn.querySelector('svg');
    if (mobileMenu.classList.contains('active')) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
    } else {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
    }
  });
}

// Active link highlighting
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  const linkPath = new URL(link.href).pathname;
  if (linkPath === currentPath || (currentPath === '/' && linkPath === '/')) {
    link.classList.add('active');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.card, .skill-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease';
  observer.observe(el);
});

// Typing effect for hero
const typingText = document.getElementById('typingText');
if (typingText) {
  const text = typingText.textContent;
  typingText.textContent = '';
  let i = 0;
  
  const typeWriter = () => {
    if (i < text.length) {
      typingText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };
  
  setTimeout(typeWriter, 500);
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.parallax');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.speed || 0.5;
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Copy email to clipboard
const emailLinks = document.querySelectorAll('.copy-email');
emailLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const email = link.textContent;
    navigator.clipboard.writeText(email).then(() => {
      // Show tooltip
      const tooltip = document.createElement('span');
      tooltip.textContent = 'Copied!';
      tooltip.style.cssText = `
        position: absolute;
        background: var(--maroon);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.875rem;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      `;
      link.style.position = 'relative';
      link.appendChild(tooltip);
      
      setTimeout(() => {
        tooltip.remove();
      }, 2000);
    });
  });
});

(function () {
  const toggle = document.getElementById('chat-toggle');
  const box = document.getElementById('chat-box');
  const closeBtn = document.getElementById('chat-close');
  const messagesEl = document.getElementById('chat-messages');
  const input = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  if (!toggle) return;

  const history = []; // the conversation memory

  function addMessage(text, who) {
    const div = document.createElement('div');
    div.className = 'msg ' + who;
    div.textContent = text; // textContent
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    return div;
  }

  addMessage("Hi! 👋 I'm Abid's AI assistant. How can I help you?.", 'bot');

  toggle.addEventListener('click', () => box.classList.toggle('hidden'));
  closeBtn.addEventListener('click', () => box.classList.add('hidden'));

  async function send() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    history.push({ role: 'user', content: text });
    input.value = '';
    sendBtn.disabled = true;
    const typing = addMessage('Typing...', 'bot');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await res.json();
      typing.textContent = data.reply;
      history.push({ role: 'assistant', content: data.reply });
    } catch (e) {
      typing.textContent = 'Connection error. Please try again.';
      history.pop(); // remove the failed user message
    } finally {
      sendBtn.disabled = false;
      input.focus();
    }
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') send(); });
})();