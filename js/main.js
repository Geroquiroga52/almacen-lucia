// Menú móvil
const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('menu-nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('is-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Filtros de la carta
const chips = document.querySelectorAll('.chip');
const dishes = document.querySelectorAll('.dish');
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => { c.classList.remove('is-active'); c.setAttribute('aria-selected', 'false'); });
  chip.classList.add('is-active');
  chip.setAttribute('aria-selected', 'true');
  const f = chip.dataset.filter;
  dishes.forEach(d => { d.hidden = !(f === 'all' || d.dataset.cat === f); });
}));

// Reserva por WhatsApp
const form = document.getElementById('reservas');
const error = form.querySelector('.error');
const fecha = form.elements.fecha;
fecha.min = new Date().toISOString().split('T')[0];

form.addEventListener('submit', e => {
  e.preventDefault();
  const { nombre, personas, fecha, hora } = form.elements;
  if (!nombre.value.trim() || !fecha.value) { error.hidden = false; return; }
  error.hidden = true;
  const [y, m, d] = fecha.value.split('-');
  const msg = `Hola! Quiero reservar una mesa a nombre de ${nombre.value.trim()} para ${personas.value} persona(s), el ${d}/${m}/${y} (${hora.value.toLowerCase()}).`;
  window.open(`https://wa.me/541155550142?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
});

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();
