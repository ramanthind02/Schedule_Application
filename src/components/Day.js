import React, { useEffect, useState} from 'react'
import "./Day.css"
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import WorkModal from './WorkModal';
import e from 'cors';


function Day ( props) {
    

  const day = props.day





  const month = props.month

  const year = props.year

  const storeNumber = props.storeNumber

  






  const [dayWorker, showDayWorker] = useState(props.dayWorker)
  const [nightWorker, showNightWorker] = useState(props.nightWorker)








  



  

  const [show,setShow] = useState(false)
  const classes = props.className
  


  

  return (
      <div>
      
          <Card  className="day" 
          text={"white"} 
          bg={"dark"} 
          style={{ width: '90%', height:"8rem", margin:"5px" }} 
          onClick={() => setShow(true)}
           >
              <Card.Title >{day}</Card.Title>
              <Card.Text classname="dayporter">{dayWorker}</Card.Text>
              <Card.Text classname="nightporter">{nightWorker}</Card.Text>
            </Card>
          

          <WorkModal 
            className= "modal" 
            onClose={() => setShow(false)} 
            show={show} 
            day={day} 
            month={month} 
            year ={year}
            storeNumber={storeNumber}
            dayWorker={dayWorker}
            nightWorker={nightWorker}
            url={props.url}
            showDayWorker={showDayWorker}
            showNightWorker={showNightWorker}
   
            />
          
          

        </div>

    

  )

}

export default Day; 