// ========================
// NAVIGATION & HAMBURGER MENU
// ========================

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle hamburger menu
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ========================
// SMOOTH SCROLL BEHAVIOR
// ========================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ========================
// FORM SUBMISSION
// ========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Owner contact config
    const OWNER_EMAIL = "dassubhankar8114@gmail.com";
    const OWNER_WHATSAPP = "918276011939"; // country code + number, no '+'

    // Get form values (using ids)
    const name = this.querySelector("#cf-name").value.trim();
    const email = this.querySelector("#cf-email").value.trim();
    const subject = this.querySelector("#cf-subject").value.trim();
    const message = this.querySelector("#cf-message").value.trim();

    // Validate form
    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields", "error");
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address", "error");
      return;
    }

    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Build mailto link
    const mailSubject = encodeURIComponent(`[Portfolio] ${subject}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from portfolio contact form.`
    );
    const mailtoUrl = `mailto:${OWNER_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    // Build WhatsApp link
    const waText = encodeURIComponent(
      `New portfolio inquiry\nSubject: ${subject}\nFrom: ${name} (${email})\n\n${message}`
    );
    const waUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${waText}`;

    // Open email client and WhatsApp (new tab) in sequence
    try {
      window.location.href = mailtoUrl;
      window.open(waUrl, "_blank");
      showNotification("Opening email and WhatsApp…", "success");
    } catch (err) {
      showNotification(
        "Could not open apps. Please contact via email/WhatsApp.",
        "error"
      );
    }

    // Reset UI
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 500);
  });
}

// ========================
// NOTIFICATION SYSTEM
// ========================

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background-color: ${type === "success" ? "#06d6a0" : "#ff6b6b"};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
    `;

  document.body.appendChild(notification);

  // Auto remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 4000);
}

// ========================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "slideUp 0.6s ease-out forwards";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill tags, project cards, and info items
document
  .querySelectorAll(".skill-tag, .project-card, .info-item, .highlight")
  .forEach((el) => {
    el.style.opacity = "0";
    observer.observe(el);
  });

// ========================
// ACTIVE NAVIGATION LINK
// ========================

window.addEventListener("scroll", () => {
  let current = "";

  const sections = document.querySelectorAll("section");
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// ========================
// DARK MODE TOGGLE (Optional)
// ========================

function initDarkMode() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  if (prefersDark.matches) {
    // Document already styled for light mode, can add dark mode if needed
  }
}

// ========================
// PARALLAX EFFECT (Optional Enhancement)
// ========================

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.style.backgroundPosition = `0 ${scrolled * 0.5}px`;
  }
});

// ========================
// PROJECT CARD CLICK ANIMATION
// ========================

document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-15px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// ========================
// SKILL TAG ANIMATION
// ========================

document.querySelectorAll(".skill-tag").forEach((tag, index) => {
  tag.style.animationDelay = `${index * 0.1}s`;
});

// ========================
// COUNTER ANIMATION (Optional - for statistics)
// ========================

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// ========================
// PAGE LOAD ANIMATION
// ========================

window.addEventListener("load", () => {
  document.body.style.opacity = "1";
});

// ========================
// KEYBOARD SHORTCUTS
// ========================

document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + K to focus on contact
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
  }
});

// ========================
// CONSOLE MESSAGE
// ========================

console.log(
  "%cWelcome to Subhankar Das' Portfolio!",
  "color: #0066cc; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cLet's build something amazing together!",
  "color: #00b4d8; font-size: 14px;"
);

// ========================
// UTILITY FUNCTIONS
// ========================

// Get scroll position
function getScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  return (scrollTop / docHeight) * 100;
}

// Debounce function
function debounce(func, delay) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
}

// Add animation styles dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }

    .nav-link.active {
        color: #00b4d8;
    }

    .nav-link.active::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .nav-link.active::after {
            display: none;
        }

        .nav-link.active {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
            padding: 5px 10px;
        }
    }
`;
document.head.appendChild(style);

// ========================
// INITIALIZE
// ========================

document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio loaded successfully!");
  initDarkMode();
});
