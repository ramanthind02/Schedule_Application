import "./Calendar.css";
import React, { useEffect, useState } from 'react'; 

import Day from "./Day"

import axios from 'axios';





function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}





function Calendar(props) {

    const [data, SetData] = useState()
    let dayWorkers  = []
    let nightWorkers = []



    

    

    const get_url = process.env.REACT_APP_GET_URL; 

    



    let date = new Date();  

    let month = props.month


    let year = date.getFullYear(); 

    const storeNumber = props.storeNumber

    
   async function fetch_obj() {
      props.setLoading(true)

      SetData([])

      const store_url = storeNumber.toString();

      
        const date_obj = {"day":i,"month":month, "year":year}

        const date_url = encodeURIComponent(JSON.stringify(date_obj))
    
        const get_api = get_url.concat(store_url,"/",month,"/",year); 

        let obj_day; 

        try {
            const responses = await axios.get(get_api);
            console.log(responses.data.works)
            SetData(responses.data.works)
  
            
        }
        catch (error) {
            console.log(error);
    
        }
        

        props.setLoading(false)

    }
    

    useEffect(() => {

  

        dayWorkers = []
        nightWorkers = []

        fetch_obj()



    

 
        

    }, [month, storeNumber])
    
    const classes = props.className


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
            days.push(i);


            
        } 
        else{
            days.push(null)
        }

    }
    


    if(props.loading===false){

    
        
        for (let i =0; i<32; i++){
            let obj1 = data.find(o => o.date.day === i && o.shift === "dayporter");
            let obj2 = data.find(o => o.date.day === i && o.shift === "nightporter");
            

            if(obj1 !== undefined){
                console.log(obj1)

                dayWorkers[i] = obj1.name
            }else{
                dayWorkers[i] = ""
            }
            if(obj2 !== undefined){
                console.log(obj2)

                nightWorkers[i] = obj2.name
            }else{
                nightWorkers[i] = ""
            }

        }




        console.log(dayWorkers)
        console.log(nightWorkers)

        


        
        return <>
            
        
            <div className="wrapper">

                {days.map(days => (
                    
                    <Day classname="day" day={days} month={month} year={year} storeNumber={storeNumber} dayWorker={dayWorkers[days]} nightWorker={nightWorkers[days]} url={get_url} />

                ))}

            </div>
        </>
    }
    }

export default Calendar; 