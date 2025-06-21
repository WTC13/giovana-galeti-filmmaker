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
        nav:true,
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
                items:4
            }
        }
    });
});