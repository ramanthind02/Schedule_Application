import "./Calendar.css";
import React, { useState } from 'react'; 

import Day from "./Day"

function getDaysInMonth(year, month) {
    return new Date(year, month+1, 0).getDate();
}



function Calendar(props) {

  

   




    const classes = props.className

    let date = new Date();  
    let month = props.month - 1
    let year = date.getFullYear(); 

    let starting_date = new Date(year,month,1)


    let first_day = starting_date.getDay()


    let last_date = new Date(year,month+1,0)

    // day of the week for last day in month
    let last_day = last_date.getDay(); 

    let daysInMonth = getDaysInMonth(year,month)





    let mod_7 = 7 - ((daysInMonth+first_day) % 7); 


    let padding_end = daysInMonth + mod_7



    let days = []

    for (var i = 1-first_day; i<=padding_end; i++){
        
        if (i>=1 && i <= daysInMonth){

            days.push(i)
        }
            
        else{

            days.push(null)
        }

    }


    return <div className={classes} >


        {days.map(days => (
            <Day className="day" day={days} month={month} />

         
        ))}
        


    </div>

}

export default Calendar; 