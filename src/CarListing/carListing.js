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
import Button from '@mui/material/Button'

const columns = [
  { field: 'id', headerName: "ID", width: 130, align: 'center', headerAlign: 'center'},
  { field: 'brand', headerName: 'Brand', width: 130, align: 'center', headerAlign: 'center' },
  //{ field: 'carType', headerName: 'Car Type', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'deposit', headerName: 'Deposit', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'mileage', headerName: 'Mileage', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'model', headerName: 'Model', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'plate_country', headerName: 'Plate Origin', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'plate_number', headerName: 'Plate Number', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'price', headerName: 'Price', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'status', headerName: 'Status', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'year', headerName: 'Year', width: 130, align: 'center', headerAlign: 'center' },
  { field: 'link', headerName: 'View', align: 'center', headerAlign: 'center', width: 130, 
  renderCell: (params) => {
    return <Button><Link to ={`/carListing/confirmPayment/${params.row.id}`} className="carRentalLink">Rent</Link></Button>;
  }},
];

const CarListing = () => {

  const token = useToken()
  const [config, setConfig] = useState()

  const[cars, setCars] = useState([])

  useEffect(() => {
    setConfig({
      headers: {
          'Authorization': "Bearer " + token
      }
    })
  }, [token])

  useEffect(() => {
        axios.get(`https://carlord.moki.cat/api/management/car/`,  config)
        .then(res => {
        setCars(res.data)
        }).catch((error) => {
        console.log(error.response.data)
    })
}, [config])

  useEffect(()=>{
    console.log(cars)
    if(cars.length !== 0){
      for(let i = 0; i<cars.length; i++){
        cars[i].link = () => {   <Link to ={`/carListing/confirmPayment/${cars[i].id}`}>Link</Link> }
      }
    }
  }, [cars])

  

  return (
    <div className="carListPad">
      <DataGrid
      rows={cars}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[20]}
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

export default CarListing