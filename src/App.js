import React from "react";
import {useState, useEffect} from "react"
import './App.css';
import axios from 'axios';

import { Routes, Route, useNavigate } from "react-router-dom";
import { Menu } from 'antd';
import { HomeOutlined, QuestionCircleOutlined, SendOutlined, SettingOutlined, SwapOutlined, UserOutlined } from "@ant-design/icons";

function App() {

    const navigate = useNavigate();

    return (

      <div className="App">
        <div style={{display:"flex", flexDirection:"row"}} >
              <Menu
                  onClick={({ key }) => {
                      if (key === "signout") {
                          // Sign Out
                      } else {
                          navigate(key);
                      }
                  }}
                  items={[
                      { label: "Home", key: "/", icon: <HomeOutlined /> },
                      { label: "Profile", key: "/Profile", icon: <UserOutlined /> },
                      { label: 'Transfer', key: "/Transfer", icon: <SwapOutlined /> },
                      { label: 'Send', key: "/Send", icon: <SendOutlined /> },
                      { label: 'Settings', key: "/Settings", icon: <SettingOutlined /> },
                      { label: 'Help', key: "/Help", icon: <QuestionCircleOutlined /> }
                  ]}>
              </Menu>
             
             <div className="display">
                 <div className="logo_cont">
                    <img src="https://cdn.discordapp.com/attachments/1157051486946209844/1173838206404415568/Vaulted_Wealth-logos_white.png" alt="" />
                 </div>

                 <Content/>    
            </div>
        </div>
    </div>
    );
}

