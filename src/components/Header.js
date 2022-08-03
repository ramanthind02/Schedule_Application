import './Header.css'

import Calendar from './Calendar';

import React, { useState, Component } from 'react';



function Header() {

    


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




        setMonth(month - 1)

    }

    function nextHandler() {
        setMonth(month + 1)
    }


    return (
        <div>


            <div className="flex-container" >
                <h2 className="header-month">{monthName(month)} {year}</h2>
                <button onClick={backHandler} className="header-button" >Back</button>
                <button onClick={nextHandler} className="header-button">Next</button>
            </div>


            <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>

            <Calendar month={month} className="Calendar" />



        </div>

    )
}



export default Header; 
