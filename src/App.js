import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicExample from './components/Navbar';
import { Routes, Route, useParams, Link, Outlet } from "react-router-dom";






function App() {
  return (
  <div >

    <BasicExample/>


    <Outlet/>
  </div>
  );
}

export default App;
