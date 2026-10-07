// Personalize these settings. Upload numbered JPG photos next to index.html.
const CONFIG = {
  sisterName: 'Anjali DD',
  sender: 'Basanta',
  photoCount: 2, // Loads 1.jpg and 2.jpg from the repository root.
  captions: ['Our lovely Anjali DD ♡', 'Here’s to more happy moments']
};
const $ = id => document.getElementById(id);
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
$('sister-name').textContent = CONFIG.sisterName + '.';
$('letter-name').textContent = CONFIG.sisterName + ',';
$('sender').textContent = CONFIG.sender;
let opening = false;
async function openGift() {
  if (opening) return;
  opening = true;
  $('open').disabled = true;
  $('gift').disabled = true;
  $('gift').classList.add('opened');
  burst();
  await new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : 850));
  $('opening').classList.add('leaving');
  await new Promise(resolve => setTimeout(resolve, reducedMotion ? 0 : 600));
  $('opening').hidden = true;
  $('celebration').hidden = false;
  $('sister-name').parentElement.tabIndex = -1;
  $('sister-name').parentElement.focus({preventScroll:true});
  window.scrollTo(0, 0);
  burst();
}
$('open').addEventListener('click', openGift);
$('gift').addEventListener('click', openGift);
$('celebrate').addEventListener('click', burst);
$('candle').addEventListener('click', () => {
  if ($('candle').classList.contains('blown')) return;
  $('candle').classList.add('blown');
  $('wish-text').textContent = 'May your wish find its way to you. Happy birthday! ♡';
  $('candle').setAttribute('aria-label', 'Birthday candle blown out');
  burst();
});
$('replay').addEventListener('click', () => {
  $('celebration').hidden = true;
  $('opening').hidden = false;
  $('opening').classList.remove('leaving');
  $('gift').classList.remove('opened');
  $('candle').classList.remove('blown');
  $('candle').setAttribute('aria-label', 'Blow out the birthday candle');
  $('wish-text').textContent = "Tap the candle when you're ready.";
  $('open').disabled = $('gift').disabled = false;
  opening = false;
  window.scrollTo(0, 0);
  $('open').focus({preventScroll:true});
});
async function loadPhotos() {
  const photos = await Promise.all(Array.from({length:CONFIG.photoCount}, (_, index) => new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve({img, index});
    img.onerror = () => resolve(null);
    img.src = `${index + 1}.jpg`;
  })));
  photos.filter(Boolean).forEach(({img,index}) => {
    const caption = CONFIG.captions[index % CONFIG.captions.length];
    const button = document.createElement('button');
    button.className = 'polaroid';
    button.setAttribute('aria-label', `View photo ${index + 1}: ${caption}`);
    img.alt = `Birthday memory ${index + 1}`;
    img.decoding = 'async';
    const label = document.createElement('span');
    label.textContent = caption;
    button.append(img,label);
    button.addEventListener('click', () => {
      $('full-photo').src = img.src;
      $('full-photo').alt = img.alt;
      $('photo-caption').textContent = caption;
      $('lightbox').showModal();
    });
    $('gallery').append(button);
  });
  $('no-photos').hidden = photos.some(Boolean);
}
loadPhotos();
$('close-photo').addEventListener('click', () => $('lightbox').close());
$('lightbox').addEventListener('click', event => { if (event.target === $('lightbox')) $('lightbox').close(); });
const canvas = $('confetti');
const ctx = canvas.getContext('2d');
let animation;
function burst() {
  if (reducedMotion || !ctx) return;
  cancelAnimationFrame(animation);
  const width = innerWidth, height = innerHeight;
  const scale = Math.min(devicePixelRatio || 1,2);
  canvas.width = width * scale;
  canvas.height = height * scale;
  ctx.setTransform(scale,0,0,scale,0,0);
  const colors = ['#ad5267','#e0a7b5','#d5aa60','#b4bfa3','#eecbc2'];
  const pieces = Array.from({length:110}, () => ({x:width/2,y:height*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*13-3,r:Math.random()*6+3,angle:Math.random()*6,color:colors[Math.floor(Math.random()*colors.length)]}));
  let start, previous;
  function draw(time) {
    if (!start) start = time;
    const dt = Math.min((time - (previous || time))/16.67,2);
    previous = time;
    ctx.clearRect(0,0,width,height);
    pieces.forEach(p => {
      p.x += p.vx*dt; p.y += p.vy*dt; p.vy += .16*dt; p.angle += .06*dt;
      ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,1-(time-start)/4200);ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*1.5);ctx.restore();
    });
    if (time-start < 4200) animation=requestAnimationFrame(draw);
    else ctx.clearRect(0,0,width,height);
  }
  animation=requestAnimationFrame(draw);
}
