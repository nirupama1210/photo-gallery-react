import React, { Component } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';

const url='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
class NewAccount extends Component {
    constructor()
    {
        super();
        this.state={
            isDisabled:true,
            nameVal:'',
            nameError:false,
            nameErrorDisplay:'',
            passVal:'',
            passError:false,
            passErrorDisplay:'',
            emailVal:'',
            emailError:false,
            emailErrorDisplay:'',
            cpassVal:'',
            cpassError:'',
            cpassErrorDisplay:'',
            ansVal:'',
            ansError:false,
            quesVal:'',
            quesError:false,
            allError:false,
            
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

   async checkUser(user)
   {
       const response=await this.getUserData();
       for(let i=0;i<response.data.length;i++)
       {
           
           if(response.data[i].username===user.toLowerCase())
           {
            console.log(response.data[i].username)
              return false;
           }
       }
     return true;
   }
   async checkEmail(email)
{
    const response=await this.getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email.toLowerCase())
        {
            console.log(response.data[i].email)
            return false;
            
        }
    }

        return true;
}

 async   handleChange(e)
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
        nameErrorDisplay:'Please Enter Username'
      })
    } 
    else if(e.target.value.length<8)
    {
        this.setState({
            nameError:true,
            nameErrorDisplay:'Username must be 8-15 characters'
          })
    }
    else {
        let f=await this.checkUser(e.target.value);
        console.log(f)
        if(f===true)
      {this.setState({
        nameError:false,   
        nameErrorDisplay:'',  
        nameVal:e.target.value
      })
    }
    else if(f===false){
        this.setState({
            nameError:true,   
            nameErrorDisplay:'This username already exists'
           
          })
    }
    }
  }
  if(e.target.name==='pass'){
    if(e.target.value==='' || e.target.value===null ){
      this.setState({
        passError:true,
        passErrorDisplay:'Please Enter Password'
      })
    }
    else if(e.target.value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/))
    {
        this.setState({
            passError:false,     
            passErrorDisplay:'',
            passVal:e.target.value
          })
    }
     else {
        this.setState({
            passError:true,     
            passErrorDisplay:'Password must contain 1 uppercase letter,1 lowercase letter,atleast 1 number and symbol'
          })
    }

  }
  if(e.target.name==='email'){
    if(e.target.value==='' || e.target.value===null ){
      this.setState({
        emailError:true,
        emailErrorDisplay:'Please Enter Email'
      })
    }
    else if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(e.target.value))
    {
        let f=await this.checkEmail(e.target.value);
        if(f===true)
        {this.setState({
            emailError:false,     
            emailErrorDisplay:'',
            emailVal:e.target.value
          })
        }
        else if(f===false){
            this.setState({
                emailError:true,     
                emailErrorDisplay:'This email already exists',
              })
        }
    }
    
    else {
        this.setState({
            emailError:true,     
            emailErrorDisplay:'Enter valid email address'
          })
    }

  }

    if(e.target.name==="cpass")
    {
        if(e.target.value==='' || e.target.value===null ){
            this.setState({
              cpassError:true,
              cpassErrorDisplay:'Please Confirm Password'
            })
          }
          else if(e.target.value!==this.state.passVal){
            this.setState({
                cpassError:true,
                cpassErrorDisplay:'Password and Confirm Password must match'
              })
          }
          else{
            this.setState({
                cpassError:false,     
                cpassErrorDisplay:'',
                cpassVal:e.target.value
              }) 
          }
    }
    if(e.target.name==="ques")
    {
        if(e.target.value==='' || e.target.value===null ){
            this.setState({
              quesError:true,
              quesErrorDisplay:'Please select Security question'
            })
          }

          else{
            this.setState({
                quesError:false,     
                quesErrorDisplay:'',
                quesVal:e.target.value
              }) 
          }
    }
    if(e.target.name==="ans")
    {
        if(e.target.value==='' || e.target.value===null ){
            this.setState({
              ansError:true,
              ansErrorDisplay:'Please enter Answer'
            })
          }
          else{
            this.setState({
                ansError:false,     
                ansErrorDisplay:'',
                ansVal:e.target.value
              }) 
          }
    }

  

  if(this.state.nameError===false && this.state.passError===false && this.state.cpassError===false && this.state.ansError===false && this.state.emailError===false && this.state.quesError===false){
      this.setState({
        isDisabled:false
      })
   }
    }

   async validateData(e)
    {
        e.preventDefault();
        let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/albums'
        console.log(this.state)
        if(this.state.nameError===false && this.state.passError===false && this.state.cpassError===false && this.state.ansError===false && this.state.emailError===false && this.state.quesError===false){
            try{
                axios.post(url,{email:this.state.emailVal.toLowerCase(),password:this.state.passVal,username:this.state.nameVal.toLowerCase(),ques:this.state.quesVal,ans:this.state.ansVal.toLowerCase()})
                .then(res=>console.log(res))
                .catch(err=>console.log(err));
                axios.post(api2,{email:this.state.emailVal.toLowerCase(),albumname:"General",photos:[]})
                .then(res=>console.log(res))
                .catch(err=>console.log(err));
               this.setState({
                isDisabled:true,
                nameVal:'',
                nameError:false,
                nameErrorDisplay:'',
                passVal:'',
                passError:false,
                passErrorDisplay:'',
                emailVal:'',
                emailError:false,
                emailErrorDisplay:'',
                cpassVal:'',
                cpassError:'',
                cpassErrorDisplay:'',
                ansVal:'',
                ansError:false,
                quesVal:'',
                quesError:false,
                allError:true,
                
            });
            document.querySelectorAll(".tb").value="";
            }
            catch(error)
            {
                console.log(error);
            }
        }
          
    }

    render() {
        return (
            <center>
            <div className='signup'>
                
                     <p className='header'>SIGN UP</p>
                     <input type="text" className='tb' name='name' placeholder="Username" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.nameError ? <span className='errors'>{this.state.nameErrorDisplay}</span> : ''} 
                     <input type="text" className='tb' name='email' placeholder="Email" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.emailError ? <span className='errors'>{this.state.emailErrorDisplay}</span> : ''} 
                     <input type="password" className='tb' name='pass' placeholder="Password" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.passError ? <span className='errors'>{this.state.passErrorDisplay}</span> : ''} 
                     <input type="password" className='tb' name='cpass' placeholder="Confirm Password" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.cpassError ? <span className='errors'>{this.state.cpassErrorDisplay}</span> : ''} 
                     <select name="ques" className="tb"  onChange={(e)=>this.handleChange(e)}>
                     <option value=""></option>
            <option value="Your birth city">Your birth city</option>
            <option value="Your mother's name">Your mother's name</option>
            <option value="Your high school's name">Your high school's name</option>
            <option value="Your favourite book">Your favourite book</option>
        </select>
        {this.state.quesError ? <span className='errors'>Please select a Security Question</span> : ''} 
                     <input type="text" className='tb' name='ans' placeholder="Answer" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.ansError ? <span className='errors'>Please Enter Answer</span> : ''} 
                     <button className='but1' disabled={this.state.isDisabled} onClick={this.validateData}>LOGIN</button>
                     {this.state.allError ? <span className='errors'>Your Account is created</span> : ''} 

                     <Link exact to='/login' className='link2' style={{margin:"20px"}}>Sign in</Link>
                  
                 </div>
                 </center>
        );
    }
}

export default NewAccount;