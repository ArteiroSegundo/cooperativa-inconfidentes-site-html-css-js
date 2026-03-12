document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons();

  // Navbar scroll effect
  const navbar = document.getElementById("navbar");
  const desktopLinks = document.querySelectorAll(".desktop-link");
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  let isMenuOpen = false;

  const updateNavbarStyle = () => {
    // If scrolled OR menu is open, make navbar solid white
    if (window.scrollY > 50 || isMenuOpen) {
      navbar.classList.remove("bg-transparent", "py-4");
      navbar.classList.add("bg-white", "shadow-md", "py-2");
      mobileMenuBtn.classList.remove("text-white");
      mobileMenuBtn.classList.add("text-gray-900");
      desktopLinks.forEach((link) => {
        link.classList.remove("text-gray-200");
        link.classList.add("text-gray-700");
      });
    } else {
      // Only transparent if at top AND menu closed
      navbar.classList.add("bg-transparent", "py-4");
      navbar.classList.remove("bg-white", "shadow-md", "py-2");
      mobileMenuBtn.classList.add("text-white");
      mobileMenuBtn.classList.remove("text-gray-900");
      desktopLinks.forEach((link) => {
        link.classList.add("text-gray-200");
        link.classList.remove("text-gray-700");
      });
    }
  };

  window.addEventListener("scroll", updateNavbarStyle);

  // Mobile menu toggle
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // Open
      mobileMenu.classList.remove("translate-x-full");
      mobileMenuOverlay.classList.remove("hidden");
      setTimeout(() => mobileMenuOverlay.classList.remove("opacity-0"), 10); // Fade in
      mobileMenuBtn.innerHTML = '<i data-lucide="x"></i>';
    } else {
      // Close
      mobileMenu.classList.add("translate-x-full");
      mobileMenuOverlay.classList.add("opacity-0");
      setTimeout(() => mobileMenuOverlay.classList.add("hidden"), 300); // Wait for fade out
      mobileMenuBtn.innerHTML = '<i data-lucide="menu"></i>';
    }

    updateNavbarStyle(); // Update header color immediately
    lucide.createIcons();
  };

  mobileMenuBtn.addEventListener("click", toggleMenu);

  // Close on overlay click
  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", () => {
      if (isMenuOpen) toggleMenu();
    });
  }

  // Close mobile menu on link click
  const mobileLinks = document.querySelectorAll(".mobile-link");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // Scroll Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // Run once
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-on-scroll").forEach((el) => {
    observer.observe(el);
  });

  // Cookie Consent Banner
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptCookiesBtn = document.getElementById("accept-cookies");

  // Check if user already accepted
  if (!localStorage.getItem("cookiesAccepted")) {
    // Show banner after short delay
    setTimeout(() => {
      cookieBanner.classList.remove("hidden");
      // Use slightly different class manipulation for slide-up effect if desired
      cookieBanner.classList.remove("translate-y-full");
    }, 1000);
  }

  acceptCookiesBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.add("hidden");
  });
});
