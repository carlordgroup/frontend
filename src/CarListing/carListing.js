import React from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./carListing.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAdmin, useToken} from '../appContext';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Link, useNavigate
} from "react-router-dom";
import Button from '@mui/material/Button'
import client from "../client/client";

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


];

const CarListing = () => {

  const token = useToken()
  const admin = useAdmin()

  const [config, setConfig] = useState()

  const[cars, setCars] = useState([])
  const nav = useNavigate()
  useEffect(() => {
    setConfig({
      headers: {
          'Authorization': "Bearer " + token
      }
    })
  }, [token])

    const deleteCar = (id)=>{
        client.deleteCar(id)
            .then(res => {
                getCar()
            }).catch((error) => {
            console.log(error.response.data)
        })

    }

    const getCar = ()=>{
        client.getCars()
            .then(res => {
                setCars(res.data)
            }).catch((error) => {
            console.log(error.response.data)
            })
    }
  useEffect(() => {
    getCar()

}, [])

  useEffect(()=>{
    console.log(cars)
    if(cars.length !== 0){
      for(let i = 0; i<cars.length; i++){
        cars[i].link = () => {   <Link to ={`/carListing/confirmPayment/${cars[i].id}`}>Link</Link> }
      }
    }
  }, [cars])

    const renderColumns = (()=>{
        // give different table on different role
        if (admin) return[...columns,
            { field: 'delete', headerName: 'delete', width: 130, renderCell:(params)=>{return <Button color="warning" variant="outlined" onClick={(e)=>{
                deleteCar(params.row.id)
            }}>Delete</Button>}},
            { field: 'offline', headerName: 'offline', width: 130, renderCell:(params)=>{return <Button color="primary" variant="outlined" onClick={(e)=>{
                nav("/management/offline/"+params.row.id)
            }}>Offline Booking</Button>}},]
        return [...columns, { field: 'link', headerName: 'View', align: 'center', headerAlign: 'center', width: 130,
            renderCell: (params) => {
                return <Button><Link to ={`/carListing/confirmPayment/${params.row.id}`} className="carRentalLink">Rent</Link></Button>;
            }},]

    })()

  return (
    <div className="carListPad">
      <DataGrid
      rows={cars}
      columns={renderColumns}
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
