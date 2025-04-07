const express = require("express");
const cors = require("cors");
const axios = require("axios");


const app = express();

//middle ware
app.use(express.json());
app.use(cors());

//all currency
app.get("/getAllCurrencies",async (req,res)=>{
  const nameUrl = 'https://openexchangerates.org/api/currencies.json?prettyprint=false&show_alternative=false&show_inactive=false&app_id=298ff3f404064e35a28bfac75d1de0e5';



  try{
    const nameResponse = await axios.get(nameUrl);
    const nameData = nameResponse.data;

    return res.json(nameData);
  } catch(err){
    console.log(err);
  } 

});

//get the target amount
app.get("/convert",async (req, res) =>{
  const  {date,sourceCurrency,targetCurrency,amountInSourceCurrency} = req.query;
  try{
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=298ff3f404064e35a28bfac75d1de0e5`;
    const dataResponce = await axios.get(dataUrl);
    const rates = dataResponce.data.rates;

    //rates
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    //final target value
    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    return res.json(targetAmount.toFixed(2));

  }catch (err){
    console.error(err);
  }

});

//listen toa port
app.listen(5000,() =>{
  console.log("SERVER STARTED");
});