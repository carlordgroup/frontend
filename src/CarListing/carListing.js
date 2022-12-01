import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./carListing.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useToken } from '../appContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Link
} from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'brand', headerName: 'Brand', width: 130 },
  { field: 'carType', headerName: 'Car Type', width: 130 },
  { field: 'color', headerName: 'Color', width: 90 },
  { field: 'carID', headerName: 'License Plate', width: 200 },
  { field: 'link', headerName: 'View', width: 200, renderCell: (cellValues) => {
    return <Link to ='/carListing/confirmPayment'>Link</Link>;
  } },
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
  { id: 1, brand: 'Toyota', carType: 'Sedan', color: "Red", carID: '123', link: 'View'},
];

const carListing = () => {

  return (
    <div className="carListPad">
      <DataGrid
      rows={rows}
      columns={columns}
      pageSize={5}
      rowsPerPageOptions={[5]}
      components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          }
        }
      }
      
      />
      <HomeMenu />
    </div>
  )
}

export default carListing