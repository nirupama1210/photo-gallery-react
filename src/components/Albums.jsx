import React, { Component } from 'react';
import './album.css'
import '../index.css'
import { motion } from "framer-motion";
import axios from 'axios';
// import { AnimatePresence } from "framer-motion";
import {Link} from 'react-router-dom';
import noimage from './no-images.png'
import arrow from './arrow.svg'
import AddAlbum from './AddAlbum'
import EditAlbumName from './EditAlbumName';
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

let api='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/albums';

const icon = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      fill: "rgb(254, 73, 73, 0)"
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      fill: "rgb(254, 73, 73, 1)"
    }
  };

class Albums extends Component {
    constructor()
    {
        super()
        this.state={
            email:sessionStorage.getItem("Email"),
            data:[],
            popup:false,
            epopup:false,
            albumname:'',
            albumerror:false,
            albumcreated:false,
            oldname:'',
            newname:'',
            selectid:'',
           error:'',
           editerror:false,
           editVal:''
        }
        if(!sessionStorage.getItem("Email"))
        {
            window.open('/photo-gallery-react','_self')
        }
        //this.checkEmailUser= this.checkEmailUser.bind(this);
    }
    async getUserData(){
        try{
        return axios.get(api2)
        }
        catch(error){
            console.error(error);
        }
    }
    async checkEmailUser()
{

    const response=await this.getUserData();
    let x=0;
    let val=[];
    if(this.state.email!==null)
    {for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===this.state.email)
        {
           
           val[x]=
           {
                id:response.data[i].id,
               name: response.data[i].albumname,
               photo: response.data[i].photos
           }
           x=x+1;
            
        }
    }
    this.setState({
        
        data:val
    })
    // console.log(this.state);
}
}


componentDidMount()
{
    this.checkEmailUser();
}

async handleChange(e)
{
    // console.log(e.target.value)
    if(e.target.value==="")
    {
        this.checkEmailUser();
    }
    else{
        const response=await this.getUserData();
        let x=0;
        let val=[];
        if(this.state.email!==null)
        {
        for(let i=0;i<response.data.length;i++)
        {
            
            if(response.data[i].email===this.state.email)
            {
               val[x]=
               {
                id:response.data[i].id,
                   name: response.data[i].albumname,
                   photo: response.data[i].photos
               }
               x=x+1;
                
            }
        }
        this.setState({
        
            data:val
        })
        const searchedItems = this.state.data.filter((item)=>
           // console.log(item.name.toLowerCase().includes(e.target.value.toLowerCase()))
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
        // console.log(searchedItems)
        this.setState({data:searchedItems});
    }
    }
}

toggle(e)
{
    const val=this.state.popup;
    this.setState({popup:!val});
    if(this.state.popup===false)
    {
        this.setState({albumcreated:false})
    }
}
editPopUp(id,name)
{
    const val=this.state.epopup;
    this.setState({epopup:!val,oldname:name,selectid:id});
}
setAlbum(e)
{
    // console.log(e.target.value);
    if(e.target.value!=="")
    {
        this.setState({albumname:e.target.value,albumerror:false})
    }
}
setNewAlbum(e)
{
    this.setState({newname:e.target.value})
}
async deleteAlbum(name,id)
{
    // console.log(id)
    try{
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+id;
        axios.delete(api3)
        .then(res=>{
            console.log(res)
            this.checkEmailUser();
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
    }
}
async editMyAlbum(e)
{
    let statename='';
    let selectid=this.state.selectid;
    if(this.state.newname==='')
    {
        statename=this.state.oldname;
    }
    else{
        statename=this.state.newname;
    }
    const response=await this.getUserData();
    let x=0;
    if(this.state.email!==null)
    {
    for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===this.state.email && response.data[i].albumname.toLowerCase()===statename.toLowerCase() && response.data[i].id!==this.state.selectid)
        {
           
           x=x+1;
            
        }
    }
    if(x>0)
    {
        this.setState({editerror:true,editVal:'This Album Name already exists'})
    }
    else{
        this.setState({editerror:false,editVal:''})
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+this.state.selectid;
    let data={
        "email":this.state.email,
        "albumname":statename,
        "photos":this.state.data.photo

    }

try{
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
            this.checkEmailUser();
            this.editPopUp(selectid,statename)
        })
        .catch(err=>console.log(err));
        
    }
     
        

    catch(error)
    {
        console.log(error);
    }
    }
}

}
async addMyAlbum(e)
{
    if(this.state.albumname==='')
    {
        this.setState({albumerror:true,error:'Enter Album Name'})
    }
    else{
        const response=await this.getUserData();
        let x=0;
        if(this.state.email!==null)
        {
        for(let i=0;i<response.data.length;i++)
        {
            
            if(response.data[i].email===this.state.email && response.data[i].albumname.toLowerCase()===this.state.albumname.toLowerCase() )
            {
               
               x=x+1;
                
            }
        }
        if(x>0)
        {
            this.setState({albumerror:true,error:'This Album already exists'})
        }
        else{
        try{
            axios.post(api2,{email:this.state.email,albumname:this.state.albumname.toLowerCase(),photos:[]})
            .then(res=>{
                console.log(res)
                
                this.checkEmailUser();
                this.setState({albumcreated:true})
            })
            .catch(err=>console.log(err));

           
            
        }
        catch(error)
        {
            console.log(error);
        }
    }
    }
    }
}

capitalize(str)
{
    const arr = str.split(" ");
for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

}
const str2 = arr.join(" ");
return str2
}
down()
{
    document.getElementById("myDropdown").classList.toggle("show");
}
signOut()
{
    if(localStorage.getItem('User'))
    {
    localStorage.removeItem('User');
    }
    if(sessionStorage.getItem('Email'))
    {
    sessionStorage.removeItem('Email')
    }
    window.open('/photo-gallery-react','_self')
}

