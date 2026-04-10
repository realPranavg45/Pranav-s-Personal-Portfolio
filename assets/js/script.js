'use strict';

// Element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // ── Sidebar ──────────────────────────────────────────────
  const sidebar    = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebar && sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }

  // ── Contact Form (only runs if form exists on page) ───────
  const form    = document.querySelector("[data-form]");
  const formBtn = document.querySelector("[data-form-btn]");

  if (form && formBtn) {
    // FIX: moved formInputs query inside the guard — no point querying when form is absent
    const formInputs = document.querySelectorAll("[data-form-input]");

    function validateForm() {
      formBtn.disabled = !form.checkValidity();
    }

    formInputs.forEach(input => {
      input.addEventListener("input", validateForm);
    });

    form.addEventListener("submit", function () {
      formBtn.innerHTML = '<ion-icon name="hourglass"></ion-icon><span>Sending...</span>';
      formBtn.disabled = true;
    });

    validateForm(); // run once on load
  }

  // ── Page Navigation ───────────────────────────────────────
  const navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages           = document.querySelectorAll("[data-page]");

  navigationLinks.forEach(link => {
    link.addEventListener("click", function () {
      const targetPage = this.textContent.toLowerCase().trim();

      pages.forEach(page => page.classList.remove("active"));
      navigationLinks.forEach(nav => nav.classList.remove("active"));

      const matchedPage = Array.from(pages).find(p => p.dataset.page === targetPage);
      if (matchedPage) matchedPage.classList.add("active");

      this.classList.add("active");
      window.scrollTo(0, 0);
    });
  });

  // Sync page state on initial load based on active nav link
  const activeNavLink = document.querySelector('.navbar-link.active');
  if (activeNavLink) {
    const targetPage = activeNavLink.textContent.toLowerCase().trim();
    const targetPageElement = document.querySelector(`[data-page="${targetPage}"]`);
    if (targetPageElement) targetPageElement.classList.add('active');
  }

});