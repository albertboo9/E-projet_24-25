import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assurez-vous d'avoir axios installé : npm install axios
import Popup from 'reactjs-popup'; // Import de reactjs-popup
import 'reactjs-popup/dist/index.css'; // Import du style de reactjs-popup
import '../styles/profile.css';

export default function Profile() {
    const [userData, setUserData] = useState({
        firstName: 'Albert',
        lastName: 'Boo',
        email: 'albertboo60@gmail.com',
        mobileNumber: '659631550',
        adresse: 'Japoma',
        identifiant: '22879655',
        dateInscription: '15/01/2024',
        country: 'Cameroun'
    });

    useEffect(() => {
        // Ici, vous devriez faire une requête HTTP à votre backend pour récupérer les données de l'utilisateur
        // Remplacez l'URL par l'URL de votre endpoint backend
        axios.get('URL_VERS_VOTRE_ENDPOINT_BACKEND')
            .then(response => {
                // Mettez à jour l'état avec les données de l'utilisateur obtenues du backend
                setUserData(response.data);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données utilisateur :', error);
            });
    }, []); // Le tableau vide assure que cette requête est effectuée une seule fois après le premier rendu

    const handleChange = (e, key) => {
        const { value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [key]: value
        }));
    };

    const handleSave = () => {
        // Ajoutez ici la logique pour sauvegarder les données de l'utilisateur sur le backend
    };

    return (
        <div className="profile-container rounded bg-white mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 border-right">
                    <div className="profile-info">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Profile Settings</h4>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <label className="labels">First Name</label>
                                <Popup trigger={<input type="text" className="form-control" name="firstName" placeholder="First name" value={userData.firstName} readOnly />} modal>
                                    {close => (
                                        <div >
                                            <h2>Modifier votre prénom</h2>
                                           <div className='info'> <label className="labels">Prénom:</label>
                                            <input type="text" value={userData.firstName} onChange={e => handleChange(e, "firstName")} /></div>
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-6">
                                <label className="labels">Last Name</label>
                                <Popup trigger={<input type="text" className="form-control" name="lastName" placeholder="Last name" value={userData.lastName} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre nom de famille</h2>
                                            <label className="labels">NOM:</label>
                                            <input type="text" value={userData.lastName} onChange={e => handleChange(e, "lastName")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12">
                                <label className="labels">Email</label>
                                <Popup trigger={<input type="email" className="form-control" name="email" placeholder="Email" value={userData.email} readOnly />} modal>
                                    {close => (
                                        <div className="pop-div">
                                            <h2>Modifier votre email</h2>
                                            <label >Email:</label>
                                            <input type="email" value={userData.email} onChange={e => handleChange(e, "email")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close }>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Mobile Number</label>
                                <Popup trigger={<input type="text" className="form-control" name="mobileNumber" placeholder="Mobile number" value={userData.mobileNumber} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre numéro de mobile</h2>
                                            <label className="labels">Tel:</label>
                                            <input type="text" value={userData.mobileNumber} onChange={e => handleChange(e, "mobileNumber")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Adresse</label>
                                <Popup trigger={<input type="text" className="form-control" name="addressLine1" placeholder="Address Line 1" value={userData.adresse} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre adresse</h2>
                                            <label className="labels">Adresse</label>
                                            <input type="text" value={userData.adresse} onChange={e => handleChange(e, "addressLine1")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Identifiant</label>
                                <input type="text" className="form-control" name="Identifiant" placeholder="ID" value={userData.identifiant} readOnly />
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Postcode</label>
                                <Popup trigger={<input type="text" className="form-control" name="postcode" placeholder="Postcode" value={userData.postcode} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre code postal</h2>
                                            <label className="labels">Postcode</label>
                                            <input type="text" value={userData.postcode} onChange={e => handleChange(e, "postcode")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">State</label>
                                <Popup trigger={<input type="text" className="form-control" name="state" placeholder="State" value={userData.state} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre état</h2>
                                            <label className="labels">State</label>
                                            <input type="text" value={userData.state} onChange={e => handleChange(e, "state")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                            <div className="col-md-12">
                                <label className="labels">Country</label>
                                <Popup trigger={<input type="text" className="form-control" name="country" placeholder="Country" value={userData.country} readOnly />} modal>
                                    {close => (
                                        <div>
                                            <h2>Modifier votre pays</h2>
                                            <label className="labels">Country</label>
                                            <input type="text" value={userData.country} onChange={e => handleChange(e, "country")} />
                                            <button className="popup-btn" onClick={close}>Annuler</button>
                                            <button className="popup-btn2" onClick={handleSave && close}>Sauvegarder</button>
                                        </div>
                                    )}
                                </Popup>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
