document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initHeaderScrollFallback();
  initTimelineScrollFallback();
  initCustomizerMode();
});

/* ==========================================================================
   1. Lightbox Gallery Interactivity
   ========================================================================== */
function initLightbox() {
  const galleryCards = document.querySelectorAll('.gallery-card');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!lightbox) return;

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      // Don't open lightbox if customizer is active
      if (document.body.classList.contains('customizer-active')) return;

      const img = card.querySelector('img');
      const title = card.querySelector('.gallery-card-title');
      const date = card.querySelector('.gallery-card-date');

      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.innerHTML = `<strong>${title ? title.textContent : ''}</strong><br>${date ? date.textContent : ''}`;
        
        lightbox.classList.add('is-active');
        document.body.style.overflow = 'hidden'; // Lock body scroll
      }
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove('is-active');
    document.body.style.overflow = ''; // Restore body scroll
    setTimeout(() => {
      lightboxImg.src = '';
      lightboxCaption.textContent = '';
    }, 300);
  };

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Support escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   2. Header Scroll Fallback (for browsers without ScrollTimeline)
   ========================================================================== */
function initHeaderScrollFallback() {
  const header = document.getElementById('main-header');
  if (!header) return;

  // Feature detection for scroll-driven animations
  const hasNativeScrollTimeline = CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)');

  if (!hasNativeScrollTimeline) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('is-shrunk');
      } else {
        header.classList.remove('is-shrunk');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial run
  }
}

/* ==========================================================================
   3. Timeline Scroll Reveal Fallback (for browsers without ViewTimeline)
   ========================================================================== */
function initTimelineScrollFallback() {
  const hasNativeViewTimeline = CSS.supports('(animation-timeline: view()) and (animation-range: entry)');

  if (!hasNativeViewTimeline) {
    const timelineContents = document.querySelectorAll('.timeline-content');
    
    // Setup fallback styles
    timelineContents.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px) scale(0.98)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }
      });
    }, {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.15
    });

    timelineContents.forEach(el => {
      observer.observe(el);
    });
  }
}

/* ==========================================================================
   4. Heartfelt Wishes Form Submission
   ========================================================================== */
function handleFormSubmit(event) {
  event.preventDefault();
  
  const nameInput = document.getElementById('sender-name');
  const relationInput = document.getElementById('sender-relation');
  const messageInput = document.getElementById('sender-message');
  const wishesContainer = document.getElementById('wishes-cards-container');
  const successBanner = document.getElementById('success-banner');
  const submitBtn = document.getElementById('submit-btn');

  if (!nameInput || !relationInput || !messageInput || !wishesContainer) return;

  const name = nameInput.value.trim();
  const relation = relationInput.value.trim();
  const message = messageInput.value.trim();
  const avatarLetter = name ? name.charAt(0).toUpperCase() : 'F';

  // Create card element
  const card = document.createElement('article');
  card.className = 'wish-card';
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

  card.innerHTML = `
    <div class="wish-card-quote-icon">“</div>
    <p class="wish-text">${message}</p>
    <div class="wish-sender-info">
      <div class="wish-avatar">${avatarLetter}</div>
      <div>
        <h4 class="wish-sender">${name}</h4>
        <p class="wish-relation">${relation}</p>
      </div>
    </div>
  `;

  // Prepend card to grid
  wishesContainer.insertBefore(card, wishesContainer.firstChild);

  // Trigger browser paint then animate
  requestAnimationFrame(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });

  // Clear inputs & show success
  nameInput.value = '';
  relationInput.value = '';
  messageInput.value = '';

  if (successBanner) {
    successBanner.style.display = 'block';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';

    setTimeout(() => {
      successBanner.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }, 5000);
  }
}

/* ==========================================================================
   5. Interactive Customizer Panel
   ========================================================================== */
function initCustomizerMode() {
  const toggleBtn = document.getElementById('customizer-toggle-btn');
  const drawer = document.getElementById('customizer-drawer');
  const customizableWrappers = document.querySelectorAll('.customizable-img-wrapper');
  
  if (!toggleBtn || !drawer) return;

  // Toggle Customizer Mode
  toggleBtn.addEventListener('click', () => {
    const isActive = document.body.classList.toggle('customizer-active');
    drawer.classList.toggle('is-active', isActive);
  });

  // Map slot filenames to checkbox / checklists
  const updateChecklistStatus = (slot) => {
    let statusId = '';
    if (slot === 'images/hero.jpg') statusId = 'status-hero';
    else if (slot === 'images/father.jpg') statusId = 'status-father';
    else if (slot === 'images/memory1.jpg') statusId = 'status-memory1';
    else if (slot === 'images/memory2.jpg') statusId = 'status-memory2';
    else if (slot === 'images/memory3.jpg') statusId = 'status-memory3';

    const statusBadge = document.getElementById(statusId);
    if (statusBadge) {
      statusBadge.textContent = 'Previewing';
      statusBadge.classList.add('status-modified');
    }
  };

  // Drag and Drop & Click Handlers for wrappers
  customizableWrappers.forEach(wrapper => {
    const slot = wrapper.getAttribute('data-image-slot');
    
    // Find corresponding hidden file input
    let inputId = '';
    if (slot === 'images/hero.jpg') inputId = 'input-file-hero';
    else if (slot === 'images/father.jpg') inputId = 'input-file-father';
    else if (slot === 'images/memory1.jpg') inputId = 'input-file-memory1';
    else if (slot === 'images/memory2.jpg') inputId = 'input-file-memory2';
    else if (slot === 'images/memory3.jpg') inputId = 'input-file-memory3';

    const fileInput = document.getElementById(inputId);

    // Click wrapper in customizer mode to open file dialog
    wrapper.addEventListener('click', (e) => {
      if (!document.body.classList.contains('customizer-active')) return;
      e.preventDefault();
      e.stopPropagation();
      if (fileInput) fileInput.click();
    });

    // Drag-over styling
    wrapper.addEventListener('dragover', (e) => {
      if (!document.body.classList.contains('customizer-active')) return;
      e.preventDefault();
      wrapper.style.outlineColor = 'var(--color-gold-light)';
    });

    wrapper.addEventListener('dragleave', () => {
      if (!document.body.classList.contains('customizer-active')) return;
      wrapper.style.outlineColor = '';
    });

    // Drop handler
    wrapper.addEventListener('drop', (e) => {
      if (!document.body.classList.contains('customizer-active')) return;
      e.preventDefault();
      wrapper.style.outlineColor = '';

      const files = e.dataTransfer.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        const file = files[0];
        const newSrc = URL.createObjectURL(file);
        
        // Find image inside wrapper (or child)
        const img = wrapper.querySelector('img');
        if (img) {
          img.src = newSrc;
          updateChecklistStatus(slot);
        }
      }
    });
  });

  // Hidden File Inputs Change Handler
  const fileInputs = document.querySelectorAll('.customizer-file-input');
  fileInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const slot = input.getAttribute('data-slot');
      const files = e.target.files;
      
      if (files.length > 0) {
        const file = files[0];
        const newSrc = URL.createObjectURL(file);
        
        // Find customizable wrapper for this slot
        const wrapper = document.querySelector(`.customizable-img-wrapper[data-image-slot="${slot}"]`);
        if (wrapper) {
          const img = wrapper.querySelector('img');
          if (img) {
            img.src = newSrc;
            updateChecklistStatus(slot);
          }
        }
      }
    });
  });
}
