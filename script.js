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


function crearHorario(horario) {
    const contenedor = document.getElementById('horario');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevo contenido

    // Días de la semana
    const diasOrdenados = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];
    
    // Crear la tabla
    const tabla = document.createElement('table');

    // Crear la primera fila con los días de la semana
    const filaDias = document.createElement('tr');
    filaDias.appendChild(document.createElement('th')); // Celda vacía en la esquina superior izquierda
    diasOrdenados.forEach(dia => {
        const th = document.createElement('th');
        th.innerText = dia;
        filaDias.appendChild(th);
    });
    tabla.appendChild(filaDias);

    // Crear las filas por franjas horarias
    const franjasHorarias = ['8:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '16:00 - 18:00'];

    franjasHorarias.forEach(franja => {
        const fila = document.createElement('tr');
        const th = document.createElement('th');
        th.innerText = franja;
        fila.appendChild(th);

        diasOrdenados.forEach(dia => {
            const td = document.createElement('td');
            td.innerHTML = ''; // Inicializar con una celda vacía

            // Buscar las clases que corresponden a este día y franja horaria
            const clasesDelDia = horario.filter(clase => {
                return clase.Día.includes(dia) && clase.Hora.includes(franja);
            });

            // Mostrar las clases que se corresponden con esta franja horaria y día
            clasesDelDia.forEach(clase => {
                const div = document.createElement('div');
                div.innerHTML = `${clase["Nombre asignatura"]} ${clase["Grupo"]}<br>Profesor: ${clase.Profesor}`;
                td.appendChild(div);
            });

            fila.appendChild(td);
        });

        tabla.appendChild(fila);
    });

    // Añadir la tabla al contenedor
    contenedor.appendChild(tabla);
}

// Los datos de ejemplo
const Familia_de_Horarios = {
"Farid":[
    {
        "Codigo asignatura": 29205,
        "Nombre asignatura": "CATEDRA UIS",
        "Grupo": "PE1",
        "Matriculados": 40,
        "Día": ["LUNES"],
        "Hora": ["14:00 - 16:00"],
        "Edificio": "",
        "Aula": "",
        "Profesor": "JORGE ANDRÉS ROJAS GÓMEZ"
    },
    {
        "Codigo asignatura": 20252,
        "Nombre asignatura": "CÁLCULO I",
        "Grupo": "PF5",
        "Matriculados": 40,
        "Día": ["LUNES", "MARTES", "JUEVES"],
        "Hora": ["16:00 - 18:00", "16:00 - 18:00", "16:00 - 18:00"],
        "Edificio": "INGENIERÍA INDUSTRIAL",
        "Aula": "502",
        "Profesor": "JORGE ANDRÉS ROJAS GÓMEZ"
    },
    {
        "Codigo asignatura": 20273,
        "Nombre asignatura": "GEOMETRÍA EUCLIDIANA",
        "Grupo": "PC1",
        "Matriculados": 25,
        "Día": ["MARTES", "JUEVES", "VIERNES"],
        "Hora": ["10:00 - 12:00", "10:00 - 12:00", "10:00 - 12:00"],
        "Edificio": "CAMILO TORRES",
        "Aula": "506",
        "Profesor": "CARLOS WILSON RODRÍGUEZ CÁRDENAS"
    },
    {
        "Codigo asignatura": 22979,
        "Nombre asignatura": "ÁLGEBRA LINEAL I",
        "Grupo": "PF1",
        "Matriculados": 27,
        "Día": ["LUNES", "MARTES", "VIERNES"],
        "Hora": ["16:00 - 18:00", "16:00 - 18:00", "16:00 - 18:00"],
        "Edificio": "CAMILO TORRES",
        "Aula": "303",
        "Profesor": "DUWAMG ALEXIS PRADA MARÍN"
    },
    {
        "Codigo asignatura": 23423,
        "Nombre asignatura": "CULTURA FÍSICA Y DEPORTIVA",
        "Grupo": "PB1",
        "Matriculados": 27,
        "Día": ["MARTES", "JUEVES"],
        "Hora": ["08:00 - 09:00", "08:00 - 09:00"],
        "Edificio": "Canchas",
        "Aula": "00",
        "Profesor": "JAVIER GILMAR TOLOZA ARCINIEGAS"
    },
    {
        "Codigo asignatura": 24173,
        "Nombre asignatura": "PROGRAMACIÓN I",
        "Grupo": "PE2",
        "Matriculados": 25,
        "Día": ["MIERCOLES", "VIERNES"],
        "Hora": ["14:00 - 16:00", "13:00 - 16:00"],
        "Edificio": "INGENIERÍA QUÍMICA",
        "Aula": "231",
        "Profesor": "CAMILO EDUARDO GONZÁLEZ GUERRERO"
    },
    {
        "Codigo asignatura": 25124,
        "Nombre asignatura": "TALLER DE LENGUAJE I",
        "Grupo": "PB1",
        "Matriculados": 22,
        "Día": ["LUNES", "MIERCOLES"],
        "Hora": ["08:00 - 10:00", "08:00 - 10:00"],
        "Edificio": "JORGE BAUTISTA VESGA",
        "Aula": "410",
        "Profesor": "MARJELIS VIRGINIA JAIMES MOGOLLÓN"
    }
]

};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mostrarHorarioButton').addEventListener('click', () => {
        crearHorario(Familia_de_Horarios.Farid);
    });
});
