document.querySelectorAll('.palette').forEach(palette => {
    const origTransform = palette.style.transform;
    palette.addEventListener('mousemove', e => {
      const { left, top, width, height } = palette.getBoundingClientRect();
      const ax = -(width / 2 - (e.clientX - left)) / 5;
      const ay = (height / 2 - (e.clientY - top)) / 5;
      palette.style.transform = `rotateY(${ax}deg) rotateX(${ay}deg)`;
    });
    palette.addEventListener('mouseout', () => palette.style.transform = origTransform);
});
document.querySelectorAll('.btnCopys').forEach(btn => btn.addEventListener('click', () => {
    const colors = Array.from(btn.closest('.palette').querySelectorAll('.color-box'))
        .map(box => `#${box.style.backgroundColor.match(/\d+/g).map(c => (+c).toString(16).padStart(2, '0')).join('').toUpperCase()}`);
    navigator.clipboard.writeText(colors.join('\n'))
        .then(() => {
            const msgElem = document.querySelector('.msg');
            msgElem.textContent = 'Paleta copiada!';
            msgElem.classList.add('show');
            setTimeout(() => msgElem.classList.remove('show'), 1000);
        })
        .catch(console.error);
}));