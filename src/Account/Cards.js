import React, {useEffect, useState} from 'react'
import './cards.css'
import { useToken } from '../appContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios';

const Cards = () => {

  const token = useToken()

  const [config, setConfig] = useState()

  const [name, setName] = useState()
  const [number, setNumber] = useState()
  const [expiry, setExpiry] = useState()
  const [update, setUpdate] = useState()

  const [numOfCards, setNumOfCards] = useState(0)
  const [creditCardData, setCreditCardData] = useState()


  useEffect(() => {
    setConfig({
    headers: {
        'Authorization': "Bearer " + token
    }
    })
  }, [token])

  useEffect(() => {
    axios.get(`https://carlord.moki.cat/api/card/`, config)
      .then(res => {
          console.log(res);
          setCreditCardData(res.data[0]);
          if(res.data.length !== 0){
            console.log("here")
            setNumOfCards(1)
          }
      }).catch((error) => {
          console.log(error.response.data)
    })
  }, [config])

  useEffect(() => {
    if(update){
        let url = "https://carlord.moki.cat/api/card/"
        if(numOfCards !== 0){
          url =  "https://carlord.moki.cat/api/card/1"
        }
        axios.post(url, {"cardholder_name": name, "number": number, "valid_until": expiry}, config)
        .then(res => {
          console.log(res.data);
          setCreditCardData(res.data[0]);
          setNumOfCards(1)
        }).catch((error) => {
          console.log(error.response.data)
    })
    }
    setUpdate(false)
  }, [update, name, number, expiry, config, numOfCards])

  useEffect(()=>{
    console.log(creditCardData)
    if(creditCardData){ 
      setName(creditCardData.cardholder_name)
      setNumber(creditCardData.number)
      setExpiry(creditCardData.valid_until)
    }
  }, [creditCardData])

  return (
    <>
      <h1 className="cardsTitle">Credit Cards</h1>
      <div className="creditCardBox">
        <TextField
          required
          id="firstName"
          label="Cardholder Name"
          type="firstName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="creditCardTextBox"
          InputLabelProps={{
              shrink: true,
          }}
        />
        <TextField
            required
            id="lastName"
            label="Credit Card Number"
            type="lastName"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="creditCardTextBox"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            required
            id="address"
            label="Expiry Date"
            type="address"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="creditCardTextBox"
            InputLabelProps={{
                shrink: true,
            }}
        />
        <Button onClick={()=>{setUpdate(true)}} variant="outlined" size="medium">Save</Button>
      </div>
    </>
  )
}

export default Cards