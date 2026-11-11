(function(){
  var decks=[].slice.call(document.querySelectorAll('.deck'));
  if('IntersectionObserver' in window){
    document.documentElement.classList.add('js');
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('dealt');io.unobserve(e.target);}});
    },{threshold:.35});
    decks.forEach(function(d){io.observe(d);});
  }
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  if(btn&&nav){
    btn.addEventListener('click',function(){
      var o=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',o?'true':'false');
    });
    nav.addEventListener('click',function(e){
      if(e.target.closest('a')){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}
    });
  }

  var hover=false;
  try{hover=window.matchMedia('(hover:hover)').matches;}catch(e){}
  var lb=document.createElement('div');
  lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-label','Foto ampliada');
  lb.innerHTML='<img alt=""><button type="button" aria-label="Fechar">×</button>';
  document.body.appendChild(lb);
  var lbImg=lb.querySelector('img');
  function openLb(img){lbImg.src=img.currentSrc||img.src;lbImg.alt=img.alt;lb.classList.add('open');}
  function closeLb(){lb.classList.remove('open');}
  lb.addEventListener('click',closeLb);
  document.addEventListener('keydown',function(e){if(e.key==='Escape')closeLb();});

  var cards=[].slice.call(document.querySelectorAll('.card'));
  cards.forEach(function(c){
    c.addEventListener('click',function(){
      var img=c.querySelector('img');
      if(hover||c.classList.contains('is-up')){openLb(img);return;}
      cards.forEach(function(o){o.classList.remove('is-up');});
      c.classList.add('is-up');
    });
  });
  document.addEventListener('click',function(e){
    if(!e.target.closest('.card')){cards.forEach(function(o){o.classList.remove('is-up');});}
  });
  [].forEach.call(document.querySelectorAll('.gallery button,.fig button'),function(b){
    b.addEventListener('click',function(){openLb(b.querySelector('img'));});
  });
})();

[].forEach.call(document.querySelectorAll('.acc-btn'),function(b){b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',o?'true':'false');b.parentNode.parentNode.classList.toggle('open',o);});});
