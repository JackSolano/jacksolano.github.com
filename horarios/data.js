// data.js
// Datos de los horarios. Para agregar uno nuevo, copia un bloque
// dentro de HORARIOS con una clave nueva (ej: "2027-1") y sus datos.

const HORARIOS = {
  "mio": {
    titulo: "Horario mío",
    periodo: "2026 - 2",
    estudiante: "2269518 - SOLANO GELVEZ JACK FREDDY",
    programa: "301 - MAESTRIA EN MATEMATICAS",
    horaInicio: 6,
    horaFin: 18,
    asignaturas: [
      {
        codigo: "24405",
        nombre: "ALGEBRA LINEAL",
        grupo: "A",
        creditos: 5,
        sesiones: [
          { dia: "Lun", inicio: 10, fin: 12, aula: "FC 108" },
          { dia: "Mie", inicio: 14, fin: 16, aula: "FC 108" }
        ]
      },
      {
        codigo: "24406",
        nombre: "ANALISIS EN RN",
        grupo: "A",
        creditos: 5,
        sesiones: [
          { dia: "Mie", inicio: 8, fin: 10, aula: "FC 108" },
          { dia: "Vie", inicio: 8, fin: 10, aula: "FC 108" }
        ]
      },
      {
        codigo: "24407",
        nombre: "TOPOLOGIA",
        grupo: "A",
        creditos: 5,
        sesiones: [
          { dia: "Mar", inicio: 10, fin: 12, aula: "EDIC 612" },
          { dia: "Jue", inicio: 10, fin: 12, aula: "EDIC 612" }
        ]
      }
    ]
  }
};
