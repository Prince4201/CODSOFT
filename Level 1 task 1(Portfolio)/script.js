// Initialize Three.js 3D scene
function initThreeJS() {
  const canvas = document.getElementById('3d-canvas');
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Add lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);
  
  // Create a floating cube
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshPhongMaterial({
    color: 0x2563eb,
    emissive: 0x072534,
    specular: 0xffffff,
    shininess: 100,
    wireframe: false,
    transparent: true,
    opacity: 0.9
  });
  
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  
  // Position camera
  camera.position.z = 5;
  
  // Mouse movement variables
  let mouseX = 0;
  let mouseY = 0;
  
  // Handle mouse movement
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  });
  
  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    
    // Rotate cube with mouse movement
    cube.rotation.x = mouseY * 0.5;
    cube.rotation.y = mouseX * 0.5;
    
    // Add subtle automatic rotation
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.01;
    
    renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  animate();
}

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize 3D scene
  initThreeJS();
  
  // Remove loader after 2 seconds
  setTimeout(() => {
    document.querySelector('.loader').style.opacity = '0';
    setTimeout(() => {
      document.querySelector('.loader').style.display = 'none';
    }, 500);
  }, 2000);

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navbarMenu = document.querySelector('.navbar-menu');
  
  mobileMenuBtn.addEventListener('click', function() {
    this.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    if (navbarMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.navbar-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navbarMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // Orb navigation
  document.querySelectorAll('.orb').forEach(orb => {
    orb.addEventListener('click', () => {
      const section = orb.getAttribute('data-section');
      gsap.to(window, {
        duration: 1,
        scrollTo: `#${section}`,
        ease: "power2.inOut"
      });
    });
  });

  // Terminal functionality
  const terminal = document.querySelector('.terminal');
  const terminalInput = document.querySelector('.terminal-input');
  const terminalClose = document.querySelector('.terminal-close');
  
  // Open terminal with '/' key
  document.addEventListener('keydown', function(e) {
    if (e.key === '/' && !terminalInput.matches(':focus')) {
      e.preventDefault();
      terminal.style.display = 'flex';
      terminalInput.focus();
    }
    
    if (e.key === 'Escape') {
      terminal.style.display = 'none';
    }
  });
  
  // Close terminal with button
  terminalClose.addEventListener('click', function() {
    terminal.style.display = 'none';
  });
  
  // Terminal commands
  terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      const command = this.value.toLowerCase().trim();
      const terminalContent = document.querySelector('.terminal-content');
      
      // Add the command to terminal
      terminalContent.innerHTML += `<br>>_ ${command}`;
      
      // Process commands
      if (command === 'help') {
        terminalContent.innerHTML += '<br>Available commands: about, skills, projects, contact, clear, theme';
      } 
      else if (command === 'about') {
        terminalContent.innerHTML += '<br>Prince Jaiswal - Full Stack Developer & Tech Enthusiast<br>1st Year B.Tech CSE student at LPU';
      }
      else if (command === 'skills') {
        terminalContent.innerHTML += '<br>Programming: C, C++, Python, JavaScript<br>Web: HTML, CSS, React, Node.js<br>Database: MySQL, Firebase';
      }
      else if (command === 'projects') {
        terminalContent.innerHTML += '<br>EduPulse, FOODHUB, ZeroMicroPlastic, TECHNOVA Club Portal, Arduino Smart Parking';
      }
      else if (command === 'contact') {
        terminalContent.innerHTML += '<br>Email: your.email@example.com<br>LinkedIn: linkedin.com/in/prince-jaiswal<br>GitHub: github.com/prince-jaiswal';
      }
      else if (command === 'clear') {
        terminalContent.innerHTML = '>_ TYPE \'HELP\' FOR COMMANDS...';
      }
      else if (command === 'theme pink') {
        document.body.classList.add('konami-active');
        terminalContent.innerHTML += '<br>Theme changed to pink!';
      }
      else if (command === 'theme normal') {
        document.body.classList.remove('konami-active');
        terminalContent.innerHTML += '<br>Theme changed to normal!';
      }
      else {
        terminalContent.innerHTML += '<br>Command not found. Type \'help\' for available commands.';
      }
      
      // Scroll to bottom and clear input
      terminalContent.scrollTop = terminalContent.scrollHeight;
      this.value = '';
    }
  });

  // Konami Code Easter Egg
  const konamiCode = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', function(e) {
    if (e.key.toLowerCase() === konamiCode[konamiIndex]) {
      konamiIndex++;
      
      if (konamiIndex === konamiCode.length) {
        document.body.classList.toggle('konami-active');
        
        // Show notification
        const notification = document.createElement('div');
        notification.className = 'easter-egg-notification';
        notification.textContent = '🎉 Secret unlocked! Konami code activated!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
          notification.style.opacity = '0';
          setTimeout(() => notification.remove(), 500);
        }, 3000);
        
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  // Animate skill bars on scroll
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    skillBars.forEach(bar => {
      const width = bar.getAttribute('data-width');
      bar.style.width = '0';
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
    });
  }

  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);

  // Hero section animations
  gsap.from('.hero-title', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
  });

  gsap.from('.hero-subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
  });

  gsap.from('.hero-description', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
  });

  gsap.from('.hero-buttons', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.9,
    ease: 'power3.out'
  });

  gsap.from('.profile-image', {
    duration: 1.5,
    scale: 0.5,
    opacity: 0,
    ease: 'elastic.out(1, 0.5)'
  });

  gsap.from('.tech-icons i', {
    duration: 1,
    y: 20,
    opacity: 0,
    stagger: 0.1,
    delay: 1.5,
    ease: 'back.out'
  });

  // Animate orbs
  gsap.from('.orb', {
    duration: 1,
    x: 50,
    opacity: 0,
    stagger: 0.1,
    delay: 2,
    ease: 'back.out'
  });

  // Animate skill bars when skills section comes into view
  const skillsSection = document.querySelector('.skills');
  
  if (skillsSection) {
    ScrollTrigger.create({
      trigger: skillsSection,
      start: 'top 70%',
      onEnter: animateSkillBars,
      once: true
    });
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  backToTopBtn.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // Current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Form submission
  const form = document.getElementById('form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Here you would typically send the form data to a server
      console.log({ name, email, subject, message });
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'form-notification';
      notification.textContent = 'Thank you for your message! I will get back to you soon.';
      form.appendChild(notification);
      
      setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
      
      form.reset();
    });
  }

  // Easter egg notification style
  const style = document.createElement('style');
  style.textContent = `
    .easter-egg-notification {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--primary-color);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      transition: opacity 0.5s ease;
    }
    
    .form-notification {
      position: absolute;
      bottom: -3rem;
      left: 0;
      width: 100%;
      background-color: var(--secondary-color);
      color: white;
      padding: 0.5rem;
      text-align: center;
      border-radius: 0.25rem;
      transition: opacity 0.5s ease;
    }
  `;
  document.head.appendChild(style);
});