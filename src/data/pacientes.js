const pacientes = [
  { dni: '30123456', nombre: 'María', apellido: 'González', nroAfiliado: '10001-01', telefono: '1112345678', parentesco: 'Titular', fechaNacimiento: '1895-03-12', planMedico: 'Plata' },
  { dni: '32109876', nombre: 'Lucía', apellido: 'González', nroAfiliado: '10001-02', telefono: '1112345679', parentesco: 'Hija', fechaNacimiento: '2005-08-19', planMedico: 'Plata' },
  { dni: '29123457', nombre: 'Carlos', apellido: 'González', nroAfiliado: '10001-03', telefono: '1112345680', parentesco: 'Esposo', fechaNacimiento: '1972-11-04', planMedico: 'Plata' },
  { dni: '27234567', nombre: 'Martín', apellido: 'González', nroAfiliado: '10001-04', telefono: '1112345681', parentesco: 'Hijo', fechaNacimiento: '2008-06-15', planMedico: 'Plata' },
  { dni: '27876543', nombre: 'Valentina', apellido: 'González', nroAfiliado: '10001-05', telefono: '1112345682', parentesco: 'Hija', fechaNacimiento: '2010-09-27', planMedico: 'Plata' },
  { dni: '30987654', nombre: 'Federico', apellido: 'González', nroAfiliado: '10001-06', telefono: '1112345683', parentesco: 'Abuelo', fechaNacimiento: '1945-01-22', planMedico: 'Plata' },

  { dni: '34123456', nombre: 'Soledad', apellido: 'Ramírez', nroAfiliado: '20001-01', telefono: '1123456789', parentesco: 'Titular', fechaNacimiento: '1980-05-10', planMedico: 'Oro' },
  { dni: '33214567', nombre: 'Emilia', apellido: 'Ramírez', nroAfiliado: '20001-02', telefono: '1123456790', parentesco: 'Madre', fechaNacimiento: '1958-12-02', planMedico: 'Oro' },
  { dni: '35432145', nombre: 'Lautaro', apellido: 'Ramírez', nroAfiliado: '20001-03', telefono: '1123456791', parentesco: 'Hermano', fechaNacimiento: '2000-07-13', planMedico: 'Oro' },
  { dni: '36435678', nombre: 'Tamara', apellido: 'Ramírez', nroAfiliado: '20001-04', telefono: '1123456792', parentesco: 'Prima', fechaNacimiento: '1998-03-09', planMedico: 'Oro' },
  { dni: '37436547', nombre: 'Camilo', apellido: 'Ramírez', nroAfiliado: '20001-05', telefono: '1123456793', parentesco: 'Padre', fechaNacimiento: '1955-06-01', planMedico: 'Oro' },
  { dni: '38439876', nombre: 'Micaela', apellido: 'Ramírez', nroAfiliado: '20001-06', telefono: '1123456794', parentesco: 'Hermana', fechaNacimiento: '2002-10-25', planMedico: 'Oro' },

  { dni: '39123456', nombre: 'Jorge', apellido: 'Fernández', nroAfiliado: '30001-01', telefono: '1134567890', parentesco: 'Titular', fechaNacimiento: '1968-04-22', planMedico: 'Platino' },
  { dni: '39123457', nombre: 'Claudia', apellido: 'Fernández', nroAfiliado: '30001-02', telefono: '1134567891', parentesco: 'Esposa', fechaNacimiento: '1970-07-30', planMedico: 'Platino' },
  { dni: '39123458', nombre: 'Lucas', apellido: 'Fernández', nroAfiliado: '30001-03', telefono: '1134567892', parentesco: 'Hijo', fechaNacimiento: '2004-12-05', planMedico: 'Platino' },
  { dni: '39123459', nombre: 'Bautista', apellido: 'Fernández', nroAfiliado: '30001-04', telefono: '1134567893', parentesco: 'Hijo', fechaNacimiento: '2006-02-17', planMedico: 'Platino' },
  { dni: '39123460', nombre: 'Malena', apellido: 'Fernández', nroAfiliado: '30001-05', telefono: '1134567894', parentesco: 'Hija', fechaNacimiento: '2009-09-09', planMedico: 'Platino' },
  { dni: '39123461', nombre: 'Elsa', apellido: 'Fernández', nroAfiliado: '30001-06', telefono: '1134567895', parentesco: 'Abuela', fechaNacimiento: '1943-10-01', planMedico: 'Platino' },

  { dni: '40123456', nombre: 'Ricardo', apellido: 'López', nroAfiliado: '40001-01', telefono: '1145678900', parentesco: 'Titular', fechaNacimiento: '1971-06-21', planMedico: '410' },
  { dni: '40123457', nombre: 'Nora', apellido: 'López', nroAfiliado: '40001-02', telefono: '1145678901', parentesco: 'Esposa', fechaNacimiento: '1973-05-11', planMedico: '410' },
  { dni: '40123458', nombre: 'Tobías', apellido: 'López', nroAfiliado: '40001-03', telefono: '1145678902', parentesco: 'Hijo', fechaNacimiento: '2003-01-29', planMedico: '410' },
  { dni: '40123459', nombre: 'Candela', apellido: 'López', nroAfiliado: '40001-04', telefono: '1145678903', parentesco: 'Hija', fechaNacimiento: '2007-11-07', planMedico: '410' },
  { dni: '40123460', nombre: 'Franco', apellido: 'López', nroAfiliado: '40001-05', telefono: '1145678904', parentesco: 'Nieto', fechaNacimiento: '2012-03-03', planMedico: '410' },
  { dni: '40123461', nombre: 'Sofía', apellido: 'López', nroAfiliado: '40001-06', telefono: '1145678905', parentesco: 'Prima', fechaNacimiento: '2000-08-15', planMedico: '410' },

  { dni: '50123456', nombre: 'Patricia', apellido: 'Torres', nroAfiliado: '50001-01', telefono: '1156789012', parentesco: 'Titular', fechaNacimiento: '1978-04-19', planMedico: 'Bronce' },
  { dni: '50123457', nombre: 'Sebastián', apellido: 'Torres', nroAfiliado: '50001-02', telefono: '1156789013', parentesco: 'Hijo', fechaNacimiento: '2006-10-30', planMedico: 'Bronce' },
  { dni: '50123458', nombre: 'Ignacio', apellido: 'Torres', nroAfiliado: '50001-03', telefono: '1156789014', parentesco: 'Hijo', fechaNacimiento: '2008-01-10', planMedico: 'Bronce' },
  { dni: '50123459', nombre: 'Rocío', apellido: 'Torres', nroAfiliado: '50001-04', telefono: '1156789015', parentesco: 'Hija', fechaNacimiento: '2010-06-06', planMedico: 'Bronce' },
  { dni: '50123460', nombre: 'Alma', apellido: 'Torres', nroAfiliado: '50001-05', telefono: '1156789016', parentesco: 'Madre', fechaNacimiento: '1953-09-12', planMedico: 'Bronce' },
  { dni: '50123461', nombre: 'Marcos', apellido: 'Torres', nroAfiliado: '50001-06', telefono: '1156789017', parentesco: 'Padre', fechaNacimiento: '1951-07-07', planMedico: 'Bronce' },
];

export default pacientes;