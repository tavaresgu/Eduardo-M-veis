document.addEventListener('DOMContentLoaded', function() {
    // Portfolio images
    const portfolioItems = [
        { title: 'Banheiro', galleryFolder: 'Banheiros' },
        { title: 'Cozinha', galleryFolder: 'Cozinhas' },
        { title: 'Quarto', galleryFolder: 'Quartos' },
        { title: 'Sala', galleryFolder: 'Salas' },
        { title: 'Produção', galleryFolder: 'Produções' },
        { title: 'Show Room', galleryFolder: 'Showrooms' }
    ];

    const galleryImages = {
        Banheiros: [
            'Banheiros/1.jpg',
            'Banheiros/2.jpg',
            'Banheiros/3.jpg',
            'Banheiros/4.jpg',
            'Banheiros/5.jpg',
            'Banheiros/6.jpg'
        ],
        Cozinhas: [
            'Cozinhas/1.jpg',
            'Cozinhas/2.jpg',
            'Cozinhas/3.jpg',
            'Cozinhas/4.jpg',
            'Cozinhas/5.jpg',
            'Cozinhas/6.jpg'
        ],
        Quartos: [
            'Quartos/1.jpg',
            'Quartos/2.jpg',
            'Quartos/3.jpg',
            'Quartos/4.jpg',
            'Quartos/5.jpg',
            'Quartos/6.jpg'
        ],
        Salas: [
            'Salas/1.jpg',
            'Salas/2.jpg',
            'Salas/3.jpg',
            'Salas/4.jpg',
            'Salas/5.jpg',
            'Salas/6.jpg'
        ],
        Produções: [
            'Produções/1.jpg',
            'Produções/2.jpg',
            'Produções/3.jpg',
            'Produções/4.jpg',
            'Produções/5.jpg',
            'Produções/6.jpg'
        ],
        Showrooms: [
            'Showrooms/1.jpg',
            'Showrooms/2.jpg'
        ]
    };

    const portfolioContainer = document.getElementById('portfolio-items');
    
    // Create modal for galleries
    const modalHtml = `
        <div class="modal fade" id="galleryModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div id="galleryCarousel" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner"></div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#galleryCarousel" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Anterior</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#galleryCarousel" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Próximo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    portfolioItems.forEach(item => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        const cardHtml = `
            <div class="card text-center">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <button class="btn btn-primary mt-2">Ver Galeria</button>
                </div>
            </div>
        `;
        
        col.innerHTML = cardHtml;
        
        const galleryBtn = col.querySelector('.btn');
        galleryBtn.addEventListener('click', () => {
            const modal = document.getElementById('galleryModal');
            const modalTitle = modal.querySelector('.modal-title');
            const carouselInner = modal.querySelector('.carousel-inner');
            
            modalTitle.textContent = `Galeria de ${item.title}`;
            carouselInner.innerHTML = galleryImages[item.galleryFolder]
                .map((img, index) => `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="${item.title} ${index + 1}">
                    </div>
                `).join('');

            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
        });
        
        portfolioContainer.appendChild(col);
    });

    // Form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const name = contactForm.querySelector('input[type="text"]').value.trim();
        const email = contactForm.querySelector('input[type="email"]').value.trim();
        const phone = contactForm.querySelector('input[type="tel"]').value.trim();
        const message = contactForm.querySelector('textarea').value.trim();

        // Validate form data
        if (!name || !email || !phone || !message) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Construct WhatsApp message with line breaks
        const whatsappMessage = `Olá! Nova mensagem de contato:\n\nNome: ${name}\nEmail: ${email}\nTelefone: ${phone}\nMensagem: ${message}`;
        
        // Check if user is on desktop
        const isDesktop = window.innerWidth >= 1024;
        
        // Construct WhatsApp URL with encoded message
        const whatsappUrl = isDesktop
            ? `https://web.whatsapp.com/send?phone=5548984881535&text=${encodeURIComponent(whatsappMessage)}`
            : `https://wa.me/5548984881535?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappUrl, '_blank');
        
        // Reset form
        contactForm.reset();
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
