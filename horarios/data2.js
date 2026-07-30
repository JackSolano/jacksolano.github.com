// data2.js
// Horario de Anderson. Se agrega al objeto HORARIOS ya definido en data.js
// (no se vuelve a declarar HORARIOS, solo se le suma una clave nueva).

Object.assign(HORARIOS, {
  "anderson": {
    titulo: "Horario Anderson",
    periodo: "2026 - 2",
    estudiante: "",
    programa: "",
    horaInicio: 6,
    horaFin: 20,
    asignaturas: [
      {
        codigo: "21283",
        nombre: "GIMNASIA FORMATIVA",
        grupo: "B01",
        creditos: 1,
        sesiones: [
          { dia: "Lun", inicio: 8, fin: 10, aula: "" }
        ]
      },
      {
        codigo: "26694",
        nombre: "LABORATORIO DE ARCHIVISTICA II",
        grupo: "A",
        creditos: 3,
        profesor: "Dolly Esperanza Rojas Peña",
        sesiones: [
          { dia: "Mar", inicio: 7, fin: 10, aula: "CH 303" }
        ]
      },
      {
        codigo: "26690",
        nombre: "SEMINARIO DE TOP ESPECIALES II",
        grupo: "A",
        creditos: 3,
        profesor: "Daniel Orlando Ramírez Galvis",
        sesiones: [
          { dia: "Mie", inicio: 8, fin: 11, aula: "CH 222" }
        ]
      },
      {
        codigo: "26691",
        nombre: "HISTORIA DE AMERICA LATINA II",
        grupo: "A",
        creditos: 4,
        profesor: "Alfonso Antonio Fernandez Villa",
        sesiones: [
          { dia: "Mar", inicio: 10, fin: 12, aula: "CH2 305" },
          { dia: "Jue", inicio: 10, fin: 12, aula: "CH2 305" }
        ]
      },
      {
        codigo: "26692",
        nombre: "FUENTES HISTORICAS",
        grupo: "A",
        creditos: 3,
        profesor: "Robinson Salazar Carreño",
        sesiones: [
          { dia: "Mie", inicio: 14, fin: 17, aula: "CH 510" }
        ]
      },
      {
        codigo: "26693",
        nombre: "FILOSOFIA DE LA HISTORIA",
        grupo: "A",
        creditos: 3,
        profesor: "Alvaro Acevedo Tarazona",
        sesiones: [
          { dia: "Vie", inicio: 8, fin: 11, aula: "CH 510" }
        ]
      },
      {
        codigo: "26593",
        nombre: "SOPORTES DOCUMENTALES Y GESTION DE LA INFORMACION",
        grupo: "A",
        creditos: 3,
        profesor: "Daniel Felipe Ardila Arias",
        sesiones: [
          { dia: "Mie", inicio: 17, fin: 20, aula: "CH 222" }
        ]
      }
    ]
  }
});
