import './Header.css'

import Calendar from './Calendar';

import React, { useState, Component, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';





function Header() {

    const [loading, setLoading] = useState(true)

    let params = useParams();

    const storeNumber = params.storeNumber; 


    function monthName(mon) {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
    }

    //Get  month and year from date javascript
    let date = new Date();
    let string_month = date.toLocaleString('default', { month: 'long' });
    let initial_month = date.getMonth() + 1;
    let year = date.getUTCFullYear();

    const [month, setMonth] = useState(initial_month);

    function backHandler() {



        if(loading===false){

            setMonth(month - 1)
        }
        

    }

    function nextHandler() {
        if(loading===false){

            setMonth(month + 1)
        }
    }


    




    return (
        
        
        
        
        <div>


            <div className="flex-container" >
                <h2 className='header-month'> Store:{storeNumber}</h2>
                <h2 className="header-month">{monthName(month)} {year}</h2>
                <Button variant="outline-primary" onClick={backHandler} >Back</Button>{' '}
                <Button variant="outline-primary" onClick={nextHandler} >Next</Button>
            </div>


 

            <Calendar loading={loading} setLoading={setLoading} month={month} storeNumber={storeNumber} className="Calendar" />

            




        </div>

    )
}



export default Header; 
