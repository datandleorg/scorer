import React, { useState,useContext } from "react";
import Auth from "../context/auth-context";
import axios from "axios";

const Login = (props) => {
  const context = useContext(Auth);

  const [login, setLogin] = useState({});
  const [isLogin, setIsLogin] = useState(true);
  const handleForm = (value, key) => {
    setLogin({ ...login, [key]: value });
    console.log(login);
  };
  const switchModeHandler = () => {
    setIsLogin(!isLogin);
  };
  const submitHandler=(e)=>{
      console.log(isLogin);
    e.preventDefault();
      const email = login.email;
      const password = login.password;
      if(isLogin){
      axios({url:"http://localhost:8000/graphql",
            method:'post',
            headers: {
              'Content-Type': 'application/json'
            },
            data:{
                query:`query LogIn($email:String!,$password:String!){
                login(email:$email,password:$password){
                    token
                    userId
                    tokenExpiration
                }
            }`,
                variables:{
                    email:email,
                    password:password
                },
            }
    }).then(res=>{
        console.log(res.data.data);
        context.login(
          res.data.data.login.token,
          res.data.data.login.userId,
          res.data.data.login.tokenExpiration
        );
    }).catch(err=>{console.log(err)})
    }else{
        axios({url:"http://localhost:8000/graphql",
            method:'post',
            data:{
                query:`mutation CreateUser($email:String!,$password:String!){
                    createUser(userInput:{email:$email,password:$password}){
                        _id
                        email
                    }
                }`,
                variables:{
                    email:email,
                    password:password
                },
            }
    }).then(res=>{
        console.log(res);
    }).catch(err=>{console.log(err)})
    }

}
  return (
      <div>
    <div className="p-2 h5 text-secondary border-bottom d-flex align-items-center justify-content-between">
    <div>Login</div>
    </div>
    <form
      className = "text-secondary" onSubmit={submitHandler}
    >
      <div class="form-group">
        <label>E-mail</label>
        <input
          class="form-control"
          name="email"
          value={login.email}
          onChange={(e) => handleForm(e.target.value, e.target.name)}
        />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          class="form-control"
          name="password"
          value={login.password}
          onChange={(e) => handleForm(e.target.value, e.target.name)}
        />
      </div>
      <div className="form-actions mt-2">
        <button class="btn btn-md btn-primary w-30" type="submit">Submit</button>
        <button class="btn btn-md btn-primary w-30 ml-3" type="button" onClick={switchModeHandler}>
          Switch to {isLogin ? "Signup" : "Login"}
        </button>
      </div>
    </form>
    </div>
  );
};

export default Login;
