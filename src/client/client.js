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
    })
}