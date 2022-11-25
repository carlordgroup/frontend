import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./carListing.css"
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'carType', headerName: 'Car Type', width: 130 },
  { field: 'color', headerName: 'Color', width: 90 },
  { field: 'carID', headerName: 'License Plate', width: 200 },
  { field: 'link', headerName: 'Link', width: 200 },
  {
    field: 'fullCar',
    headerName: 'Car',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.brand || ''} ${params.row.carType || ''}`,
  },
];

const rows = [
  { id: 1, brand: 'Toyota', carType: 'Sedan', color: "Red", carID: '123', link: "link"},
  { id: 2, brand: 'Toyota', carType: 'Sedan', color: "Blue", carID: '124', link: "link"},
  { id: 3, brand: 'Ford', carType: 'Hatchback', color: "Black", carID: '125', link: "link"},
  { id: 4, brand: 'Honda', carType: 'Sedan', color: "Green", carID: '126', link: "link"},
];


const carListing = () => {
  return (
    <div className="carListPad" style={{ height: 400, width: '100%' }}>

      <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      checkboxSelection
      />
      <HomeMenu />
    </div>
  )
}

export default carListing