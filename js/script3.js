document.addEventListener('DOMContentLoaded', function() {
    // Menú móvil
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
        
        // Cerrar menú al hacer clic en un enlace
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
            });
        });
    }
    
    // Desplazamiento suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tabs de servicios
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length && tabPanes.length) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Desactivar todos los botones y paneles
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Activar el botón actual
                this.classList.add('active');
                
                // Activar el panel correspondiente
                const tabId = this.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Slider de testimonios
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (testimonialSlides.length && prevButton && nextButton && dotsContainer) {
        let currentSlide = 0;
        
        // Crear puntos indicadores
        testimonialSlides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        // Mostrar el primer slide
        showSlide(currentSlide);
        
        // Funciones para controlar el slider
        function showSlide(index) {
            testimonialSlides.forEach(slide => slide.classList.remove('active'));
            const dots = document.querySelectorAll('.dot');
            dots.forEach(dot => dot.classList.remove('active'));
            
            testimonialSlides[index].classList.add('active');
            dots[index].classList.add('active');
        }
        
        function goToSlide(index) {
            currentSlide = index;
            showSlide(currentSlide);
        }
        
        function nextSlide() {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        function prevSlide() {
            currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
            showSlide(currentSlide);
        }
        
        // Eventos para los botones de navegación
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);
        
        // Autoplay del slider
        let slideInterval = setInterval(nextSlide, 7000);
        
        // Pausar autoplay al pasar el mouse
        const sliderContainer = document.getElementById('testimonial-slider');
        sliderContainer.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 7000);
        });
    }
    
    // Acordeón de FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Cerrar todos los otros items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Alternar el estado del item actual
                item.classList.toggle('active');
            });
        });
    }
    
    // Formulario de contacto

        const contactForm = document.getElementById("contact-form");
    
        if (!contactForm) {
            console.error("❌ Error: No se encontró el formulario.");
            return;
        }
    
        console.log("✅ Formulario detectado");
    
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // ⛔ Evita el comportamiento por defecto
            console.log("📩 Enviando formulario...");
    
            let formData = new FormData(contactForm);
            formData.append("formulario", "contacto"); // Asegurar que se identifique
    
            fetch("procesar_formulario.php", {
                method: "POST",
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log("📩 Respuesta del servidor:", data);
    
                let mensajeBox = document.createElement("div");
                mensajeBox.style.position = "fixed";
                mensajeBox.style.top = "20px";
                mensajeBox.style.left = "50%";
                mensajeBox.style.transform = "translateX(-50%)";
                mensajeBox.style.padding = "15px";
                mensajeBox.style.borderRadius = "5px";
                mensajeBox.style.color = "#fff";
                mensajeBox.style.fontSize = "16px";
                mensajeBox.style.boxShadow = "0 4px 6px rgba(0,0,0,0.1)";
                mensajeBox.style.zIndex = "1000";
    
                if (data.trim() === "success") {
                    mensajeBox.innerText = "✅ ¡Mensaje enviado con éxito!";
                    mensajeBox.style.backgroundColor = "#28a745";
                    contactForm.reset();
                } else {
                    mensajeBox.innerText = "❌ Hubo un error al enviar el mensaje.";
                    mensajeBox.style.backgroundColor = "#dc3545";
                }
    
                document.body.appendChild(mensajeBox);
    
                setTimeout(() => {
                    mensajeBox.remove();
                }, 4000);
            })
            .catch(error => {
                console.error("❌ Error en la solicitud:", error);
            });
        });
    
    
    
    
        // const testimonioForm = document.getElementById("testimonio-form");
        // if (testimonioForm) {
        //     enviarFormulario(testimonioForm, "procesar_formulario.php");
        // }
    //});
    



    // const contactForm = document.getElementById('contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
            
    //         // Aquí normalmente enviarías los datos a un servidor
    //         // Para este ejemplo, solo mostraremos un mensaje
            
    //         const formData = new FormData(contactForm);
    //         let formValues = {};
            
    //         formData.forEach((value, key) => {
    //             formValues[key] = value;
    //         });
            
    //         console.log('Formulario enviado:', formValues);
            
    //         // Simular envío exitoso
    //         alert('¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.');
    //         contactForm.reset();
    //     });
    // }
    
    // Año actual en el footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
    
    // Animación de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .team-member, .blog-card, .value-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Inicializar estilos para animación
    const elementsToAnimate = document.querySelectorAll('.service-card, .team-member, .blog-card, .value-item');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Efecto parallax en la sección hero
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            if (scrollPosition < 600) {
                heroSection.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
            }
        });
    }  
    // Botón volver arriba
  const backToTopButton = document.getElementById("btn-back-to-top")

  if (backToTopButton) {
    // Mostrar/ocultar botón según la posición de scroll
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add("visible")
      } else {
        backToTopButton.classList.remove("visible")
      }
    })

    // Acción al hacer clic en el botón
    backToTopButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }
})
 
