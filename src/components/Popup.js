import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import './Popup.css';


function Popup(props) {

  const navigate = useNavigate();
  return (props.trigger) ? (
    <div className="popup">
        <div className="popup-inner">
            <button className="close-btn" onClick={() => props.setTrigger(false)}>Close</button>


            <div className="menu">
            <Menu className='m'
            onClick={({key}) => {
              if(key === "signout") {
                //Sign Out
              }
              else {
                navigate(key);

              }
              
            }}  
            
            items={[
            {label: "Home", key:"/"},
            {label: 'Item 1', key:"/Item1"},
            {label: 'Item 2', key:"/Item2"},
            {label: 'Item 3', key:"/Item3"},
            {label: 'Item 4', key:"/Item4"}]}>   
            </Menu>
            </div>



      
        </div>     
    </div>
  ) : "";
}

function Content() {
    return (
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<div>Home</div>}></Route>
            <Route path="/Item 1" element={<div>Item 1</div>}></Route>
            <Route path="/Item 2" element={<div>Item 2</div>}></Route>
            <Route path="/Item 3" element={<div>Item 3</div>}></Route>
            <Route path="/Item 4" element={<div>Item 4</div>}></Route>
          </Routes>
        </Router>
      </div>

    );
}

export default Popup;


/* 
   <Menu className='menu'
            onClick={({key}) => {
              if(key === "signout") {
                //Sign Out
              }
              else {
                navigate(key);

              }
              
            }}  
            
            items={[
            {label: "Home", key:"/"},
            {label: 'Item 1', key:"/Item1"},
            {label: 'Item 2', key:"/Item2"},
            {label: 'Item 3', key:"/Item3"},
            {label: 'Item 4', key:"/Item4"}]}>   
            </Menu>
        </div>      
*/