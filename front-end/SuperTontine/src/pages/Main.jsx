import React, { useState } from 'react';
import '../styles/Main.css';
import {Link, NavLink, Outlet} from 'react-router-dom';
import 'boxicons';
import Home from '../composants/Home';


export default function Main() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isNotification, setIsnotification] = useState(false)
    const [isHome, setIsHome] = useState(true)

    const toggleHome = () =>{
        setIsHome(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if(isNotification === true){
            setIsnotification(!isNotification);
        }
    };

    const toggleNotification = () => {
        setIsnotification(!isNotification);
        if (isMenuOpen === true){
            setIsMenuOpen(!isMenuOpen);
        }
    }

    return (
        <div>
                <header className={`header ${isMenuOpen || isNotification ? 'menu-open' : ''}`}>
                    <a href="#" className="logol">
                        <img alt="" src="./assets/img/logo.png" />
                    </a>
                    <a href="#" className="logo"> SuperTontine </a>
                    <form action="" className="search-form">
                        <input type="search" name="" placeholder="search here..." id="searchBox" />
                        <box-icon name='search' size="md" color="#004aad" ></box-icon>
                        <label htmlFor="searchBox" className="fas fa-search"></label>
                    </form>
                    <div className="icons">
                        <div onClick={toggleNotification} className="fas fa-share" id="theme-btn"><box-icon type='solid'  size="md" color="#004aad" name='bell'></box-icon></div>
                        <div className="fas fa-user" id="login-btn" onClick={toggleMenu}><box-icon size="md" color="#004aad" name='menu'></box-icon></div>
                        <Link onClick={toggleHome} to="/home/profile"><div className="fas fa-bars"s id="menu-btn" ><box-icon type='solid'  size="md" color="#004aad" name='user-circle'></box-icon></div></Link>
                    </div>
                    <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
                        <NavLink  className="a" to="/home/accueil">home</NavLink>
                        <Link onClick={toggleHome}  className="a" to="/home/settings">paramètre</Link>
                        
                        <Link onClick={toggleHome} className="a" to="/home/transactions">Transactions</Link>
                        <Link onClick={toggleHome} className="a" to="/home/tontine">Tontine</Link>

                    </nav>
                    <div className={`notification ${isNotification ? 'activ' : ''}`}>
                        <h2>Notifications</h2>
                    </div>
                </header>

        <div className="corps" >
            {
                isHome ? <Home/> : <Outlet/>
            }
        </div>
    
        
        <section style={{
            backgroundColor: "#6ec0f0c0"
        }} className="contact" id="contact">
        <div className="contact-box address">
            <h3>Réseaux sociaux</h3>
            <span><box-icon type='logo' size="md" name='facebook-circle'></box-icon> SuperTontine</span>
            <span><box-icon type='logo' size="md"  name='tiktok'></box-icon> SuperTontine</span>
            <span><box-icon name='instagram' size="md"  type="logo" ></box-icon> SuperTontine </span>
            <span><box-icon name='whatsapp' size="md"  type="logo" ></box-icon> +237 695 52 32 15 </span>
            <span><box-icon name='twitter' size="md"  type="logo" ></box-icon> SuperTontine </span>
        </div>

        <div className="contact-box">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
        </div>

        <div className="contact-box address">
            <h3>Contacts</h3>
            <span><box-icon type='solid' color="#004aad" name='map'></box-icon> Douala-Cameroun</span>
            <span><box-icon type='logo' color="#004aad" name='gmail'></box-icon> SuperTontine@gmail.com</span>
            <span><box-icon name='phone' type="solid" color="#004aad"></box-icon> +237 6 55 55 55 55 </span>
        </div>
        </section>

        <div className="end-text">
        <p>© SuperTontine. All Rights Reserved.</p>
        </div>
        
        <script src="https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js"></script>
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
        <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    </div>
  )
}
