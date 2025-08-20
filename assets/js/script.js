'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Smooth scrolling for navigation
const smoothScroll = (target) => {
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
};

// Enhanced animations and interactions
const addHoverEffect = (elements, className = 'hover-effect') => {
  elements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.classList.add(className);
    });

    element.addEventListener('mouseleave', () => {
      element.classList.remove(className);
    });
  });
};

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // sidebar variables
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  // sidebar toggle functionality for mobile
  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
  }

  // Add subtle hover effects to cards
  const cards = document.querySelectorAll('.project-card, .certification-card');
  addHoverEffect(cards);

  // Contact Form Functionality (if form exists)
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn) {
    // Enable/disable submit button based on form validity
    function validateForm() {
      formBtn.disabled = !form.checkValidity();
    }

    // Validate on each input
    formInputs.forEach(input => {
      input.addEventListener("input", validateForm);
    });

    // Form submission handler
    form.addEventListener("submit", function() {
      // Show sending state
      formBtn.innerHTML = '<ion-icon name="hourglass"></ion-icon><span>Sending...</span>';
      formBtn.disabled = true;

      // The form will automatically submit to FormSubmit
      // You'll receive an email with all the details
    });

    // Initial validation
    validateForm();
  }

  // page navigation variables
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  // Add event to all nav link
  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.textContent.toLowerCase().trim();

      // Remove active class from all pages
      pages.forEach(page => {
        page.classList.remove("active");
      });

      // Add active class to target page
      pages.forEach(page => {
        if (page.dataset.page === targetPage) {
          page.classList.add("active");
        }
      });

      // Update navigation active state
      navigationLinks.forEach(nav => nav.classList.remove("active"));
      this.classList.add("active");

      window.scrollTo(0, 0);
    });
  });

  // Initialize first page as active if none is active
  const activeNavLink = document.querySelector('.navbar-link.active');
  if (activeNavLink) {
    const targetPage = activeNavLink.textContent.toLowerCase().trim();
    const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetPageElement) {
      targetPageElement.classList.add('active');
    }
  }
});


