document.addEventListener('DOMContentLoaded', function() {
    // Efecto de escritura para el título
    const title = document.querySelector('h1');
    const originalText = title.textContent;
    title.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            title.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }
    
    setTimeout(typeWriter, 500);
    
    // Animación para las cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + (index * 200));
    });
    
    // Botón de aceptación con redirección a WhatsApp
    const acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('click', function() {
        // Generar código de cliente aleatorio
        const customerCode = 'CLI-' + Math.floor(1000 + Math.random() * 9000);
        
        // Obtener fecha actual
        const now = new Date();
        const formattedDate = now.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Crear mensaje para WhatsApp
        const message = `Hola, acepto sus términos y condiciones con fecha ${formattedDate}. Mi código de cliente es: ${customerCode}`;
        const encodedMessage = encodeURIComponent(message);
        
        // Cambiar texto del botón
        this.innerHTML = '<i class="fas fa-check"></i> Redirigiendo a WhatsApp...';
        this.style.background = 'linear-gradient(45deg, #2ecc71, #27ae60)';
        this.disabled = true;
        
        // Efecto de confeti
        for (let i = 0; i < 30; i++) {
            setTimeout(createConfetti, i * 100);
        }
        
        // Redireccionar a WhatsApp después de 2 segundos
        setTimeout(() => {
            window.open(`https://wa.me/593997111543?text=${encodedMessage}`, '_blank');
        }, 2000);
    });
    
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.innerHTML = ['🎉', '✨', '✅', '👍'][Math.floor(Math.random() * 4)];
        confetti.style.position = 'fixed';
        confetti.style.zIndex = '9999';
        confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-50px';
        confetti.style.userSelect = 'none';
        confetti.style.pointerEvents = 'none';
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(${window.innerHeight}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
});