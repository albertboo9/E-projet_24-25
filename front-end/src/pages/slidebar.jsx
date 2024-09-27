import 'boxicons'
import '../boxicons-master/css/boxicons.css'
import '../styles/slidebar.css'
import "../styles/general.css"
import userp from './user.jpg'
import Notification from '../composants/notification'
import toast from 'react-hot-toast'
import {React, useState } from "react";
import logo from './logo2.png';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom'
import 
{getAuth, 
    signOut,
       signInWithRedirect, 
          GoogleAuthProvider, 
             onAuthStateChanged, 
                createUserWithEmailAndPassword } 
    from 'firebase/auth'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4rHcCC1YlUBHriD9wxJVundMDiwB3p5k",
  authDomain: "supertontine-a5296.firebaseapp.com",
  projectId: "supertontine-a5296",
  storageBucket: "supertontine-a5296.appspot.com",
  messagingSenderId: "219328670504",
  appId: "1:219328670504:web:e8454a73d33699219e3e1d",
  measurementId: "G-LGTCEKZR97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)

function Onglet({classIcon,text,view,children,icoView}){
    const [survol,setSurvol]=useState("none")
    const isSurvol=(a)=>{
      if (view=== false) {
        setSurvol(a)
      } else {
        setSurvol("none")
      }
      
    }
    return (
    <div className="nav-list"> 
      <span style={{display:icoView}}>
        <div className= "slide-icon" onMouseEnter={()=>isSurvol("block")} onMouseOut={()=>isSurvol("none")} >
          <div className={classIcon} 
                onMouseEnter={()=>isSurvol("block")}
                onMouseOut={()=>isSurvol("none")}
                style={{
                  position:"relative",
                  top:"50%",
                  transform:"translateY(-50%)"
                }}  
          > 
          </div>
        </div>
      </span >
      <span ><div className="text-onglet">{view===true ? children : ""}</div></span >
      <div className="slide-boxHidden" style={{display: survol}}> <div className="text-onglet">{text}</div></div> 
    </div>
    );
  }
  function SlideBar() {
    const navigate = useNavigate();
    const notifications = [
      {
        id: 1,
        sender: 'Albert',
        message: 'albert veut rejoindre la tontine makepe',
        link: '#',
        linkText: '404 Error Room',
        avatar: {userp},
        isRead: false,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead: false,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead: false,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead: false,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead: true,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead:true,
      },
      {
        id: 1,
        sender: 'Tene',
        message: 'added your Pen to their Collection',
        link: '#',
        linkText: '404 Error Room',
        avatar: 'https://i.pravatar.cc/40?img=8',
        isRead:true,
      },
      // ... other notifications
    ];
    onAuthStateChanged(auth, (user)=>{
        if(!user){
          navigate("/login");
        }
      })
      const mail = sessionStorage.getItem("mail")
        //se déconnecter
  const logout = () => {
    signOut(auth).then(()=>{
      toast("Vous êtes déconnecté.e")
    }).catch((err)=>{
      console.log(err.message)
      sessionStorage.removeItem("user");
    })
  }

    const [size,setSize]=useState("slidebar-small")
    const [viewLogo,setViewLogo]=useState("none")
    const [visible,setVisble]=useState(false)
    const [classIco,setClassIco]=useState("menu")
    const changeSize =()=>{
      if (size === "slidebar-small") {
        setSize("slidebar-large")
        setVisble(true)
        setViewLogo("block")
        setClassIco("none")
      } else {
        setSize("slidebar-small")
        setVisble(false)
        setViewLogo("none")
        setClassIco("menu")
      }
    }
  
    return (
        <>
        <div className={size} id="side-bar">
           <p align="center"> <div onClick={changeSize} id="chevron"><box-icon  size="ms" color="white" name={classIco}></box-icon></div></p> 
            <div style={{display:viewLogo}}>
                <div className='side-top'> 
               <img src={logo} alt="logo" className="logo"/>
                { /* <td><Onglet classIcon="" text="" view={visible} icoView="none"></Onglet></td>*/}
               <div onClick={changeSize} id="chevron"><box-icon color="white" name='menu-alt-right'></box-icon></div>
               </div> 
               <div className='name-login'>
                  <p className='user-mail'>User: {mail}</p>
                </div>
            </div>
            <div className='hid'>
              <Onglet classIcon="bx bx-home" text="accueil" view={visible} >accueil</Onglet>

              <Onglet classIcon="bx bx-bell" text="notifications" view={visible}>notifications</Onglet>
              <Onglet classIcon="bx bx-grid-alt" text="tontines" view={visible}>Mes tontines</Onglet>
              <Onglet classIcon="bx bx-wallet" text="solde" view={visible}>Mon solde</Onglet> 
              <Onglet classIcon="bx bx-transfer-alt" text="transactions" view={visible}>Transactions</Onglet> 
              <Onglet classIcon="bx bx-cog" text="paramètres" view={visible}>parametre</Onglet>
              <Onglet classIcon="bx bx-plus" text="creer" view={visible}> creer une tontine</Onglet>
              <Onglet classIcon="bx bx-globe" text="rejoindre" view={visible}> rejoindre une tontine</Onglet>
              <div onClick={logout} className="end">
                <Onglet  classIcon="bx bx-door-open" text="deconnexion" view={visible}>Deconnexion</Onglet>
              </div>
            </div>
        </div>
        <div className='center-side'>
          <div className='center-top'>
            <div className='search'> </div>
          <Notification count={notifications.filter((n) => !n.isRead).length} notifications={notifications} />
          </div>
          <div className='center-center'>
            <Outlet/>
          </div>
        
        </div>
        </>
    );
  }

export default SlideBar