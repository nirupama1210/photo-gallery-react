import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { motion } from "framer-motion";
import './style.css';
import styled from 'styled-components';

const icon = {
  hidden: {
    opacity: 0,
    pathLength: 0,
    fill: "rgba(255, 255, 255, 0)"
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    fill: "rgba(255, 255, 255, 1)"
  }
};
const Button = styled(motion.button)`
border: 2px solid white;
outline: none;
padding: 15px 60px;
margin: 30px;
background:transparent;
cursor: pointer;
font-size: 1rem;
color: white;
border-radius:2px;
`;
function display()
    {
        if(document.getElementById('d1').style.display==="none")
        {
            document.getElementById('d1').style.display="block";
        }
        else{
            document.getElementById('d1').style.display="none"
        }
    }
 

const Home = () => {
    
    const fadeLeft={
        hidden: {opacity: 0, x: -100},
        visible: {opacity:1, x:0}
    }

   return(
    
    <div className='outer'>
        <div className='top-title'>
         <motion.h1
 initial={{opacity: 0}}
 animate={{opacity: 1}}
 transition={{duration: 1}}
 className='app-title'
 >
     Pro Photos
 </motion.h1>

 <button onClick={display} className='info'></button>
 </div>
  <div className="container">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="item"
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

  <Link to='/login'>
      <Button className='start-btn'
  whileHover={{scale: 1.05}}
  whileTap={{scale: 0.95, background: '#FE4949', border: 'none'}}
  >Get Started</Button></Link>

  <motion.p
  variants={fadeLeft}
  initial='hidden'
  animate='visible'
  transition={{duration : 1}}
  id='d1'>Store and organize your Photos and relive your most magical memories</motion.p>
  </div>
);
    }
export default Home;