render() {
        return (
            <div>
                <div className='header2'>
                    <div className='logo-full'>
                    <motion.h4
 initial={{opacity: 0}}
 animate={{opacity: 1}}
 transition={{duration: 1}}
 className='app-title2'
 >
     Pro Photos
 </motion.h4>
                    <div className='logo'>

                    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="logo-display"
    >
      <motion.path
        d="M448,96h-64V64c0-35.344-28.656-64-64-64H192c-35.344,0-64,28.656-64,64v32H64c-35.344,0-64,28.656-64,64v288
        c0,35.344,28.656,64,64,64h384c35.344,0,64-28.656,64-64V160C512,124.656,483.344,96,448,96z M64,192c-17.672,0-32-14.313-32-32
        s14.328-32,32-32s32,14.313,32,32S81.672,192,64,192z M256,448c-70.688,0-128-57.313-128-128s57.313-128,128-128s128,57.313,128,128
        S326.688,448,256,448z M448,192c-17.688,0-32-14.313-32-32s14.313-32,32-32s32,14.313,32,32S465.688,192,448,192z"
        variants={icon}
        initial="hidden"
        animate="visible"
        transition={{
          default: { duration: 2, ease: "easeInOut" },
          fill: { duration: 2, ease: [1, 0, 0.8, 1] }
        }}
      />
    </motion.svg>

                    </div>
                    </div>
                    <div>
                        <input type="text" className='tb2' placeholder='Search' onChange={(e)=>this.handleChange(e)} />
                    </div>
                    <div className='dropdown'>
                        <img src={arrow} alt="dropdown" onClick={this.down} className='dropbtn arrow'/>
                        <div id='myDropdown' className='dropdown-content'>
                            <Link to='/album' className='but3'>Albums</Link>
                            <Link to='/allphotos' className='but3' state={{details: {email:this.state.email}}}>All Photos</Link>
                        </div>

                    </div>
                    <div>
                        <button className='but2' onClick={this.signOut}>Sign Out</button>
                    </div>
                </div>
                <div className='album-content'>

             
                    {
                        
                        this.state.data.map((val)=>{
                            return (
                                <center>
                               <motion.div key={val.name} className='items'  
                               layout 
                               whileHover={{opacity: 1}}
                               >
                                    
                                    {val.photo.length===0?<Link exact to='/photos' state={{details: {email:this.state.email,id:val.id, albumname:val.name,photo:val.photo}}}>
                                        
                                <motion.img  src={noimage} alt='noimage' className='album-img' 
                                initial={{opacity:0}}
                                    animate={{opacity:0.8}}
                                    transition={{delay:1}}
                                    />
                                </Link>:<Link exact to='/photos' state={{details: {email:this.state.email,id:val.id, albumname:val.name,photo:val.photo}}}>
                                    <motion.img src={val.photo[0]} alt='img' className='album-img' 
                                    initial={{opacity:0}}
                                    animate={{opacity:0.8}}
                                    transition={{delay:1}}
                                    />
                                    </Link>}
                                   <center>
                                       { val.name!=="General"?<p className='item-title'>{this.capitalize(val.name)}
                                       <LightTooltip arrow interactive 
                                        PopperProps={{
                                          modifiers:{
                                            offset: {
                                              enabled: true,
                                              offset: '0px, -5px',
                                            },
                                          },
                                        }}
                                        title="Edit Album Name">
                                       <button onClick={()=>this.editPopUp(val.id,val.name)} className='editAlbum'>edit</button>
                                       </LightTooltip>
                                       </p>
                                       :<p className='item-title'>{this.capitalize(val.name)}</p>
                                       }</center>
                                   <div className='book-shelf-changer'>  {
                                       
                                        val.name!=="General"?
                                        <LightTooltip arrow interactive 
                                        PopperProps={{
                                          modifiers:{
                                            offset: {
                                              enabled: true,
                                              offset: '0px, -5px',
                                            },
                                          },
                                        }}
                                        title="Delete Album">
                                        <button onClick={()=>this.deleteAlbum(val.name,val.id)}>Delete</button>
                                        </LightTooltip>
                                        :''
                                      
                                    }  </div>
                                </motion.div>
                                </center>
                               
                            )
                        })
                    }
                   
                </div>
               <div className='open-search'>
               <LightTooltip arrow interactive 
                                        PopperProps={{
                                          modifiers:{
                                            offset: {
                                              enabled: true,
                                              offset: '-20px, -5px',
                                            },
                                          },
                                        }}
                                        title="Create New Album">
                   <button className='add'  onClick={(e) => this.toggle(e)}>+</button>
                   </LightTooltip>
               </div>

                <AddAlbum trigger={this.state.popup} setTrigger={(e)=>this.toggle(e)} addNewAlbum={(e)=>this.addMyAlbum(e)}>
               <input type="text" placeholder='Album Name' className='tb02' onChange={(e)=>this.setAlbum(e)}/>
               {this.state.albumerror?<span className='errors spantag'>{this.state.error}</span>:''}
               {this.state.albumcreated?<span className='errors spantag'>New Album Created</span>:''}
               </AddAlbum>


               <EditAlbumName trigger={this.state.epopup} setTrigger={(e)=>this.editPopUp()} updateAlbum={(e)=>this.editMyAlbum(e)}>
                    <input type="text" className='tb02' placeholder={this.state.oldname} onChange={(e)=>this.setNewAlbum(e)}/>
                    {this.state.editerror?<span className='errors spantag'>{this.state.editVal}</span>:''}
               </EditAlbumName>
            </div>
        );
    }
}

export default Albums;