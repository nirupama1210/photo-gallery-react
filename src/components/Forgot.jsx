import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {CopyToClipboard} from "react-copy-to-clipboard"
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from "@material-ui/core/styles";
// import styled from "styled-components";


const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: "#FE4949",
    color: "white",
    boxShadow: theme.shadows[1],
    fontSize: 15
  },
  arrow: {
    color: "#FE4949"
  }
}))(Tooltip);

const url='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
class Forgot extends Component {
    constructor()
    {
        super();
        this.state={
            isDisabled:true,
            nameVal:'',
            nameError:false,
            nameErrorDisplay:'',
            ansVal:'',
            ansError:false,
            quesVal:'',
            quesError:false,
            allError:false,
            allErrorVal:'',
            passError:false,
            passVal:'',
            flg:true,
            isHover:true
            
        };
        this.validateData = this.validateData.bind(this);
    }
   setFlg(bval)
   {
     this.setState({flg:bval})
     
   }
   setIsHover(bval)
   {
     this.setState({isHover:bval})
   }
    async  getUserData(){
        try{
        return axios.get(url)
        }
        catch(error){
            console.error(error);
        }
    }

   async checkEmailUser(ans,email,ques)
{
    let f=0;
    let val="";
    const response=await this.getUserData();
    for(let i=0;i<response.data.length;i++)
    {
        
         if((response.data[i].email===email.toLowerCase() ||response.data[i].username===email.toLowerCase())&&(response.data[i].ques===ques && response.data[i].ans===ans.toLowerCase()))
        {
            val=response.data[i].password;
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
        nameErrorDisplay:'Please Enter Username or Email'
      })
    } 

    else {
        this.setState({
        nameError:false,   
        nameErrorDisplay:'',  
        nameVal:e.target.value
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


  if(this.state.nameError===false && this.state.quesError===false && this.state.ansError===false){
      this.setState({
        isDisabled:false
      })
   }
    }

   async validateData(e)
    {
        e.preventDefault();
        console.log(this.state)
        if(this.state.nameError===false && this.state.quesError===false && this.state.ansError===false){
            let st="";
            st=await this.checkEmailUser(this.state.ansVal,this.state.nameVal,this.state.quesVal);
            console.log(st)
            if(st!=="")
            {
               this.setState({
                   passVal:st,
                   passError:true,
                   allError:false
               })
            }
            else{
                this.setState({
                    allErrorVal:'Username or Security question or answer is incorrect',
                    allError:true,
                    passError:false
                  })
            }  
        }
          
    }

    render() {
        return (
            <center>
            <div className='signup'>
                
                     <p className='header'>FORGOT PASSWORD</p>
                     <input type="text" className='tb' name='name' placeholder="Username" onChange={(e)=>this.handleChange(e)}/>
                     {this.state.nameError ? <span className='errors'>{this.state.nameErrorDisplay}</span> : ''} 
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
                     <button className='but1' disabled={this.state.isDisabled} onClick={this.validateData}>Generate Password</button>
                     {this.state.allError ? <span className='errors'>{this.state.allErrorVal}</span> : ''} 
      
                     {this.state.passError ? <><span className='passwords'>{this.state.passVal}

                     <CopyToClipboard text={this.state.passVal}>
                     <LightTooltip

        interactive
        title="Copied"
        open={!this.state.flg && this.state.isHover}
      >
                      <button onClick={() => this.setFlg(!this.state.flg)}
          onMouseOver={() => this.setIsHover(true)}
          onMouseLeave={() => {this.setIsHover(false)
            this.setFlg(true)
          }} className='copy'>Copy</button>
                      </LightTooltip>
                     </CopyToClipboard>
                     
                     </span>
                     </> : ''} 
                     
                  
                     <Link exact to='/login' className='link2' style={{margin:"20px"}}>Sign in</Link>
                  
                 </div>
                 </center>
        );
    }
}

export default Forgot;