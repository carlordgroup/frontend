import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./bookings.css"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'car', headerName: 'Car', width: 90 },
  { field: 'carID', headerName: 'License Plate', width: 200 },
  { field: 'confirmID', headerName: 'Confirmation Number', width: 200 },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Man', firstName: 'Jia', car: "Corolla", carID: '123', confirmID: '321' },
  { id: 2, lastName: 'Cho', firstName: 'Dan', car: "Camry", carID: '124', confirmID: '421' },
];

const Bookings = () => {
  return (
    <div className="bookingPad" style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
      <HomeMenu />
    </div>
  );
}

export default Bookings