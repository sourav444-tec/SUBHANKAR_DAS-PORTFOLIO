// ========================
// DISABLE INSPECT & DEVELOPER TOOLS
// ========================

// Disable right-click context menu (except on links)
document.addEventListener("contextmenu", (e) => {
  // Allow right-click on links (a tags)
  if (e.target.tagName === "A" || e.target.closest("a")) {
    return true;
  }
  e.preventDefault();
  return false;
});

// Disable keyboard shortcuts for developer tools
document.addEventListener("keydown", (e) => {
  // F12 - Open Developer Tools
  if (e.key === "F12") {
    e.preventDefault();
    return false;
  }

  // Ctrl+Shift+I (Windows/Linux) - Inspect Element
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
    return false;
  }

  // Ctrl+Shift+J (Windows/Linux) - Console
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
    return false;
  }

  // Ctrl+Shift+C (Windows/Linux) - Inspect Element picker
  if (e.ctrlKey && e.shiftKey && e.key === "C") {
    e.preventDefault();
    return false;
  }

  // Cmd+Option+I (Mac) - Inspect Element
  if (e.metaKey && e.altKey && e.key === "i") {
    e.preventDefault();
    return false;
  }

  // Cmd+Option+J (Mac) - Console
  if (e.metaKey && e.altKey && e.key === "j") {
    e.preventDefault();
    return false;
  }

  // Cmd+Option+U (Mac) - View Source
  if (e.metaKey && e.altKey && e.key === "u") {
    e.preventDefault();
    return false;
  }
});

// Detect if developer tools are open (optional - less aggressive version)
const checkDevTools = () => {
  const threshold = 160;
  if (
    window.outerHeight - window.innerHeight > threshold ||
    window.outerWidth - window.innerWidth > threshold
  ) {
    console.warn("Developer tools detected - please close them");
  }
};

// Only check once on load, not continuously
window.addEventListener("load", checkDevTools);

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
// PROJECT MODALS (ALL PROJECTS)
// ========================

// Modal references
const modals = {
  wellness: {
    modal: document.getElementById("wellnessModal"),
    btn: document.getElementById("wellnessViewBtn"),
  },
  hrms: {
    modal: document.getElementById("hrmsModal"),
    btn: document.getElementById("hrmsViewBtn"),
  },
  recruitment: {
    modal: document.getElementById("recruitmentModal"),
    btn: document.getElementById("recruitmentViewBtn"),
  },
  analytics: {
    modal: document.getElementById("analyticsModal"),
    btn: document.getElementById("analyticsViewBtn"),
  },
  lms: {
    modal: document.getElementById("lmsModal"),
    btn: document.getElementById("lmsViewBtn"),
  },
  compliance: {
    modal: document.getElementById("complianceModal"),
    btn: document.getElementById("complianceViewBtn"),
  },
};

// Function to open modal
function openModal(modalObj) {
  if (modalObj.modal) {
    modalObj.modal.classList.add("active");
  }
}

// Function to close modal
function closeModal(modalObj) {
  if (modalObj.modal) {
    modalObj.modal.classList.remove("active");
  }
}

// Add click handlers for all project buttons
Object.values(modals).forEach(({ btn, modal }) => {
  if (btn) {
    btn.addEventListener("click", () => openModal({ modal }));
  }

  if (modal) {
    // Close button inside modal
    const closeBtn = modal.querySelector(".project-modal-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => closeModal({ modal }));
    }

    // Close button at footer
    const closeFooterBtn = modal.querySelector(".project-modal-close-btn");
    if (closeFooterBtn) {
      closeFooterBtn.addEventListener("click", () => closeModal({ modal }));
    }

    // Close when clicking outside
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal({ modal });
      }
    });
  }
});

// Close all modals with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    Object.values(modals).forEach(({ modal }) => {
      if (modal && modal.classList.contains("active")) {
        closeModal({ modal });
      }
    });
  }
});

// ========================
// PROJECT MODAL (WELLNESS PROGRAM) - LEGACY
// ========================

const wellnessModal = modals.wellness.modal;
const wellnessViewBtn = modals.wellness.btn;

// Legacy compatibility - remove duplicates if any
if (wellnessViewBtn) {
  wellnessViewBtn.addEventListener("click", () => {
    openModal(modals.wellness);
  });
}

// ========================
// EMAIL COMPOSE MODAL
// ========================

const emailModal = document.getElementById("emailModal");
const emailComposeForm = document.getElementById("emailComposeForm");
const emailModalClose = document.querySelector(".email-modal-close");
const emailModalCancel = document.querySelector(".email-modal-cancel");

// Function to open email modal
function openEmailModal(e) {
  const href = this.getAttribute("href");

  // For email links, open the compose modal instead
  if (href.startsWith("mailto:")) {
    e.preventDefault();
    emailModal.classList.add("active");

    // Extract email from mailto link
    const emailAddress = href.replace("mailto:", "");
    document.getElementById("email-to").value = emailAddress;
    document.getElementById("email-from").focus();
  } else {
    // For other links, allow normal behavior
    return true;
  }
}

// Function to close email modal
function closeEmailModal() {
  emailModal.classList.remove("active");
  emailComposeForm.reset();
}

// Close modal when close button is clicked
emailModalClose.addEventListener("click", closeEmailModal);

// Close modal when cancel button is clicked
emailModalCancel.addEventListener("click", closeEmailModal);

// Close modal when clicking outside the modal content
emailModal.addEventListener("click", (e) => {
  if (e.target === emailModal) {
    closeEmailModal();
  }
});

// Handle email form submission
emailComposeForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const from = document.getElementById("email-from").value;
  const to = document.getElementById("email-to").value;
  const subject = document.getElementById("email-subject").value;
  const body = document.getElementById("email-body").value;

  // Create mailto link with form data
  const mailtoLink = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=From: ${encodeURIComponent(from)}%0A%0A${encodeURIComponent(body)}`;

  // Open the mail client
  window.location.href = mailtoLink;

  // Close modal after a short delay
  setTimeout(() => {
    closeEmailModal();
  }, 500);
});

// ========================
// CONTACT LINK INTERACTIONS
// ========================

// Add click handlers to contact links (email, phone, whatsapp)
const contactLinks = document.querySelectorAll(".contact-link");

contactLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // Add animation
    this.style.animation = "contactPulse 0.6s ease";
    setTimeout(() => {
      this.style.animation = "";
    }, 600);

    // For email links, open compose modal
    if (href.startsWith("mailto:")) {
      e.preventDefault();
      openEmailModal.call(this, e);
      return;
    }

    // For tel links, allow default behavior
    if (href.startsWith("tel:")) {
      return true;
    }

    // For other links (WhatsApp, etc.), allow default behavior
  });

  // Show tooltip on hover
  link.addEventListener("mouseenter", function () {
    const href = this.getAttribute("href");
    if (href.startsWith("mailto:")) {
      this.title = "Click to compose email";
    } else if (href.startsWith("tel:")) {
      this.title = "Click to call";
    } else if (href.includes("wa.me")) {
      this.title = "Click to chat on WhatsApp";
    }
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
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent from portfolio contact form.`,
    );
    const mailtoUrl = `mailto:${OWNER_EMAIL}?subject=${mailSubject}&body=${mailBody}`;

    // Build WhatsApp link
    const waText = encodeURIComponent(
      `New portfolio inquiry\nSubject: ${subject}\nFrom: ${name} (${email})\n\n${message}`,
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
        "error",
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
  "color: #0066cc; font-size: 20px; font-weight: bold;",
);
console.log(
  "%cLet's build something amazing together!",
  "color: #00b4d8; font-size: 14px;",
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
