import React from "react";
import { useHistory } from "react-router-dom";
import trophy from "../assets/trophy.png";
import close from "../assets/close.png";

const WinnerPage = ()=>{
     const history = useHistory();
    
     const redirectTo = (route) => {
        history.push(route);
      };
    
return(
    <div>
        <h1><center>Congratulations</center></h1>
   <div class="float-right" style={{marginRightt:"30px"}} onClick={() => redirectTo(`/`)}>
             <img  alt="" src={close} width="30px" alt="" style={{ cursor: "pointer" }}/>    
            </div>
    <img class="rounded mx-auto d-block" alt="" height="240px" src={trophy}/>
    <div class="text-center"><h3>Mumbai Indians</h3></div>
    <div class="text-center"> <h5>Mumbai Indians wins match by 3 wickets</h5></div>
    </div>
)
}

export default WinnerPage;