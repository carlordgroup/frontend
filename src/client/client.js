import axios from "axios";

const config = {baseURL:"https://carlord.moki.cat/api/"}

if (localStorage.getItem("token")){
    config.headers={'Authorization': "Bearer " + localStorage.getItem("token")??""}
}

const client = axios.create(config)


export default {
    getCards: ()=>client.get("/card/"),
    deleteCard: (id)=>client.delete(`/card/${id}`),
    addCard: (number,cardholder_name,valid_until)=>client.post("/card/", {
        cardholder_name,
        number,
        valid_until
    }),
    addBooking:(car_id,card_id,end_time,start_time)=>client.post("booking/",{car_id,card_id,end_time,start_time}),
    getCar:(id)=>client.get(`/management/car/${id}`),
    cancelBooking:(id)=>client.delete(`/booking/${id}`),
    pay:(id)=>client.post(`/booking/pay/${id}`),
    getBooking:()=>client.get(`/booking/`),
    getAllBooking:()=>client.get(`/management/booking/`),
    getLocations:()=>client.get(`/management/location/`),
    deleteLocation:(id)=>client.delete(`/management/location/${id}`),
    getCars:()=>client.get(`/management/car/`),
    deleteCar:(id)=>client.delete(`/management/car/${id}`),
}
