//fichier contenant la page des depot et retrait
// !important
import "./publique/css/font-awesome.css";
import "./publique/css/all.css";
import "./publique/css/font-awesome.min.css";
import "./publique/css/general.css"

// !Autres
import "./publique/css/depot.css"
import "./publique/css/formulaire.css"
import "./publique/css/objet.css"
import logoOrange from "./image/orange.jpg"
import logoMtn from "./image/mtn.png"
import Champs from "./champs.jsx"

function Depot({children}) {
    const selectMode=(choix)=>{
      Orange.style.backgroundColor="white"
      Mtn.style.backgroundColor="white"
      choix.style.backgroundColor="gray"
  
    }
   return <> 
      <h2 align="center">{children}</h2>
      Choisir le mode <br /> <br />
      <table border="0px" cellspacing="0px" cellpadding="20px">
              <tr id="Orange" onClick={()=>selectMode(Orange)} name="type" style={{cursor:"pointer"}}>
                  <td><img src={logoOrange} class="logoPayement"></img></td>
                  <td  width="300px" ><div>Orange money</div> </td>
              </tr>
              <tr id="Mtn" onClick={()=>selectMode(Mtn)} name="type" style={{cursor:"pointer"}} >
                  <td><img src={logoMtn} class="logoPayement"></img></td>
                  <td>Mtn Mobile money</td>
              </tr>
          </table>
          <p><Champs classIcon="fas fa-user" placeholder="Entrez le montant" name="montant">Montant</Champs> </p> 
          <table border="0px" cellspacing="10px" className="placeMilieu">
            <tr>
            <td><input type="reset" className="boutton2 annuler" value="Annuler"></input></td>
            <td><input type="submit" className="boutton2 valider" value="Valider"></input></td>
            </tr>
          </table>
      </>
  }

export default Depot

