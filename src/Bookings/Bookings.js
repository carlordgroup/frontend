import React, {useState, useEffect} from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./bookings.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {useAdmin, useToken} from '../appContext'
import Button from "@mui/material/Button";
import client from "../client/client";

const Bookings = () => {

  const [config, setConfig] = useState()
  const [bookingObjects, setBookingObjects] = useState([])
  const token = useToken()
  //Set columns
  const columns = [
    { field: 'id', headerName: "ID", width: 130 },
    { field: 'booking_status', headerName: 'Status', width: 130 },
    { field: 'start_at', headerName: 'Start Date', width: 130 },
    { field: 'end_at', headerName: 'End Date', width: 130 },
    { field: 'rate', headerName: 'Rate', width: 130 },
    { field: 'exceed_rate', headerName: 'Exceed Rate', width: 130 },
    { field: 'brand', headerName: 'Car Brand', width: 130},
    { field: 'car_type', headerName: 'Car Type', width: 130},
    { field: 'mileage', headerName: 'Mileage', width: 130},
    { field: 'model', headerName: 'Model', width: 130},
    { field: 'plate_number', headerName: 'Plate Number', width: 130},
    { field: 'year', headerName: 'Year', width: 130},
    { field: 'cancel', headerName: 'cancel', width: 130, renderCell:(params)=>{return <Button disabled={params.row.booking_status==="cancel"||params.row.edges.billing.status==="paid"} color="error" variant="outlined" onClick={(e)=>{
        client.cancelBooking(params.row.id).then(()=>{getBookings()})
      }}>Cancel</Button>}

    },
    { field: 'bill', headerName: 'bill', width: 130, renderCell:(params)=>{return <Button disabled={params.row.booking_status==="cancel"||params.row.edges.billing.status==="paid"} color="primary" variant="outlined" onClick={(e)=>{
        client.pay(params.row.edges.billing.id).then(()=>{getBookings()})
      }}>{params.row.edges.billing.status}</Button>}

    },
  ];

  const admin = useAdmin()

  useEffect(() => {
      setConfig({
      headers: {
          'Authorization': "Bearer " + token
      }
      })
  }, [token])

  const getBookings= async ()=>{
    const {data}=admin?(await client.getAllBooking()):(await client.getBooking())
    setBookingObjects(data)
  }

  useEffect(() => {
   getBookings()
  }, [admin])

  //Map booking object
  useEffect(()=>{
    if(bookingObjects){
      bookingObjects.map((object) => {
        return {
          ...object,
          start_at: new Date(object.start_at),
          end_at: new Date(object.end_at),
          brand: object.edges.car.brand,
          car_type: object.edges.car.car_type,
          mileage: object.edges.car.mileage,
          model: object.edges.car.model,
          plate_number: object.edges.car.plate_number,
          year: object.edges.car.year
        }
      })
    }
  }, [bookingObjects])

  return (
    <div className="bookingPad">
      <DataGrid
        rows={bookingObjects.map((object) => {
          console.log(object)
          return {
            ...object,
            start_at: new Date(object.start_at*1000).getFullYear() + "-" + (new Date(object.start_at*1000).getMonth() + 1) + "-" + new Date(object.start_at*1000).getDate(),
            end_at: new Date(object.end_at*1000).getFullYear() + "-" + (new Date(object.end_at*1000).getMonth() + 1) + "-" + new Date(object.end_at*1000).getDate(),
            brand: object.edges.car.brand,
            car_type: object.edges.car.car_type,
            mileage: object.edges.car.mileage,
            model: object.edges.car.model,
            plate_number: object.edges.car.plate_number,
            year: object.edges.car.year
          }
        })}
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
  );
}

export default Bookings
