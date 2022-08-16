import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./components/Home"
import Header from './components/Header';
import BasicExample from "./components/Navbar"



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route  path="/" element={<App/>}>
                <Route  path="store" element={<Header/>}>
                    <Route path=":storeNumber" element={<Header/>}/>
                </Route>
            </Route>


        </Routes>
    </BrowserRouter>

);
