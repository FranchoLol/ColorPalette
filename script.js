fetch('data.json')
.then(response => response.json())
.then(data => {
    const container = document.getElementById('palettes-container');
    data.palettes.forEach(palette => {
        const paletteDiv = document.createElement('div');
        paletteDiv.classList.add('palette');
        const colorsHTML = palette.colors.map(color => `<div class="color-box" style="background-color: ${color.hex}; color: ${color.textColor}">${color.hex}</div>`).join('');
        paletteDiv.innerHTML = `
            <div class="palette-title">${palette.name}</div>
            <div class="colors">
                ${colorsHTML}
            </div>
            <button class="btnCopys">Copy</button>
        `;
        container.appendChild(paletteDiv);
    });

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
            .map(box => box.textContent.trim());
        navigator.clipboard.writeText(colors.join('\n'))
            .then(() => {
                const msgElem = document.querySelector('.msg');
                msgElem.textContent = 'Paleta copiada!';
                msgElem.classList.add('show');
                setTimeout(() => msgElem.classList.remove('show'), 1500);
            })
            .catch(console.error);
    }));
})
.catch(error => console.error('Error loading data:', error));