function Content() {
    /*const [email, setEmail] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/user")
        .then((res) => res.json())
        .then((data) => setEmail(data.message));
    }, []);*/

    /*const [email, setEmail] = useState("");
    useEffect(() => {
        fetch("http://localhost:8000/user")
        .then((res) => res.json())
        .then((data) => setEmail(data.user.email));
    }, []);*/

    const [email, setEmail] = useState("john123@gmail.com");
    const [phone, setPhone] = useState("555-123-4567");
    const [address, setAddress] = useState("123 Main Street");
    const [city, setCity] = useState("Bakersfield");
    const [state, setState] = useState("CA");
    const [zip, setZip] = useState("93309");
    const [balance, setBalance] = useState("1234.56");
    const [inputValue, setInputValue] = useState('');
    const [ID, setID] = useState('1');
    const [transferID, setTransferID] = useState('');
    const [transferAmount, setTransferAmount] = useState('');

    const forceUpdate = useForceUpdate();

  useEffect(() => {
    fetch("http://localhost:8000/user")
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.user.email);
        setPhone(data.user.phone);
        setAddress(data.user.address);
        setCity(data.user.city);
        setState(data.user.state);
        setZip(data.user.zip);
        setBalance(data.user.balance);
        setID(data.user.id);
        forceUpdate(); // Forces refresh on home page
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [forceUpdate]);

      const initialUser = {
        name: 'John Doe',
        age: '18+',
        address: '123 Main Street',
        city: 'Bakersfield',
        zipCode: '12345',
        state: 'CA',
        gender: 'Male',
        password: '123Go',
        email: 'john123@gmail.com',
      };

      const [user, setUser] = useState(initialUser);
      const [isFormVisible, setFormVisible] = useState(false);
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };
    
      const profileFormSubmit = (e) => {
        e.preventDefault();
        try {
                axios.post('http://localhost:8000/userupdate', {
                email: inputValue,
            });
            console.log('String sent successfully');
        } catch (error) {
            console.error('Error sending string:', error);
        }
        setFormVisible(false);
      };
    
      const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
      };

      const transferSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/transfer', {
                senderid: ID,
                transferid: transferID,
                transferamount: transferAmount,
            });
        } catch (error) {
            console.error('Error sending transfer:', error);
        }
      };


    return (
      <div >
       
          <Routes>
            <Route path="/" element={<div className="global">

                <div className="userInfo">
                    <div className="Userh1"> Account User </div>
                    <hr></hr>
                    <div className="Userh2"> Primary Address: {address}</div>
                    <div className="Userh2"> {city}, {state}, {zip} </div>
                    <div className="Userh2"> Primary Phone: {phone} </div>
                    <div className="Userh2"> Primary Email: {email}</div>
                    <hr></hr>
                </div>

                <div className="accountDetails">
                  <div className="Accounth1"> Account Balance </div>
                  <hr></hr>
                  <div className="Accounth2"> ${balance} </div>
                  <hr></hr>
              </div>

                
            </div>}></Route>
            <Route path="/Profile" element= {<div className="global">
                
                <div className="container">
                    <h3 className="Userh1">User Information</h3>
                    <hr></hr>
                    <p className="Userh2">Name: {user.name}</p>
                    <p className="Userh2">Age: {user.age}</p>
                    <p className="Userh2">Address: {user.address}</p>
                    <p className="Userh2">City: {user.city}</p>
                    <p className="Userh2">Zip Code: {user.zipCode}</p>
                    <p className="Userh2">State: {user.state}</p>
                    <p className="Userh2">Gender: {user.gender}</p>
                    <br />

                    <button className="button" onClick={toggleFormVisibility}>Edit User Info</button>

                    {isFormVisible && (
                    <form className="formStyle" onSubmit={profileFormSubmit}>
                        <label>
                        Name:
                        <br />
                        <input 
                        type="text" 
                        name="name" 
                        value={user.name} 
                        onChange={handleInputChange} />
                        </label>
                        <br />
                        <label>
                        Age:
                        <br />
                        <input type="text"
                        name="age" 
                        value={user.age} 
                        onChange={handleInputChange}
                         />
                        </label>
                        <br />
                        <label>
                        Address:
                        <br />
                        <input 
                        type="text" 
                        name="address" 
                        value={user.address} 
                        onChange={handleInputChange} 
                        />
                        </label>
                        <br />
                        <label>
                        City:
                        <br />
                        <input 
                        type="text" 
                        name="city" 
                        value={user.city} 
                        onChange={handleInputChange} 
                        />
                        </label>
                        <br />
                        <label>
                        Zip Code:
                        <br />
                        <input 
                        type="text" 
                        name="zipCode" 
                        value={user.zipCode} 
                        onChange={handleInputChange} 
                        />
                        </label>
                        <br />
                        <label>
                        State:
                        <br />
                        <input 
                        type="text" 
                        name="state" 
                        value={user.state} 
                        onChange={handleInputChange} 
                        />
                        </label>
                        <br />
                        <label>
                        Gender:
                        <br />
                        <input 
                        type="text" 
                        name="gender" 
                        value={user.gender} 
                        onChange={handleInputChange} 
                        />
                        </label>
                        <br />
                        <br />

                        <button className="button" type="submit">Save</button>
                    </form>
                    )}       
                </div>           
            </div>}></Route>
            <Route path="/Transfer" element={<div className="global">

                <div className="container">
                <form className="formStyle" onSubmit={profileFormSubmit}>
                    <h3 className="Userh1"> Transfer funds</h3>
                    <hr></hr>
                       
                        <br />
                        <label>
                        <div className="sendh2">Transfer to:</div>
                        <br />
                        <input 
                        type="text" 
                        name="Recipient" 
                        />
                        </label>
                        <br />
                        <label>
                        <br />
                        <div className="sendh2">Amount</div>
                        <br />
                        <input 
                        type="float" 
                        name="amount" 
                        />
                        </label>
                       
                        <br />
                        <br />
                        <br />

                        <button type="reset" className="button">Send</button>
                    </form>
                </div>

            </div>}></Route>

            <Route path="/Send" element={<div className = "global">
                <div className="container">
                    <form className="formStyle" onSubmit={transferSubmit}>
                    <h3 className="Userh1">Send Funds</h3>
                    <br />
                    <hr></hr>
                            <br />
                            <label>
                            <div className="sendh2"> ID: {ID}</div>
                            </label>
                            <br />
                            <label>
                            <div className="sendh2">Send to:</div>
                            <br />
                            <input 
                            type="text" 
                            name="accountNumber" 
                            onChange={(e) => setTransferID(e.target.value)}
                            />
                            </label>
                            <br />
                            <label>
                            <br />
                            
                            <div className="sendh2">Amount:</div>
                            <br />
                            <input 
                            type="float" 
                            name="amount" 
                            onChange={(e) => setTransferAmount(e.target.value)}
                            />
                            </label>
                            <br />
                            <br />
                            <br />

                            <button type="submit" className="button">Send</button>
                        </form>
                    </div>

                </div>}></Route>
            <Route path="/Settings" element={<div className = "global">
            <div className="container">
                    <h3 className="Userh1">Security</h3>
                    <hr></hr>
                    <p className="Userh2">Email: {email}</p>
                    
                    <br />

                    <button className="button" onClick={toggleFormVisibility}>Edit</button>

                    {isFormVisible && (
                    <form className="formStyle" onSubmit={profileFormSubmit}>
                        <label>
                        <div classname = "sendh2" ></div>Change Email:
                        <br />
                        <input type="text"
                        email="email" 
                        onChange={(e) => setInputValue(e.target.value)}
                         />
                        </label>
                        <br />
                        
                        <br />
                        <br />
                        
                        <button className="button" type="submit">Save</button>
                    </form>
                    )}       
                </div>    
            </div>}></Route>

            <Route path="/Help" element={<div className = "global">
            <div className="container">
                    <form className="formStyle" onSubmit={profileFormSubmit}>
                          
                            <br />
                            <label>
                            <div className="Userh2"> For Further Questions or Inquiries </div>
                            <hr></hr>
                            <br />
                            <div className="Userh2">Help Number:  1(123)750-5890 </div>
                            <div className="Userh2">Help Email:  VaultAid@gmail.com </div>
                            </label>
                            <br />
                            <br />
                        </form>
                    </div>
              

            </div>}></Route>
          </Routes>
       
      </div>

    );
}

function useForceUpdate() {
    const [, setValue] = useState(0);
    return () => setValue(value => value + 1);
  }



export default App;