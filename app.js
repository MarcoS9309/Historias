  // ======= Manejo de errores global para mejor estabilidad =======
  window.addEventListener('error', function(e) {
    console.warn('Error capturado:', e.error?.message || 'Error desconocido');
  });

  // ======= Revelado progresivo (IntersectionObserver) con fallback =======
  function initProgressiveReveal() {
    try {
      if ('IntersectionObserver' in window) {
        const io = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
            }
          });
        }, { 
          threshold: 0.15,
          rootMargin: '50px 0px'
        });

        document.querySelectorAll('article, .character-card').forEach(element => {
          if (element) io.observe(element);
        });
      } else {
        // Fallback para navegadores sin IntersectionObserver
        document.querySelectorAll('article, .character-card').forEach(element => {
          if (element) element.classList.add('is-visible');
        });
      }
    } catch (error) {
      console.warn('Error en revelado progresivo:', error);
      // Fallback: mostrar todos los elementos
      document.querySelectorAll('article, .character-card').forEach(element => {
        if (element) element.classList.add('is-visible');
      });
    }
  }

  // ======= Toggle de módulos multimedia con manejo de errores =======
  function initMediaToggle() {
    try {
      document.addEventListener('click', (event) => {
        const button = event.target.closest('[data-toggle]');
        if (!button || !button.dataset.toggle) return;

        const targetSelector = button.dataset.toggle;
        const targetElement = document.querySelector(targetSelector);
        
        if (targetElement) {
          const isVisible = targetElement.style.display === 'block';
          targetElement.style.display = isVisible ? 'none' : 'block';
          
          // Mejorar accesibilidad
          button.setAttribute('aria-expanded', isVisible ? 'false' : 'true');
        } else {
          console.warn(`Elemento no encontrado para selector: ${targetSelector}`);
        }
      });
    } catch (error) {
      console.warn('Error en toggle multimedia:', error);
    }
  }

  // ======= Modo claro/oscuro con validación robusta =======
  function initThemeToggle() {
    try {
      const toggleButton = document.getElementById('toggleTheme');
      if (!toggleButton) {
        console.warn('Botón de toggle de tema no encontrado');
        return;
      }

      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      // Inicializar tema con validación
      const savedTheme = localStorage.getItem('theme');
      const shouldUseLightTheme = savedTheme === 'light' || (!savedTheme && !prefersDark);
      
      if (shouldUseLightTheme) {
        document.documentElement.classList.add('light');
        toggleButton.setAttribute('aria-pressed', 'true');
      }
      
      toggleButton.addEventListener('click', () => {
        try {
          const isLight = document.documentElement.classList.toggle('light');
          toggleButton.setAttribute('aria-pressed', isLight ? 'true' : 'false');
          localStorage.setItem('theme', isLight ? 'light' : 'dark');
        } catch (error) {
          console.warn('Error al cambiar tema:', error);
        }
      });

      // Escuchar cambios en preferencias del sistema
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
          if (!localStorage.getItem('theme')) {
            const shouldBeDark = e.matches;
            document.documentElement.classList.toggle('light', !shouldBeDark);
            toggleButton.setAttribute('aria-pressed', shouldBeDark ? 'false' : 'true');
          }
        });
      }

      // Agregar soporte para atajo de teclado (Ctrl+Shift+T)
      document.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'T') {
          event.preventDefault();
          toggleButton.click();
        }
      });
    } catch (error) {
      console.warn('Error en inicialización de tema:', error);
    }
  }

  // ======= Smooth scroll mejorado para navegación =======
  function initSmoothScroll() {
    try {
      document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        if (!anchor) return;
        
        anchor.addEventListener('click', function (event) {
          try {
            event.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
              targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            } else {
              console.warn(`Elemento no encontrado para navegación: ${targetId}`);
            }
          } catch (error) {
            console.warn('Error en smooth scroll:', error);
            // Fallback a navegación normal
            window.location.hash = this.getAttribute('href');
          }
        });
      });
    } catch (error) {
      console.warn('Error en inicialización de smooth scroll:', error);
    }
  }

  // ======= Manejo mejorado de imágenes =======
  function initImageOptimization() {
    try {
      const images = document.querySelectorAll('img[loading="lazy"]');
      
      images.forEach(img => {
        // Agregar estado de carga
        img.style.filter = 'blur(2px)';
        img.style.transition = 'filter 0.3s ease';
        
        const handleImageLoad = () => {
          img.style.filter = 'none';
          img.classList.add('loaded');
        };
        
        const handleImageError = () => {
          console.warn(`Error cargando imagen: ${img.src}`);
          img.style.filter = 'none';
          img.style.opacity = '0.6';
          // Opcional: agregar imagen placeholder o ícono de error
        };
        
        if (img.complete) {
          handleImageLoad();
        } else {
          img.addEventListener('load', handleImageLoad, { once: true });
          img.addEventListener('error', handleImageError, { once: true });
        }
      });
    } catch (error) {
      console.warn('Error en optimización de imágenes:', error);
    }
  }

  // ======= Inicialización cuando el DOM esté listo =======
  function initializeApp() {
    initProgressiveReveal();
    initMediaToggle();
    initThemeToggle();
    initSmoothScroll();
    initImageOptimization();
  }

  // Ejecutar cuando el DOM esté completamente cargado
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
  } else {
    initializeApp();
  }

