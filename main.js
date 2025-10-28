
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('nav');
  if (toggle && nav){
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  const msg = document.getElementById('msg');
  const count = document.getElementById('charCount');
  const form = document.getElementById('feedbackForm');
  const thanks = document.getElementById('thanks');
  if (msg && count){
    const update = () => { count.textContent = `${msg.value.length} / ${msg.maxLength}`; };
    msg.addEventListener('input', update); update();
  }
  if (form && thanks){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const payload = {
        name: document.getElementById('name').value,
        message: msg.value,
        ts: new Date().toISOString()
      };
      const key = 'reflectionFeedback';
      const all = JSON.parse(localStorage.getItem(key) || '[]');
      all.push(payload); localStorage.setItem(key, JSON.stringify(all));
      thanks.classList.remove('hidden');
      form.reset(); if (count) count.textContent = `0 / ${msg.maxLength}`;
    });
  }
});
