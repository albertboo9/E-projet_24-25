import React, { useState, useEffect } from 'react';
import '../styles/CreateTontine.css';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import {getAuth, signOut,signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, createUserWithEmailAndPassword } from 'firebase/auth'
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



const CreationTontineForm = () => {
  const {register, handleSubmit} = useForm();
  const [step, setStep] = useState(1);
  
  const [startDate, setStartDate] = useState(new Date());
  const [tontineData, setTontineData] = useState({
    name: '',
    description: '',
    startDate: '',
    frequency: '',
    contributionAmount: '',
    maxParticipants: '',
    withdrawalRulesArray: ['', ''],
    maturityDate: new Date(),
    SecurityAmount: '',
    adminId: '',
  });

  const navigate = useNavigate();
  onAuthStateChanged(auth, (user)=>{
    if(!user){
      navigate("/login")
    }
  })

  const onSubmit = (data) =>{
    axios.post("http://localhost:3001/Tontines", data).then((res)=>{
        toast.success("Tontine créer avec succès");
    }).catch((err)=>{
      console.log(err);
      toast.error("Une erreur est survenu lors de la création de votre ")
    })
  }

  
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    
    if (name === 'withdrawalRulesArray') {
      // Si le champ modifié est lié aux règles de retrait
      const rules = [...tontineData.withdrawalRulesArray];
      rules[index] = value;

      setTontineData((prevData) => ({
        ...prevData,
        withdrawalRulesArray: rules,
      }));
    } else {
      // Pour les autres champs
      setTontineData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const addRuleField = () => {
    setTontineData((prevData) => ({
      ...prevData,
      withdrawalRulesArray: [...prevData.withdrawalRulesArray, ''], // Ajouter un champ vide
    }));
  };

  const removeRuleField = (index) => {
    const rules = tontineData.withdrawalRulesArray.filter((_, i) => i !== index);
    setTontineData((prevData) => ({
      ...prevData,
      withdrawalRulesArray: rules,
    }));
  };
  
  
  
  
  const handleDateChange = (date) => {
    setSelectedDate(date);
  
    // Extraction du jour, du mois et de l'année
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Mise à jour de l'état avec les valeurs formatées
    setTontineData((prevData) => ({
      ...prevData,
      startDate: `${year}-${month}-${day}`, // Mettez à jour directement la date de début
    }));
  };
  
  

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };



  return (
    <div className='all'>
    <div className="row" >
      <div className="col-md-6 col-md-offset-3">
        <form id="msform" onSubmit={handleSubmit(onSubmit)}>
          <ul id="progressbar">
            <li className={step >= 1 ? 'active' : ''}>Informations de base</li>
            <li className={step >= 2 ? 'active' : ''}>configuration de la tontine</li>
            <li className={step >= 3 ? 'active' : ''}>finalisation</li>
            <li className={step === 4 ? 'active' : ''}>Félicitations</li>
          </ul>

          <fieldset className={step === 1 ? 'active' : ''}>
            <img src="./assets/img/supertontine2_no_bg.png" className="logoj" alt="logo"></img>
            <h2 className='fs-title'>INFORMATION DE BASE</h2>
            <input
              type="text"
              name="name"
              placeholder='Nom de la tontine'

              onChange={handleChange}
              required
              { ... register("name", {required:"veuillez entrer le nom de la tontine"})}
            />
            <textarea
              name='description'
              placeholder='Description de la tontine'
              onChange={handleChange}
              {... register("description")}
            />
            <input
             type='date'  
              required
              { ...register("DateDebut")}
  
            />

            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={nextStep}
            />
          </fieldset>

          <fieldset className={step === 2 ? 'active' : ''}>
            <img src="./assets/img/supertontine2_no_bg.png" className="logoj" alt="logo"></img>
            <h2 className='fs-title'> configuration de la tontine</h2>
            <input
              type='number'
              name='frequency'
              placeholder='Fréquence de contribution'
             
              onChange={handleChange}
              {... register("frequency")}
            />
            <input
              type='number'
              name='contributionAmount'
              placeholder='Montant de contribution'
            
              onChange={handleChange}
              {... register("contributionAmount")}
            />
            <input
              type='number'
              name='securityAmount'
              placeholder='Montant du compte de sécurité'
              {... register("securityAmount")}
              onChange={handleChange}
            />

            <input
              type="button"
              name="previous"
              className="previous action-button-previous"
              value="Previous"
              onClick={prevStep}
            />
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={nextStep}
            />
          </fieldset>

          <fieldset className={step === 3 ? 'active' : ''}>
            <img src="./assets/img/supertontine2_no_bg.png" className="logoj" alt="logo"></img>
            <h2 className='fs-title'>FINALISATION</h2>
            <div className="withdrawal-rules">
              <h3>Règles de la tontine</h3>
              {tontineData.withdrawalRulesArray.map((rule, index) => (
                <div key={index } className="rule-field">
                  <textarea
                    type="text"
                    name="withdrawalRulesArray"
                    placeholder={`Règle ${index + 1}`}
                   
                    onChange={(e) => handleChange(e, index)}
                    {... register("withdrawalrulesArray")}
                  />
                  <button type="button" onClick={() => removeRuleField(index)}>
                    Supprimer
                  </button>
                </div>
              ))}

              <button type="button" className=" button" onClick={addRuleField}>
                Ajouter une règle
              </button>
            </div>
            <input
              type='number'
              name='participants'
              placeholder='nombre maximum de participants'
              {... register("participants")}
              onChange={handleChange}
            />

            <input
              type="button"
              name="previous"
              className="previous action-button-previous"
              value="Previous"
              onClick={prevStep}
            />
            <input
              type="submit"
              name="create"
              className="next action-button"
              value="Créer"
              onClick={nextStep}
            />
          </fieldset>

          <fieldset className={step === 4 ? 'active' : ''}>
            <img src="./assets/img/supertontine2_no_bg.png" className="logoj" alt="logo"></img>
            <h2 className="fs-title"> Félicitations !</h2>
            <p>vous venez de créer avec succès votre tontine</p>

            <NavLink to="/home" className="btn">home</NavLink>
          </fieldset>
        </form>
      </div>
    </div>
    </div>
  
  );
};

export default CreationTontineForm;
