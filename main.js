// Fashion Studio - Main JavaScript

// Smooth scroll to sections with offset for fixed nav
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const targetPosition = targetSection.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// // Active nav link highlighting based on scroll position
// window.addEventListener('scroll', () => {
//   const sections = document.querySelectorAll('section[id]');
//   const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
//   let current = '';
  
//   sections.forEach(section => {
//     const sectionTop = section.offsetTop;
//     const sectionHeight = section.clientHeight;
//     if (window.scrollY >= (sectionTop - 200)) {
//       current = section.getAttribute('id');
//     }
//   });
  
//   navLinks.forEach(link => {
//     link.classList.remove('active');
//     if (link.getAttribute('href') === `#${current}`) {
//       link.classList.add('active');
//     }
//   });
// });

// Book Appointment button functionality
const bookButton = document.querySelector('nav button');
if (bookButton) {
  bookButton.addEventListener('click', () => {
    alert('Thank you for your interest! Our booking system will be available soon.\n\nPlease contact us at:\ninfo@fashionstudio.com\n+1234567890');
  });
}

// View Collection button functionality
const viewCollectionBtn = document.querySelector('.home-text-overlay button');
if (viewCollectionBtn) {
  viewCollectionBtn.addEventListener('click', () => {
    const gallerySection = document.querySelector('#gallery');
    const navHeight = document.querySelector('nav').offsetHeight;
    const targetPosition = gallerySection.offsetTop - navHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
}

// Dropdown menu functionality
const serviceLink = document.getElementById('service');
const dropdownContent = document.querySelector('.dropdown-content');

if (serviceLink && dropdownContent) {
  serviceLink.addEventListener('mouseenter', () => {
    dropdownContent.style.display = 'block';
  });
  
  serviceLink.addEventListener('mouseleave', () => {
    setTimeout(() => {
      if (!dropdownContent.matches(':hover')) {
        dropdownContent.style.display = 'none';
      }
    }, 100);
  });
  
  dropdownContent.addEventListener('mouseleave', () => {
    dropdownContent.style.display = 'none';
  });
}

// Gallery image click to view larger
const galleryImages = document.querySelectorAll('.gallery-item img');
galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
      cursor: pointer;
    `;
    
    const modalImg = document.createElement('img');
    modalImg.src = img.src;
    modalImg.style.cssText = `
      max-width: 90%;
      max-height: 90%;
      border-radius: 10px;
      box-shadow: 0 0 50px rgba(148, 45, 216, 0.8);
    `;
    
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    
    // Close modal on click
    modal.addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  });
  
  // Add pointer cursor
  img.style.cursor = 'pointer';
});

// Scroll reveal animation for sections
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

// Apply animation to sections
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(30px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.style.boxShadow = '0 2px 20px rgba(148, 45, 216, 0.2)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

console.log('Fashion Studio JS loaded successfully!');
