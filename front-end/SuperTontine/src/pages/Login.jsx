  import React, {useState} from 'react';
  import {useForm} from 'react-hook-form';
  import '../styles/login.css';
  import {toast} from 'react-hot-toast';
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom';
  import { Link } from 'react-router-dom';
  

  
  function Login()
  {
    const navigate = useNavigate();
    const [isSignUpClicked, setSignUpClicked] = useState(false);
    const handleSignUpClick = () => {
      setSignUpClicked(true);
    };

    const handleLoginClick = () => {
      setSignUpClicked(false);
    };

    const {register, handleSubmit} = useForm();

    const onSubmitl=data => {
      axios.get(`http://localhost:3000/Utilisateur?email=${data.emaill}&password=${data.passwordl}`).then((res)=>{
        if(res.data.length > 0){
          toast.success("Connexion réussite");
          navigate("home");
          console.log(data);
        }
        else{
          toast.error("les identifiants sont incorrects");
        }
      })
    }
    
    const onSubmit = data => {
      if(data.password !== data.confirmedpassword){
        toast.error("Les mots de passe ne correspondent pas");
      }
      else{
        axios.get(`http://localhost:3000/Utilisateur?email=${data.email}`).then((res)=>{
          if(res.data.length >0){
            toast.error("Un compte existe déjà avec cette adresse email");
          }
          else{
            axios
            .post("http://localhost:3000/Utilisateur", data)
            .then((res) =>{
             console.log(res);
             toast.success("inscription réussite");  
             setSignUpClicked(false);
             console.log(data);
            })
            .catch((err) =>{
              console.log(err);
              toast.error("Une erreur est survenue lors de l'inscription");
            }
            ) 
          }
        });
        
      }
    };


    return (
          <div>
            <section className="user">
              <div className="user_options-container">
                <div className="user_options-text">
                  <div className="user_options-unregistered">
                    <h2 className="user_unregistered-title"> Vous n'avez pas encore un compte SuperTontine? </h2>
                    <p className="user_unregistered-text">Créez-en un ici</p>
                    <button className="user_unregistered-signup" id="signup-button" onClick={handleSignUpClick}>
                      Sign up
                    </button>
                    <br /><br />
              
                  
                  </div>

                  <div className="user_options-registered">
                    <h2 className="user_registered-title">Vous avez déjà un compte SuperTontine ?</h2>
                    <p className="user_registered-text">Connectez vous ici</p>
                    <button className="user_registered-login" id="login-button" onClick={handleLoginClick}>Login</button>
                  </div>
                </div>

                <div className={`user_options-forms ${isSignUpClicked ? 'bounceLeft' : 'bounceRight'}`} id="user_options-forms">
                <img src="./assets/img/supertontine2_no_bg.png" className="logo"  alt="logo"></img>
                  <div className="user_forms-login">
                    <h2 className="forms_title">Login</h2>

                    <form className="forms_form" onSubmit={handleSubmit(onSubmitl)}>
                      <fieldset className="forms_fieldset">
                        <div className="forms_field">
                          <input
                            type="email"
                            placeholder="Email"
                            className="forms_field-input"
                            {...register("emaill")}
                            required
                            autoFocus
                          />
                        </div>
                        <div className="forms_field">
                          <input
                            type="password"
                            placeholder="Password"
                            className="forms_field-input"
                            {...register("passwordl")}
                            required
                          />
                        </div>
                      </fieldset>
                      <div className="forms_buttons">
                        <a href='#'>
                          <button type="button" className="forms_buttons-forgot">
                            mot de passe oublié
                          </button>
                        </a>
                        <input type="submit" value="Log in" className="forms_buttons-action" />
                      </div>
                    </form>
                  </div>
                  <div className="user_forms-signup">
                    <h2 className="forms_title">Sign Up</h2>
                    <form className="forms_form" onSubmit={handleSubmit(onSubmit)}>
                      <fieldset className="forms_fieldset">
                        <div className="forms_field">
                          <input
                            type="text"
                            placeholder="Full Name"
                            className="forms_field-input"
                            required
                            {...register("fullname", {required: "veuillez entrer un nom", minLength: {value : 2, message:"veuillez un nom de plus de 2 caractères"}})}
                          />
                        </div>
                        <div className="forms_field">
                          <input
                            type="email"
                            placeholder="Email"
                            {...register("email", {required:"veuillez entrer votre email "})}
                            className="forms_field-input"
                            required
                          />
                        </div>
                        <div className="forms_field">
                          <input
                            type="password"
                            placeholder="Password"
                          
                            className="forms_field-input"
                            required
                            {...register("password", {required:" veuillez un mot de passe", minLength:{value: 8, message:"veuillez saisir un mot de passe d'aumoins 8 caractères"}})}
                          />
                        </div>
                        <div className="forms_field">
                          <input
                            type="password"
                            placeholder="confirmed password"
                            {...register("confirmedpassword", {required:" veuillez confirmez votre mot de passe"})}
                            className="forms_field-input"
                            required
                          />
                        </div>
                      </fieldset>
                      <div className="forms_buttons">
                        <input type="submit" value="Sign up" className="forms_buttons-action" />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
    );
  };

  export default Login;
 