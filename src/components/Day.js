import React, { useState} from 'react'
import "./Day.css"
import Modal from "./Modal"


function Day ( props) {

  

    const [name, setName] = useState (''); 
    const [name2, setName2] = useState (''); 
    

    const [show,setShow] = useState(false)
    const classes = props.className
    
    const day = props.day
    const month = props.month

   

    return (
        <>
            
            <div className={classes} onClick={() => setShow(true)} >{day} <div /> {name} <div /><br /> {name2}</div>
            

            <Modal setName2={setName2} setName={setName} className= "modal" onClose={() => setShow(false) } show={show} />
            
            

        </>

        


    )

}

export default Day; 