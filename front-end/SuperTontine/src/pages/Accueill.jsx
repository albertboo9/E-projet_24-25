import React from 'react'
import { Link } from 'react-router-dom'

export default function Accueill() {
  return (
    <body>
        <header>
        <a href="#" className="logo">
            <img alt="" src="./assets/img/logo.png" />
        </a>
        <h1 className="logotext">SuperTontine</h1>
        <div className="bx bx-menu" id="menu-icon"></div>

        <ul className="navbar">
            <li><a href="#home" className="active">Home</a></li>
            <li><a href="#about">A Propos</a></li>
            <li><a href="#contact">Contacts</a></li>
            <li>
            <a href="#" className="cart"><i className="bx bxs-cart-download"></i></a>
            </li>
        </ul>
        </header>

        <section className="home" id="home">
        <div className="home-text">
            <h3>Bienvenue</h3>
            <h1>Sur le site de SuperTontine</h1>
            <p>
            Découvrez une nouvelle façon transparente et sécurisée de gérer vos
            tontines grâces à 
            la technologie Blockchain
            </p>
            <Link to="login" className="btn">Connexion</Link>
            <Link to="create" className="btn">Créer une tontine</Link>
        </div>

        <div className="home-img">
            <img alt="" src="./assets/img/supertontine2_no_bg.png" />
        </div>
        </section>

    
        <section className="about" id="about">  
        <section className="review" id="review">
        <div className="swiper-container review-slider" data-aos="zoom-in">
            <div className="swiper-wrapper">
            <div className="swiper-slide slide">
                <p>
                SuperTontine est une plateforme de gestion des tontines basée sur la
                technologie blockchain. La technologie blockchain garantit l'intégrité
                la sécurité et la confiance dans chaque aspect de vos tontines
                </p>
            </div>  
            <div className="swiper-slide slide">
                <h3>Créez et personnalisé vos Tontines</h3>
                <p>
                Créez vos propres Tontines selon vos besoins, definissez des
                règles personnalisées et suivez facilement les contributions
                </p>
            </div>

            <div className="swiper-slide slide">
                <h3>Transparence Totale</h3>
                <p>
                Chaque transaction est enrégistrée de manière immuable sur la
                blockchain, assurant une transparence totale et la confiance entre
                les participants
                </p>
            </div>

            <div className="swiper-slide slide">
                <h3>Historique de Transaction</h3>
                <p>
                Consultez à l'historique complet des transactions, accédez aux
                statistiques et gardez le contrôle sur vos finances
                </p>
            </div>

            <div className="swiper-slide slide">
                <h3>Simplicité de Gestion</h3>
                <p>
                simplifiez la gestion de vos tontines en automatisant les
                transactions, les payements et les notifications
                </p>
            </div>
            </div>
        </div>
        </section>
        </section>

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
  
    </body>
  )
}
