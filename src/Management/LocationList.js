import React, {useState, useEffect} from 'react'
import HomeMenu from '../shared/HomeMenu'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useToken } from '../appContext'
import Button from "@mui/material/Button";
import client from "../client/client";

const LocationList = () => {

    const [config, setConfig] = useState()
    const [bookingObjects, setBookingObjects] = useState([])
    const token = useToken()
    const columns = [
        { field: 'id', headerName: "ID", width: 130 },
        { field: 'name', headerName: "Name", width: 130 },
        { field: 'latitude', headerName: "Latitude", width: 130 },
        { field: 'longitude', headerName: "Longitude", width: 130 },
        { field: 'Operation', headerName: 'Operation', width: 130, renderCell:(params)=>{return <Button color="warning" variant="outlined" onClick={(e)=>{
                client.deleteLocation(params.row.id).then(()=>getLocation())
            }}>Delete</Button>}

        },
    ];

    useEffect(() => {
        setConfig({
            headers: {
                'Authorization': "Bearer " + token
            }
        })
    }, [token])

    const getLocation= async ()=>{
        const {data}=await client.getLocations()
        setBookingObjects(data)
    }

    useEffect(() => {
        getLocation()
    }, [])



    return (
        <div className="bookingPad">

            <DataGrid
                rows={bookingObjects}
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

export default LocationList
