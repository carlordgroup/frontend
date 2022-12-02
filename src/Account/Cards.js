import React, {useEffect, useState} from 'react'
import './cards.css'
import { useToken } from '../appContext'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import axios from 'axios';
import client from "../client/client";
import Box from "@mui/material/Box";

const Cards = () => {


  const [name, setName] = useState()
  const [number, setNumber] = useState()
  const [expiry, setExpiry] = useState()

  const [error, setError] = useState("")
  const [cards, setCards] = useState([])

    useEffect( ()=>{
        getCards()
    },[])

    const getCards =async ()=>{
        const {data} = await client.getCards()
        console.table(data)
        setCards(data);
    }

    const addCard = async ()=>{
        if (parseInt(number)){
            setError("")
        }else {
            setError("the card number should be a number")

        }
        await client.addCard(number,name,expiry)
        await getCards()
    }
    const deleteCard = async (id)=>{
        await client.deleteCard(id)
        await getCards()
    }

  return (
    <>
      <h1 className="cardsTitle">Credit Cards</h1>
        <div style={{width:"100%", textAlign:"center"}}>
            <p className="errorMessage">{error}</p>
            {!!cards.length&& <table  style={{display:"inline-block",textAlign:"center", fontSize:"1rem"}}>
                <tr>
                    <th>Number</th>
                    <th>Card Holder</th>
                    <th>Valid Until</th>
                    <th>Delete</th>
                </tr>
                {cards.map(card=><tr key={card.id}>
                    <td>{card.number}</td>
                    <td>{card.cardholder_name}</td>
                    <td>{card.valid_until}</td>
                    <td><Button variant="outlined" color="error" size="small" onClick={()=>deleteCard(card.id)}>Delete</Button></td>
                </tr>)}
            </table>
            }
        </div>
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
        <Button onClick={()=>{addCard()}} variant="outlined" size="medium">Save</Button>
      </div>
    </>
  )
}

export default Cards
