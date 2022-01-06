import React, {useState} from 'react';
import axios from 'axios';
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from 'react-router-dom';
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

function ImageSlider(props) {
    const location = useLocation()
    const [current,setCurrent]=useState(0)
   const myAlbumData=location.state.details;
   const [allPhotos,setAllPhotos]=useState([]);
  function signOut()
{
    if(localStorage.getItem('User'))
    {
    localStorage.removeItem('User');
    }
    if(sessionStorage.getItem('Email'))
    {
    sessionStorage.removeItem('Email')
    }
    window.open('/','_self')
}
   
  function goBack()
{
    window.open('/#/album','_self')
}

   async function getUserData(){
    try{
    return axios.get(api2)
    }
    catch(error){
        console.error(error);
    }
}

async function checkEmailUser()
{

const response=await getUserData();
 console.log(response)
// let val={};
let photos=[]
if(myAlbumData.email!==null)
{for(let i=0;i<response.data.length;i++)
{
    console.log(response.data[i])
    
    if(response.data[i].email.toLowerCase()===myAlbumData.email.toLowerCase() && response.data[i].albumname.toLowerCase()===myAlbumData.album.toLowerCase())
    {
       
    //    val=
    //    {
    //         id:response.data[i].id,
    //         email:response.data[i].email,
    //        name: response.data[i].albumname,
    //        photo: response.data[i].photos
    //    }
    photos.push(...response.data[i].photos)
    return (photos)    
    }
    
}
// console.log(val)

}
}
useEffect(()=>{
    // console.log(docs)
    async function callApi(){
 let res =  await checkEmailUser();
 console.log(res)
 setAllPhotos(res)
 console.log(allPhotos)
    }
    callApi();

},[myAlbumData])
const prevSlide=()=>{
    setCurrent(current===0?(allPhotos.length-1):current-1)
    //  console.log(current)
}
const nextSlide=()=>{
    setCurrent(current=== (allPhotos.length-1)?0:current+1)
    // console.log(current)
    
}


    return (

        <div>
             <div className='photo-header'>

                
                
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
fill="#FE4949" d="M448,96h-64V64c0-35.344-28.656-64-64-64H192c-35.344,0-64,28.656-64,64v32H64c-35.344,0-64,28.656-64,64v288
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
    <LightTooltip arrow interactive 
                                        PopperProps={{
                                          modifiers:{
                                            offset: {
                                              enabled: true,
                                              offset: '0px, 5px',
                                            },
                                          },
                                        }}
                                        title="Back">
<button className='back' onClick={goBack}>Back</button>
</LightTooltip>
<div>
        <button className='but2' onClick={signOut}>Sign Out</button>
</div>
</div>

            <section className='slider'>
               
            {
                allPhotos.length>0?
                <>
                <button className='left' onClick={prevSlide}>Prev</button>
                <button className='right' onClick={nextSlide}>Next</button>
                
                
               { allPhotos.map((url,index)=>{
                    return (
                        <div className={index===current?'slide active':'slide'}
                        key={index}>

                       {index===current && <img src={url} className='image' alt='images'/>}
                        
                        </div>
                    )
                                })
                            }
                                </>
                        
                                :' No Photos'
            }
            </section>
        </div>
    );
}

export default ImageSlider;