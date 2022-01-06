import React, { Component } from 'react';
import axios from 'axios';
import {  Link } from 'react-router-dom';
// import { Navigate, useNavigate } from 'react-router';
// import { withRouter } from "react-router-dom";

const url='https://618fc8a0f6bf450017484a4d.mockapi.io/info';



class Login extends Component {
    constructor(props)
    {
        super(props);
        this.state={
            isDisabled:this.testRemember(),
            nameVal:this.rememberUser(),
            nameError:false,
            passVal:this.rememberPass(),
            passError:false,
            namepassError:false,
            rem:false
        };
        this.validateData = this.validateData.bind(this);
    }
    async  getUserData(){
        try{
        return axios.get(url)
        }
        catch(error){
            console.error(error);
        }
    }

   async checkEmailUser(user,email,pass)
{
    let f=0;
    let val="";
    const response=await this.getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
        if((response.data[i].email===email.toLowerCase() ||response.data[i].username===user.toLowerCase())&response.data[i].password===pass)
        {
            val=response.data[i].email;
            f=f+1;
            break;
        }
    }
    if(f===0)
    {
        return "";
    }
    else
    {
        return val;
    }
}

    handleChange(e)
    {
        const target = e.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;
  this.setState({
    [name]: value
  });
  if(e.target.name==='name'){
    if(e.target.value==='' || e.target.value===null ){
      this.setState({
        nameError:true,
        nameVal:''
      })
    } else {
      this.setState({
        nameError:false,     
        nameVal:e.target.value
      })
    }
  }
  if(e.target.name==='pass'){
    if(e.target.value==='' || e.target.value===null ){
      this.setState({
        passError:true,
        passVal:''
      })
    } else {
      this.setState({
        passError:false,     
        passVal:e.target.value
      })
    }
  }

  if(this.state.nameError===false && this.state.passError===false){
      this.setState({
        isDisabled:false
      })
   }
    }

   async validateData(e)
    {
        e.preventDefault();
        console.log(this.state)
          if(this.state.nameError===false && this.state.passError===false){
                let st="";
                st=await this.checkEmailUser(this.state.nameVal,this.state.nameVal,this.state.passVal);
                console.log(st)
                if(st!=="")
                {
                    if(this.state.rem)
                    {
                        localStorage.setItem("User",this.state.nameVal+" "+this.state.passVal);
                    } 
                    sessionStorage.setItem("Email",st);
              window.open('/#/album','_self')
                }
                else{
                    this.setState({
                        namepassError:true
                      })
                }  
        }
          
    }
    testRemember()
    {
      if(localStorage.getItem('User'))
      {
          return false;
      }
      return true;
    }
    rememberUser()
    {
      if(localStorage.getItem('User'))
      {
        let arr=localStorage.getItem('User').split(' ');
        return arr[0]
      }
      return ''
    }
    rememberPass()
    {
      if(localStorage.getItem('User'))
      {
        let arr=localStorage.getItem('User').split(' ');
        return arr[1]
      }
      return ''
    }

    render() {
        return (
            <center>
            <div className='signup'>
                
                     <p className='header'>SIGN IN</p>
                     <input type="text" className='tb' id='name' value={this.state.nameVal} name='name' placeholder="Username" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.nameError ? <span className='errors'>Please Enter Name</span> : ''} 
               
                     <input type="password" className='tb' id='pass' name='pass' value={this.state.passVal} placeholder="Password" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.passError ? <span className='errors'>Please Enter Password</span> : ''} 
                     <div id='remember'>
                    <input type="checkbox" name="rem" onChange={(e)=>this.handleChange(e)}  /> <p>Remember Me</p>
                     </div>
                     <button className='but1' disabled={this.state.isDisabled} onClick={this.validateData}>LOGIN</button>
                     {this.state.namepassError ? <span className='errors'>Username or Password is incorrect</span> : ''} 
                     <div className='myLinks'>
                     <Link exact to='/forgot' className='link'>Forgot Password</Link>
                     <Link exact to='/account' className='link'>Create Account</Link>
                     </div>
                 </div>
                 </center>
        );
    }
}

export default Login;