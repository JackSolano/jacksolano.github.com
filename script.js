document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.open-window');
    const closeButton = document.querySelectorAll('.close-button');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            openSectionWindow(section);
        });
    });

    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            const window = button.closest('.window');
            window.remove();
        });
    });
});

function openSectionWindow(section) {
    const windowsContainer = document.body;
    const newWindow = document.createElement('div');
    newWindow.classList.add('window');
    newWindow.style.top = `${Math.random() * (window.innerHeight - 300)}px`;
    newWindow.style.left = `${Math.random() * (window.innerWidth - 300)}px`;

    newWindow.innerHTML = `
        <div class="title-bar">
            <span class="title">${section}</span>
            <button class="close-button">X</button>
        </div>
        <div class="content">
            <p>Contenido de ${section}</p>
        </div>
    `;

    windowsContainer.appendChild(newWindow);

    // Añadir funcionalidad de cierre a la nueva ventana
    newWindow.querySelector('.close-button').addEventListener('click', () => {
        newWindow.remove();
    });
}

function openWindow() {
    // Ejemplo de función para abrir una ventana desde la taskbar
    openSectionWindow('Ventana Adicional');
}
document.addEventListener('DOMContentLoaded', () => {
    mostrarHoraActual(); // Mostrar la hora actual cuando se carga la página
    setInterval(mostrarHoraActual, 1000); // Actualizar la hora cada segundo
});

function mostrarHoraActual() {
    const divHora = document.getElementById('hora-actual');
    const horaActual = new Date();
    const hora = horaActual.getHours();
    const minutos = horaActual.getMinutes();

    // Formatear la hora para que tenga dos dígitos
    const horaFormateada = hora < 10 ? '0' + hora : hora;
    const minutosFormateados = minutos < 10 ? '0' + minutos : minutos;


    // Mostrar la hora en el div
    divHora.textContent = `${horaFormateada}:${minutosFormateados}`;
}