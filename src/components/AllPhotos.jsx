import React, { Component } from 'react';
import { useLocation } from 'react-router-dom'
import {Link} from 'react-router-dom';
import ImageGridAll from './ImageGridAll';
// import UploadForm from './UploadForm';
import Modal from './Modal';
import arrow from './arrow.svg'
import { motion } from "framer-motion";

let myAlbumData={};


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


class Child extends Component {
    constructor(props)
    {
        super(props);
        
        this.state={
            prp:   props.albumItems,
            selectedImg:null
           }
        // console.log(this.state)
        if(!sessionStorage.getItem("Email"))
        {
            window.open('/','_self')
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
setSelectedImg(e)
{
    console.log(e)
    this.setState({selectedImg:e})
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
    window.open('/','_self')
}
    render() {
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
                   <p className='photo-title'>All Photos</p>
                </div>
                <div className='dropdown'>
                        <img src={arrow} alt="dropdown" onClick={this.down} className='dropbtn arrow'/>
                        <div id='myDropdown' className='dropdown-content'>
                            <Link to='/album' className='but3'>Albums</Link>
                            <Link to='/allphotos' className='but3' state={{details: {email:this.state.prp.email}}}>All Photos</Link>
                        </div>

                    </div>
                <div>
                        <button className='but2' onClick={this.signOut}>Sign Out</button>
                </div>
                </div>
                <div className='photo-content'>
                      
                <ImageGridAll myData={this.state.prp} setSelectedImg={(e)=>this.setSelectedImg(e)}/>
                        {this.state.selectedImg &&<Modal selectedImg={this.state.selectedImg} setSelectedImg={(e)=>this.setSelectedImg(e)}/>}
                </div>
            </div>
        );
    }
}


function Photos(props) {
    const location = useLocation()
    
    myAlbumData=location.state.details;
    return (
        <div>
            <Child albumItems={myAlbumData}/>
        </div>
    );
}


export default Photos;