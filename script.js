document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.open-window');
    const closeButton = document.querySelectorAll('.close-button');
    const windows = document.querySelectorAll('.window');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            openSectionWindow(section, 'Contenido para ' + section); // añadir contenido para cada sección.
        });
    });

    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            const window = button.closest('.window');
            window.remove();
        });
    });

    // Añadir funcionalidad de arrastrar a todas las ventanas actuales
    windows.forEach(window => {
        makeWindowDraggable(window);
    });
});

// abrir ventanas de secciones
function openSectionWindow(section, content) {
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
            <p>${content}</p>
        </div>
    `;

    windowsContainer.appendChild(newWindow);

    // Añadir funcionalidad de cierre a la nueva ventana
    newWindow.querySelector('.close-button').addEventListener('click', () => {
        newWindow.remove();
    });

    // Hacer que la nueva ventana sea arrastrable
    makeWindowDraggable(newWindow);
}

function makeWindowDraggable(window) {
    const titleBar = window.querySelector('.title-bar');
    let offsetX, offsetY;

    titleBar.addEventListener('mousedown', (e) => {
        offsetX = e.clientX - window.offsetLeft;
        offsetY = e.clientY - window.offsetTop;
        document.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseup', mouseUp);
    });

    function mouseMove(e) {
        window.style.left = `${e.clientX - offsetX}px`;
        window.style.top = `${e.clientY - offsetY}px`;
    }

    function mouseUp() {
        document.removeEventListener('mousemove', mouseMove);
        document.removeEventListener('mouseup', mouseUp);
    }
}

function openWindow() {
    // Ejemplo de función para abrir una ventana desde la taskbar
    messages = frasesCulturaPop;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    openSectionWindow('Mensaje del sistema', randomMessage);
}
// Abrir la ventana principal 
function openMainWindow() {
    const mainWindow = document.querySelector('.main-window');
    const smallWindows = document.querySelectorAll('.window:not(.main-window)');

    // Mostrar la ventana principal
    mainWindow.style.display = 'block';

    // Cerrar las ventanas pequeñas
    smallWindows.forEach(window => window.remove());
    
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarHoraActual(); // Mostrar la hora actual cuando se carga la página
    setInterval(mostrarHoraActual, 1000); // Actualizar la hora cada segundo
});

function mostrarHoraActual() {
    const now = new Date();
    const horas = now.getHours().toString().padStart(2, '0');
    const minutos = now.getMinutes().toString().padStart(2, '0');
    const horaActual = `${horas}:${minutos}`;
    document.getElementById('hora-actual').textContent = horaActual;
}
