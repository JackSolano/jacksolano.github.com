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


function openScheduleWindow(persona) {
    const horarios = Familia_de_Horarios[persona];
    if (!horarios) {
        alert('No hay horario disponible para esta persona.');
        return;
    }

    const horas = ["06:00 - 08:00", "08:00 - 10:00", "10:00 - 12:00", "12:00 - 14:00",
                   "14:00 - 16:00", "16:00 - 18:00", "18:00 - 20:00"];

    const dias = ["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"];

    let tablaHTML = `<table border="1">
                        <tr>
                            <th>Hora</th>${dias.map(d => `<th>${d}</th>`).join('')}
                        </tr>`;

    horas.forEach(hora => {
        tablaHTML += `<tr><td>${hora}</td>`;

        dias.forEach(dia => {
            const materia = horarios.find(m => 
                m.Día.includes(dia) && m.Hora.includes(hora));
            tablaHTML += `<td>${materia ? materia["Nombre asignatura"] : ''}</td>`;
        });

        tablaHTML += `</tr>`;
    });

    tablaHTML += `</table>`;

    openSectionWindow(`Horario de ${persona}`, tablaHTML);
}

const Familia_de_Horarios = {
    "Anderson": [
        {
            "Código asignatura": 26686,
            "Nombre asignatura": "SEMINARIO DE TOP ESPECIALES I",
            "Grupo": "A",
            "Capacidad": 24,
            "Matriculados": 22,
            "Día": ["LUNES"],
            "Hora": ["14:00 - 17:00"],
            "Edificio": ["CIENCIAS HUMANAS II"],
            "Aula": ["505"],
            "Profesor": "HERNANDO ANDRES PULIDO LONDOÑO"
        },
        {
          "Código asignatura": 26678,
          "Nombre asignatura": "HISTORIOGRAFIA",
          "Grupo": "B",
          "Capacidad": 23,
          "Matriculados": 0,
          "Día": ["MIERCOLES"],
          "Hora": ["8:00 - 11:00"],
          "Edificio": ["CIENCIAS HUMANAS VIRGINIA GUTIERREZ DE PINEDA"],
          "Aula": ["510"],
          "Profesor": "ALFONSO ANTONIO FERNANDEZ VILLA"
        },
        {
            "Código asignatura": 26679,
            "Nombre asignatura": "TEORIA DE LA HIST",
            "Grupo": "B",
            "Capacidad": 23,
            "Matriculados": 0,
            "Día": ["MIERCOLES"],
            "Hora": ["14:00 - 17:00"],
            "Edificio": ["CIENCIAS HUMANAS II"],
            "Aula": ["512"],
            "Profesor": "MIGUEL DARIO CUADROS SANCHEZ"
        },
        {
            "Código asignatura": 26687,
            "Nombre asignatura": "HIST DE AMERICA LATINA I",
            "Grupo": "A",
            "Capacidad": 23,
            "Matriculados": 0,
            "Día": ["MARTES", "VIERNES"],
            "Hora": ["14:00 - 16:00", "8:00 - 10:00"],
            "Edificio": ["CIENCIAS HUMANAS VIRGINIA GUTIERREZ DE PINEDA"],
            "Aula": ["303"],
            "Profesor": "ROBINSON SALAZAR CARRENO"
        }
        ,{
        "Código asignatura": 26689,
        "Nombre asignatura": "ESTADISTICA",
        "Grupo": "A",
        "Capacidad": 32,
        "Matriculados": 31,
        "Día": ["JUEVES"],
        "Hora": ["15:00 - 18:00"],
        "Edificio": ["CIENCIAS HUMANAS VIRGINIA GUTIERREZ DE PINEDA"],
        "Aula": ["210"],
        "Profesor": "ARIEL GOMEZ MANTILLA"
      }
    
    ]
     ,
     "Daniela": [
        {
            "Código asignatura": 20274,
            "Nombre asignatura": "ANALISIS MATEMATICO I",
            "Grupo": "C",
            "Capacidad": 21,
            "Matriculados": 0,
            "Día": ["LUNES", "MARTES", "JUEVES"],
            "Hora": ["16:00 - 18:00", "10:00 - 12:00", "10:00 - 12:00"],
            "Edificio": ["CAMILO TORRES","CAMILO TORRES","CAMILO TORRES"],
            "Aula": ["--","306","306"],
            "Profesor": ["SERGIO ANDRES PEREZ LEON","SERGIO ANDRES PEREZ LEON","SERGIO ANDRES PEREZ LEON"]
           },
        {
            "Código asignatura": 24171,
            "Nombre asignatura": "ANALISIS NUMERICO",
            "Grupo": "B1",
            "Capacidad": 22,
            "Matriculados": 0,
            "Día": ["MIERCOLES", "VIERNES"],
            "Hora": ["08:00 - 10:00", "08:00 - 10:00"],
            "Edificio": ["CAMILO TORRES", "CAMILO TORRES"],
            "Aula": ["505", "505"],
            "Profesor": "JULIO CESAR CARRILLO ESCOBAR"
        },
        {
            "Código asignatura": 24181,
            "Nombre asignatura": "OPTIMIZACION",
            "Grupo": "B",
            "Capacidad": 30,
            "Matriculados": 0,
            "Día": ["MARTES", "JUEVES"],
            "Hora": ["08:00 - 10:00", "08:00 - 10:00"],
            "Edificio": "CAMILO TORRES",
            "Aula": "307",
            "Profesor": "ELDER JESUS VILLAMIZAR ROA"
        },
        {
            "Código asignatura": 24784,
            "Nombre asignatura": "TOPICOS EN ESTADISTICA",
            "Grupo": "C",
            "Capacidad": 20,
            "Matriculados": 0,
            "Día": ["LUNES", "MIERCOLES"],
            "Hora": ["10:00 - 12:00", "10:00 - 12:00"],
            "Edificio": ["CAMILO TORRES", "CAMILO TORRES"],
            "Aula": ["507", "507"],
            "Profesor": "ANDRES SEBASTIAN RIOS GUTIERREZ"
        },
        {
            "Código asignatura": 23426,
            "Nombre asignatura": "INGLES III",
            "Grupo": "A02",
            "Capacidad": 22,
            "Matriculados": 22,
            "Día": ["LUNES", "MIERCOLES", "VIERNES"],
            "Hora": ["7:00 - 8:00", "6:00 - 8:00", "6:00 - 8:00"],
            "Edificio": "VIRGINIA GUTIERREZ DE PINEDA",
            "Aula": "302",
            "Profesor": "MONICA ANDREA PINEDA CASTELLANOS"
          }
    ]
    ,
    "Gisselle": [
        {
            "Código asignatura": 23423,
            "Nombre asignatura": "CULTURA FISICA Y DEPORTIVA",
            "Grupo": "A07",
            "Matriculados": 27,
            "Día": [
                "LUNES",
                "MIERCOLES"
            ],
            "Hora": [
                "6:00 - 7:00",
                "6:00 - 7:00"
            ],
            "Edificio": "Canchas",
            "Aula": "00",
            "Profesor": "JAVIER GILMAR TOLOZA ARCINIEGAS"
        },
        {
            "Código asignatura": 23425,
            "Nombre asignatura": "INGLES II",
            "Grupo": "E04",
            "Capacidad": 20,
            "Matriculados": 20,
            "Día": [
                "LUNES",
                "MIERCOLES",
                "VIERNES"
            ],
            "Hora": [
                "15:00 - 16:00",
                "14:00 - 16:00",
                "14:00 - 16:00"
            ],
            "Edificio": [
                ""
            ],
            "Aula": [
                ""
            ],
            "Profesor": ""
        },
        {
            "Código asignatura": 27132,
            "Nombre asignatura": "INTRODUCCION A LA INGENIERIA",
            "Grupo": "B2",
            "Capacidad": 25,
            "Matriculados": 24,
            "Día": [
                "MARTES",
                "JUEVES"
            ],
            "Hora": [
                "8:00 - 10:00",
                "8:00 - 10:00"
            ],
            "Edificio": [
                ""
            ],
            "Aula": [
                ""
            ],
            "Profesor": [
                "ELSIDA RAMIREZ SIERRA",
                "JORGE LUIS CARDENAS RANGEL"
            ]
        },
        {
            "Código asignatura": 22950,
            "Nombre asignatura": "FISICA I",
            "Grupo": "B6B",
            "Capacidad": 14,
            "Matriculados": 14,
            "Día": [
                "MIERCOLES",
                "MIERCOLES",
                "JUEVES",
                "VIERNES"
            ],
            "Hora": [
                "8:00 - 10:00",
                "16:00 - 18:00",
                "10:00 - 11:00",
                "8:00 - 10:00"
            ],
            "Edificio": [
                "CAMILO TORRES",
                "LABORATORIOS LIVIANOS",
                "CAMILO TORRES",
                "CAMILO TORRES"
            ],
            "Aula": [
                "402",
                "311",
                "402",
                "402"
            ],
            "Profesor": ["CAMILO ARTURO SUAREZ BALLESTEROS","HOLGER GIOVANNI QUINTERO SANTANDER"]
        },
        {
            "Código asignatura": 20253,
            "Nombre asignatura": "CALCULO II",
            "Grupo": "F8",
            "Capacidad": 30,
            "Matriculados": 30,
            "Día": [
                "MARTES",
                "VIERNES"
            ],
            "Hora": [
                "16:00 - 18:00",
                "16:00 - 18:00"
            ],
            "Edificio": [
                "LABORATORIOS PESADOS",
                "CAMILO TORRES"
            ],
            "Aula": [
                "312",
                "302"
            ],
            "Profesor": "JOSE GABRIEL ACEVEDO HABEYCH"
        }
    ]
    ,
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

// Función para crear una ventana con los horarios
function mostrarHorario() {
    const Familia_de_Horarios = {
        "Anderson": [
            {
                "Código asignatura": 26686,
                "Nombre asignatura": "SEMINARIO DE TOP ESPECIALES I",
                "Grupo": "A",
                "Capacidad": 24,
                "Matriculados": 22,
                "Día": ["LUNES"],
                "Hora": ["14:00 - 17:00"],
                "Edificio": ["CIENCIAS HUMANAS II"],
                "Aula": ["505"],
                "Profesor": "HERNANDO ANDRES PULIDO LONDOÑO"
            },
            {
                "Código asignatura": 26678,
                "Nombre asignatura": "HISTORIOGRAFIA",
                "Grupo": "B",
                "Capacidad": 23,
                "Matriculados": 0,
                "Día": ["MIERCOLES"],
                "Hora": ["8:00 - 11:00"],
                "Edificio": ["CIENCIAS HUMANAS VIRGINIA GUTIERREZ DE PINEDA"],
                "Aula": ["510"],
                "Profesor": "ALFONSO ANTONIO FERNANDEZ VILLA"
            }
        ]
    };

    const windowsContainer = document.body;
    const newWindow = document.createElement('div');
    newWindow.classList.add('window');
    newWindow.style.top = `${Math.random() * (window.innerHeight - 300)}px`;
    newWindow.style.left = `${Math.random() * (window.innerWidth - 300)}px`;

    newWindow.innerHTML = `
        <div class="title-bar">
            <span class="title">Horario de Anderson</span>
            <button class="close-button">X</button>
        </div>
        <div class="content">
            <ul>
                ${Familia_de_Horarios.Anderson.map(horario => {
                    return `
                        <li>
                            <strong>${horario['Nombre asignatura']}</strong> - ${horario['Hora'].join(', ')}<br>
                            <em>Día(s): ${horario['Día'].join(', ')}</em>
                        </li>
                    `;
                }).join('')}
            </ul>
        </div>
    `;

    windowsContainer.appendChild(newWindow);

    newWindow.querySelector('.close-button').addEventListener('click', () => {
        newWindow.remove();
    });

    makeWindowDraggable(newWindow);
}

// Hacer que las ventanas sean arrastrables
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

// Añadir evento al botón
document.getElementById('mostrarHorarioButton').addEventListener('click', mostrarHorario);
