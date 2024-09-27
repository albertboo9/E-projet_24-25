import React, { useState } from 'react'
import '../styles/Tontine.css'
import { Outlet,NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'boxicons';
import Tontines_Transactions from './Tontines_Transactions';


export default function Tontine() {
  const [odiv, setdiv] = useState(false);
const sdiv = () =>{
  setdiv(true);
}
  return (
    <div>
    <section className="home-section tableau">
      <Popup 
       trigger={<nav className='navi'>
          <h1>Nom_Tontine <box-icon border="circle" size="md" color="green" name='info-circle'  ></box-icon> </h1>
      </nav>} modal>
        <div className="informations">
          <h2>
            Nom_tontine
          </h2>

          <label htmlFor=""> Date de création</label>
          <input type="text" value="12/02/207" readOnly/>
          <label htmlFor=""> fréquence</label>
          <input type="text" value="7jours" readOnly/>
          <label htmlFor=""> Créateur </label>
          <input type="text" value="Albert" readOnly/>
        </div>
        </Popup> 
      <div className="home-content">
        <div className="overview-boxes">
          <Popup 
          trigger={          <div className="box">
            <div className="right-side">
              <div className="box-topic">BALANCE</div>
              <div className="number">50.000$</div>
            </div>
            <box-icon name='money' color="#08368b" className="cart one"></box-icon>
          </div>} modal>

          <h1 align="center"> informations </h1>
          </Popup>

          <NavLink onClick={sdiv} className="box-info" to="/home/tontine/participants"> 
          <div className="box">
            <div className="right-side">
              <div className="box-topic">Participants</div>
              <div className="number" >20</div>

            </div>
            <box-icon name='user' color="#08368b" className="cart one"></box-icon>
          </div>
          </NavLink>
          <NavLink onClick={sdiv} className="box-info" to="/home/tontine/transactions"> 
          <div  className="box">
            <div className="right-side">
              <div className="box-topic">Transactions</div>
              <div className="number">500</div>
            </div>
            <box-icon name='transfer' color="#08368b" className="cart one"></box-icon>
          </div>
          </NavLink>
          <Popup 
          trigger={<div className="box">
            <div className="right-side">
              <div className="box-topic">Sécurisé</div>
              <div className="number">11.086$</div>
            </div>
            <box-icon name='wallet' color="#08368b" className="cart one"></box-icon>
          </div>} modal> 
          <h1 align="center"> informations </h1>
          </Popup>
        </div>

        <div className="sales-boxes">
          <div className="recent-sales">
            <div className="sales-details">
              {
                odiv ? <Outlet/> : <Tontines_Transactions/>
              }

            </div>
          </div>

          <div className="top-sales">
            <div className="title">Tour</div>
            <div className='tour'>
              <box-icon name='check-double' color="green" border="circle" size="md" pull="left"  ></box-icon> 
              <label> Albert</label> <br />
            </div>

            <div className='tour'>
              <box-icon name='check-double' color="green" border="circle" size="md" pull="left"  ></box-icon> 
              <label> Patricia</label> <br />
            </div>
            <div className='tour'>
              <box-icon name='check-double' color="green" border="circle" size="md" pull="left"  ></box-icon> 
              <label> Emmanuel</label> <br />
            </div>

            <div className="tour">
            <box-icon name='loader-circle' animation="spin" color="Orange" border="circle" size="md" pull="left"  ></box-icon>
            <label > Privat </label> <br />
            </div>
            <div className="tour">
            <box-icon name='check' color="#6aa4db" border="circle" size="md" pull="left"  ></box-icon> 
            <label >Jules-grégoire</label><br />
            </div>
            <div className="tour">
            <box-icon name='check' color="#6aa4db" border="circle" size="md" pull="left"  ></box-icon> 
            <label > John </label><br />
            </div>
            <div className="tour">
            <box-icon name='check' color="#6aa4db" border="circle" size="md" pull="left"  ></box-icon> 
            <label > Sandrine</label><br />
            </div>
            <div className="tour">
            <box-icon name='check' color="#6aa4db" border="circle" size="md" pull="left"  ></box-icon> 
            <label > Murielle </label><br />
            </div>          
          </div>
        </div>
      </div>
    </section>
    <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    </div>
  )
}
