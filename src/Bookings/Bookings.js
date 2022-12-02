import React, {useState, useEffect} from 'react'
import HomeMenu from '../shared/HomeMenu'
import "./bookings.css"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import { useToken } from '../appContext'

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
  // { field: 'fuelStart', headerName: 'Fuel Start', width: 130 },
  // { field: 'fuelEnd', headerName: 'Fuel End', width: 130 },
  // { field: 'mileageStart', headerName: 'Mileage Start', width: 130 },
  // { field: 'mileageEnd', headerName: 'Mileage End', width: 130 },
  // { field: 'returnCarAt', headerName: 'Return Car At', width: 130 },
];

// const rows = [
//   { id: 1, status: 1, deposit: 'Man', startDate: 'Jia', endDate: "Corolla", exceedRate: '123', fuelStart: '321', fuelEnd: '321', mileageStart: '300', mileageEnd: '350', rate: '50', returnCarAt: 'Toronto' },
// ];

const Bookings = () => {

  const [config, setConfig] = useState()
  const [bookingObjects, setBookingObjects] = useState([])
  const token = useToken()

  useEffect(() => {
      setConfig({
      headers: {
          'Authorization': "Bearer " + token
      }
      })
  }, [token])

  useEffect(() => {
    axios.get(`https://carlord.moki.cat/api/booking/`, config)
      .then(res => {
        console.log(res.data);
        setBookingObjects(res.data);
      }).catch((error) => {
        console.log(error.response.data)
    })  
  }, [config])

  useEffect(()=>{
    console.log(bookingObjects)
    if(bookingObjects){
      bookingObjects.map((object) => {
        console.log(object)
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


  // useEffect(()=>{
  //   console.log(bookingObjects)
  //   if(bookingObjects){
  //     console.log([{id: 306, start_at: 1670475600, end_at: 1670562000, rate: 5}]).map((object)=> {
  //       return {
  //         object,
  //         start_at: new Date(object.start_at),
  //         end_at: new Date(object.end_at),
  //         brand: object.edges.car.brand,
  //         car_type: object.edges.car.car_type,
  //         mileage: object.edges.car.mileage,
  //         model: object.edges.car.model,
  //         plate_number: object.edges.car.plate_number,
  //         year: object.edges.car.year
  //       }
  //     })
  //   }
  // }, [bookingObjects])

  // useEffect(() => {
  //   axios.delete(`https://carlord.moki.cat/api/booking/1`, config)
  //     .then(res => {
  //       console.log(res.data);
  //       setBookingObjects(res.data);
  //     }).catch((error) => {
  //       console.log(error.response.data)
  //   })  
  // }, [config])

  // useEffect(() => {
  //     axios.get(`https://carlord.moki.cat/api/management/car/`, config)
  //       .then(res => {
  //         console.log(res.data);
  //       }).catch((error) => {
  //         console.log(error.response.data)
  //     })
  // }, [config])

  // useEffect(() => {
  //   axios.post(`https://carlord.moki.cat/api/booking/`, JSON.stringify({
  //     booking_status: "Booked",
  //     deposit: "100",
  //     end_at: "December 9, 2022",
  //     exceed_rate: "70",
  //     fuel_level_at_begin: "80",
  //     fuel_level_at_end: "20",
  //     mileage_begin: "23000",
  //     mileage_end: "25000",
  //     rate: "50",
  //     return_car_at: "Toronto",
  //     start_at: "Toronto",
  //     car_id: 1,
  //     card_id: 1,
  //     start_time: parseInt(new Date(2023, 12, 20).getTime()/1000),
  //     end_time: parseInt(new Date(2023, 12, 29).getTime()/1000)
  //   }), config)
  //       .then(res => {
  //         console.log(res.data);
  //       }).catch((error) => {
  //       console.log(error.response.data)
  //   })
  // }, [config])



  return (
    <div className="bookingPad" style={{ height: 400, width: '100%' }}>
      <DataGrid
        // rows={bookingObjects.map((object)=> {
        //   return {
        //     object,
        //     start_at: new Date(object.start_at),
        //     end_at: new Date(object.end_at),
        //     brand: object.edges.car.brand,
        //     car_type: object.edges.car.car_type,
        //     mileage: object.edges.car.mileage,
        //     model: object.edges.car.model,
        //     plate_number: object.edges.car.plate_number,
        //     year: object.edges.car.year
        //   }
        // })}
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
  );
}

export default Bookings