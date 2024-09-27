import  React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/Main.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login';
import './styles/login.css';
import './styles/Accueill.css'
import Accueill from './pages/Accueill';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import Main from './pages/Main';
import CreateTontine from './pages/CreateTontine';
import './styles/CreateTontine.css';
import Allparticipants from './composants/Allparticipants';
import Alltransactions from './composants/Alltransactions';
import Profile from './composants/Profile';
import Slider from './composants/slider';
import Tontine from './composants/Tontine';
import Settings from './composants/Settings';
import Tontines_Transactions from './composants/Tontines_Transactions';
import MesTontines from './composants/MesTontines';
import MesNotifications from './composants/MesNotifications';
import Retrait from './composants/retrait';
import Depot from './composants/depot';
import Home from './composants/Home';
import JoinTontine from './composants/JoinTontine';
import SlideBar from './pages/slidebar';

//------------------------------ Firebase config ----------------------------

// Importation des foncions firebase 
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// configuration de base de firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4rHcCC1YlUBHriD9wxJVundMDiwB3p5k",
  authDomain: "supertontine-a5296.firebaseapp.com",
  projectId: "supertontine-a5296",
  storageBucket: "supertontine-a5296.appspot.com",
  messagingSenderId: "219328670504",
  appId: "1:219328670504:web:e8454a73d33699219e3e1d",
  measurementId: "G-LGTCEKZR97"
};

// Initialisation de firebase 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//----------------------------------------fin config firebase -------------------

const route = createBrowserRouter([
  {
    path: "/",
    element: <Accueill/>
  },
  {
    path:"retirer",
    element: <Retrait/>
  },
  {
    path:"depot",
    element:<Depot/>
  },
  {
    path: "Join",
    element: <JoinTontine/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "home",
    element: <Main/>,
    children: [
      {
        path:"/home/settings",
        element : <Settings/>,
      },
      {
        path:"/home/slider",
        element:< Slider/>
      },
      {
        path: "/home/depots",
        element: <Depot/>
      },
      {
        path: "/home/accueil",
        element : <Home/>
      },
      {
        path: "/home/retrait",
        element : <Retrait/>
      },
      {
        path:"/home/profile",
        element: <Profile/>
      },
      {
        path:"/home/transactions",
        element: <Alltransactions/>
      },
      {
        path:"/home/MesTontines",
        element: <MesTontines/>
      },
      {
        path:"/home/notifications",
        element: <MesNotifications/>
      },
      {
        path:"/home/tontine",
        element: <Tontine/>,
        children: [
          {
            path:"/home/tontine/transactions",
            element: <Tontines_Transactions/>
          },
          {
            path:"/home/tontine/participants",
            element: <Allparticipants/>
          }
        ]
      }

    ]
  },
  {
    path: "/create",
    element: <CreateTontine/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Toaster/>
    <RouterProvider router={route} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
