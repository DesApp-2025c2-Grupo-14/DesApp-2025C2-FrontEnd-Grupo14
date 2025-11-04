import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'ID', flex: 0.8 },
  { field: 'Integrante', headerName: 'Integrante', flex: 3 },
  { field: 'Fecha', headerName: 'Fecha', flex: 2 },
  { field: 'Lugar de atencion', headerName: 'Lugar de atencion', flex: 3 },
  { field: 'Forma de pago', headerName: 'Forma de pago', flex: 2 },
  { field: 'Estado', headerName: 'Estado', flex: 2 },
  { field: 'Detalle', headerName: 'Detalle', flex:3 },
  { field: 'Acciones', headerName: 'Acciones', flex: 1 }
];

const rows = [
  { id: 1, Integrante: 'Jon Snow', Fecha: '2025-10-15', 'Lugar de atencion': 'Hospital A', 'Forma de pago': 'Efectivo', Estado: 'Activo', Detalle: 'Detalle 1', Acciones: 'Editar' },
  { id: 2, Integrante: 'Cersei Lannister', Fecha: '2025-10-14', 'Lugar de atencion': 'Clínica B', 'Forma de pago': 'Tarjeta', Estado: 'Pendiente', Detalle: 'Detalle 2', Acciones: 'Editar' },
  { id: 3, Integrante: 'Jaime Lannister', Fecha: '2025-10-13', 'Lugar de atencion': 'Hospital C', 'Forma de pago': 'Efectivo', Estado: 'Activo', Detalle: 'Detalle 3', Acciones: 'Editar' },
  { id: 4, Integrante: 'Arya Stark', Fecha: '2025-10-12', 'Lugar de atencion': 'Clínica D', 'Forma de pago': 'Tarjeta', Estado: 'Cancelado', Detalle: 'Detalle 4', Acciones: 'Editar' },
  { id: 5, Integrante: 'Daenerys Targaryen', Fecha: '2025-10-11', 'Lugar de atencion': 'Hospital E', 'Forma de pago': 'Efectivo', Estado: 'Activo', Detalle: 'Detalle 5', Acciones: 'Editar' },
  { id: 6, Integrante: 'Melisandre', Fecha: '2025-10-10', 'Lugar de atencion': 'Clínica F', 'Forma de pago': 'Tarjeta', Estado: 'Pendiente', Detalle: 'Detalle 6', Acciones: 'Editar' }
];

export default function TablaPaginacion() {
  const [pageSize, setPageSize] = React.useState(3);

  return (
    <Paper sx={{ height: 780, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        onPageSizeChange={(newSize) => setPageSize(newSize)} // 👈 actualiza el tamaño de página
        rowsPerPageOptions={[3, 5, 10]} // 👈 define las opciones visibles
        pagination
        sx={{ border: 0 }}
      />
    </Paper>
  );
}