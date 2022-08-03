import React, {useState} from 'react';
import "./Modal.css"


function Modal(props) {
    
    const [enteredName, setEnteredName] = useState(''); 
    
    const [enteredName2, setEnteredName2] = useState(''); 
    
    function nameChangeHandler (event) {
        
        setEnteredName(event.target.value); 
   
    }

    function nameChangeHandler2 (event) {
        
        setEnteredName2(event.target.value); 
   
    }
    if (!props.show) {

        return null
    }

    const classes = props.className


    function submitHandler (event) {

        event.preventDefault(); 


        props.setName(enteredName)
        props.setName2(enteredName2)
        
    }

    return (
        
        
        <div className={classes}>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h4 className='modal-title'> Title: {props.date}</h4>
                </div>
                <div className='modal-body'>
                    <form onSubmit={submitHandler}>

                        <label> Name</label>
                        <input type='text' onChange={nameChangeHandler}/>


                        <label> Name 2</label>
                        <input type='text' onChange={nameChangeHandler2}/>

                        <button type="submit" >Add</button>


                    </form>
                </div>
                <div className='modal-footer'>
                    <button onClick={props.onClose} className='button'>Close</button>
                </div>
            </div>
        </div>
    )
}

export default Modal; 