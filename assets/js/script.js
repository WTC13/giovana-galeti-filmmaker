//carrousel de fotos...

document.addEventListener('DOMContentLoaded', function() {
  const container = document.querySelector('.carousel-container');
  let imgs = Array.from(container.children);

  // DUPLICA as imagens para o efeito de loop
  imgs.forEach(img => {
    const clone = img.cloneNode(true);
    container.appendChild(clone);
  });

  let scroll = 0;
  let imgWidth = imgs[0].offsetWidth + 32; // 32 = gap (ajuste se mudar o gap)
  let totalWidth = imgWidth * imgs.length;
  let animationId;
  let paused = false;

  function animate() {
    scroll += 7;
    container.style.transform = `translateX(${-scroll}px)`;
    if (scroll >= totalWidth) {
      scroll = 0;
      container.style.transform = `translateX(0)`;
    }
    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Parar o loop e desfocar ao clicar em qualquer imagem
  container.addEventListener('click', function(e) {
    if (e.target.classList.contains('carousel-img')) {
      cancelAnimationFrame(animationId);
      paused = true;
      imgs.forEach(img => img.style.filter = 'blur(6px)');
      e.target.style.filter = 'none';
    }
  });

  // Se clicar fora do carrossel, volta ao normal
  document.addEventListener('click', function(e) {
    if (paused && !container.contains(e.target)) {
      imgs.forEach(img => img.style.filter = '');
      animate();
      paused = false;
    }
  });
});


$(document).ready(function(){
  $('.owl-carousel').owlCarousel({
        loop:true,
        center:true,
        margin:100,
        nav:false,
        items: 1,
        dots: true,
        // autoplay: true,
        // autoplayTimeout: 3000,
        // autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });

    const imageModal = $('#imageModal');
    const modalImage = $('#modalImage');
    const modalDescription = $('#modalDescription');
    let typingIndex = 0;
    let currentText = '';
    let typingSpeed = 50; // Velocidade da digitação (ms por caractere)
    let typingInterval;

    // Função para iniciar o efeito de digitação
    function startTypingEffect(text) {
        currentText = text;
        typingIndex = 0;
        modalDescription.text(''); // Limpa o texto anterior
        clearInterval(typingInterval); // Limpa qualquer intervalo anterior

        typingInterval = setInterval(() => {
            if (typingIndex < currentText.length) {
                modalDescription.text(modalDescription.text() + currentText.charAt(typingIndex));
                typingIndex++;
            } else {
                clearInterval(typingInterval);
                modalDescription.css('border-right', 'none'); // Remove o cursor piscando ao terminar
            }
        }, typingSpeed);
    }

    // Abre o modal ao clicar em uma imagem
    $('.item img').on('click', function() {
        const imageUrl = $(this).attr('src');
        // Pega a descrição do atributo data-description do elemento pai (.item)
        const descriptionText = $(this).closest('.item').data('description'); 

        modalImage.attr('src', imageUrl); // Define a imagem
        modalDescription.css('border-right', '2px solid orange'); // Restaura o cursor
        imageModal.addClass('active'); // Mostra o modal com transição
        
        // Inicia o efeito de digitação com o texto da imagem
        startTypingEffect(descriptionText);

        // Adiciona classe para desfoque no restante da página (ex: no body ou #main)
        // Isso assume que você tem um CSS para o blur-background
        $('body').addClass('blur-background'); 
    });

    // Fecha o modal ao clicar fora do conteúdo (no overlay)
    imageModal.on('click', function(event) {
        // Verifica se o clique foi diretamente no overlay (o próprio modal),
        // e não no modal-content ou seus filhos
        if ($(event.target).is(imageModal)) {
            imageModal.removeClass('active'); // Esconde o modal com transição
            clearInterval(typingInterval); // Para qualquer digitação em andamento
            modalDescription.text(''); // Limpa o texto
            modalImage.attr('src', ''); // Limpa a imagem
            $('body').removeClass('blur-background'); // Remove o desfoque
        }
    });

    // Opcional: Fechar com a tecla ESC
    $(document).on('keydown', function(event) {
        if (event.key === 'Escape' && imageModal.hasClass('active')) {
            imageModal.removeClass('active');
            clearInterval(typingInterval);
            modalDescription.text('');
            modalImage.attr('src', '');
            $('body').removeClass('blur-background');
        }
    });

});