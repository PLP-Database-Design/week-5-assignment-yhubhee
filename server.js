const express = require('express');
const dotenv = require('dotenv');
const mysql = require('mysql2');

const app = express();
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})
console.log(process.env.DB_USERNAME);

db.connect((error) => {
    if (error){
        console.log("Error connecting to DB: ", err.stack)
        return;
    }
    console.log("Successfully connected to DB")
})

app.get('/',(req, res)=>{
    res.send("hij")
})

// Question 1 goes here
app.get('/patients', (req, res)=>{
    const sql = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';

    db.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send(results) //or .json
    })
})

// Question 2 goes here
app.get('/providers', (req, res)=>{
    const sql = 'SELECT first_name, last_name, provider_specialty FROM providers';

    db.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send(results) //or .json
    })
})

// Question 3 goes here
app.get('/patientsname', (req, res)=>{
    const sql = 'SELECT first_name FROM patients';

    db.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send(results) //or .json
    })
})

// Question 4 goes here
app.get('/providerspecialty', (req, res)=>{
    const sql = 'SELECT provider_specialty  FROM providers';

    db.query(sql, (err, results)=>{
        if (err){
            return res.status(500).send(err)
        }
        res.send(results) //or .json
    })
})

const port = 3700;
app.listen(port, () =>{
    console.log(`Server is running on http://localhost:${port}`);    
})