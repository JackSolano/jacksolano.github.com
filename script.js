document.addEventListener('DOMContentLoaded', () => {
    // Configuración inicial de tus ventanas (tu código original)
    const links = document.querySelectorAll('.open-window');
    const closeButton = document.querySelectorAll('.close-button');
    const windows = document.querySelectorAll('.window');

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const section = event.target.getAttribute('data-section');
            openSectionWindow(section, 'Contenido para ' + section);
        });
    });
    // CODIGO PARA VENTANAS PDF LATEX
    /* (Para crear mas poner un  
    <a href="#" class="open-window-math" data-pdf="matematicas/Otro_Tema_Matematicas.pdf" data-title="Otro Tema de Matemáticas">Otro Tema de Matemáticas</a>)
    */
    document.querySelectorAll('.open-window-math').forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pdfURL = link.getAttribute('data-pdf');
            const title = link.getAttribute('data-title');
            openMathPDFWindow(pdfURL, title);
        });
    });

    function openMathPDFWindow(pdfURL, title) {
        const windowsContainer = document.body;
        const newWindow = document.createElement('div');
        newWindow.classList.add('window', 'pdf-window');
        newWindow.style.top = '50px';
        newWindow.style.left = '50%';
        newWindow.style.transform = 'translateX(-50%)';
        newWindow.style.width = '95vw';
        newWindow.style.maxWidth = '1500px';
        newWindow.style.height = '90vh';

        newWindow.innerHTML = `
            <div class="title-bar">
                <span class="title">${title}</span>
                <button class="close-button">X</button>
            </div>
            <div class="content" style="height: calc(100% - 40px); padding: 0;">
                <div class="pdf-container" style="height: 110%;">
                    <iframe 
                        src="${pdfURL}#view=FitH" 
                        width="100%" 
                        height="100%"
                        style="border: none;"
                        title="${title}"
                    ></iframe>
                </div>
            </div>
        `;

        windowsContainer.appendChild(newWindow);

        newWindow.querySelector('.close-button').addEventListener('click', () => {
            newWindow.remove();
            document.body.style.overflow = '';
        });

        makeWindowDraggable(newWindow);
        document.body.style.overflow = 'hidden';
    }


    closeButton.forEach(button => {
        button.addEventListener('click', () => {
            const window = button.closest('.window');
            window.remove();
        });
    });

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

    // Asignar funcionalidad al botón de cerrar
    const closeButton = mainWindow.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
        mainWindow.style.display = 'none';
    });

    // Hacer la ventana principal arrastrable
    makeWindowDraggable(mainWindow);
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


//---------------------------

