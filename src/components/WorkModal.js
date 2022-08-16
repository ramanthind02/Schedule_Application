import React, { useState } from 'react';
import "./WorkModal.css"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const axios = require('axios')



function WorkModal(props) {

    

    const [enteredName, setEnteredName] = useState('');
    const [enteredName2, setEnteredName2] = useState('');

    const [status,setStatus] = useState("")

    const day = props.day
    const month = props.month
    const year = props.year
    const storeNumber = props.storeNumber; 





    async function onSubmit(event) {

        event.preventDefault();

        props.showDayWorker(enteredName)
        props.showNightWorker(enteredName2)



        axios.post(props.url,{
            storeNumber: storeNumber, 
            shift: "dayporter",
            name: enteredName,
            date: {
                day: day,
                month: month,
                year: year
            }  
        })
        .then(function (response) {
            console.log(response);
        })
        axios.post(props.url,{
            storeNumber: storeNumber, 
            shift: "nightporter",
            name: enteredName2,
            date: {
                day: day,
                month: month,
                year: year
            }  
        })
        .then(function (response) {
            console.log(response);
        })


    };




    function nameChangeHandler(event) {

        setEnteredName(event.target.value);

    }
    function nameChangeHandler2(event) {

        setEnteredName2(event.target.value);

    }

    async function deleteHandler(){

        const store_url = storeNumber.toString();

        const date_obj = {"day":day,"month":month, "year":year}
        
        const date_url = encodeURIComponent(JSON.stringify(date_obj))
    
        const get_api = props.url.concat(store_url,"/",date_url); 
        
        await axios.delete(get_api);
        setStatus('Delete successful');
        props.showDayWorker("")
        props.showNightWorker("")

    }

    


    if (!props.show) {

        return null
    }




   




    return (
        <>
        <Modal show={props.show} >
            <Modal.Header closeButton onClick={props.onClose}>
                <Modal.Title>Add Work</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form onSubmit={onSubmit}>

                <input
                    label="Dayporter"
                    type='text'
                    onChange={nameChangeHandler}
                    
                />
                <input
                    label="Nightporter"
                    type='text'
                    onChange={nameChangeHandler2}
                />
                <button type="submit" >Add</button>
                
            </form>

            </Modal.Body>
            <Modal.Footer>
                <Button type="submit" variant="secondary" onClick={deleteHandler}>Delete</Button>
            </Modal.Footer>
        </Modal>
        </>

    )
}





export default WorkModal;