import React, { useState } from 'react';
import '../styles/CreateTontine.css';
//import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';



const CreationTontineForm = () => {
  const {register, handleSubmit} = useForm();
  const [step, setStep] = useState(1);
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
  });
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
  
  
  
  
  const handleDateChange = (date, fieldName) => {
    // Vérifier si la date sélectionnée est postérieure à la date actuelle
    const currentDate = new Date();
    if (date < currentDate) {
      toast.error("cette date est déjà passé, choisissez une date correct ");
      return;
    }
  
    setSelectedDate(date);
  
    // Extraction du jour, du mois et de l'année
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
  
    // Mise à jour de l'état avec les valeurs formatées
    setTontineData((prevData) => ({
      ...prevData,
      [fieldName]: `${year}-${month}-${day}`,
    }));
  };
  

  

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmitl = (e) => {
    e.preventDefault();
    console.log('Tontine Data:', tontineData);
    // Logique pour soumettre les données de la tontine
  };

  return (
    <div className='all'>
    <div className="row" >
      <div className="col-md-6 col-md-offset-3">
        <form id="msform" onSubmit={handleSubmitl}>
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
              value={tontineData.name}
              onChange={handleChange}
              required
              { ... register("name", {required:"veuillez entrer le nom de la tontine"})}
            />
            <textarea
              name='description'
              placeholder='Description de la tontine'
              onChange={handleChange}
            />
            <DatePicker
              onChange={handleDateChange}
              value={selectedDate}
              clearIcon={null}
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
              type='text'
              name='frequency'
              placeholder='Fréquence de contribution'
              value={tontineData.frequency}
              onChange={handleChange}
            />
            <input
              type='text'
              name='contributionAmount'
              placeholder='Montant de contribution'
              value={tontineData.contributionAmount}
              onChange={handleChange}
            />
            <input
              type='text'
              name='securityAmount'
              placeholder='Montant du compte de sécurité'
              
              onChange={handleChange}
            />
            <textarea
              name='withdrawrules'
              placeholder='règles de retrait'
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
                    value={rule}
                    onChange={(e) => handleChange(e, index)}
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
              type='text'
              name='securityAmount'
              placeholder='nombre maximum de participants'
              
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
