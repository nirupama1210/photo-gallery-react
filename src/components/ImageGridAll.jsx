import React, { useState } from "react";
import axios from 'axios';
import useFirestore from '../hooks/useFirestore'
import { useEffect } from "react";
import { motion } from "framer-motion";
import { saveAs } from 'file-saver'
let api='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/albums';

 const ImageGridAll = ({myData,setSelectedImg}) =>{
    const {docs} = useFirestore('images');
    const [data,setData]=useState([]);
    const [apiVal,setApi]=useState([])
    const val=myData;
    
    async function getUserData(){
        try{
        return axios.get(api2)
        }
        catch(error){
            console.error(error);
        }
    }

    async function checkEmailUser(email)
{

    const response=await getUserData();
    // console.log(response)
    let val=[];
    let photos=[]
    if(email!==null)
    {for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email)
        {
           
            for(let j=0;j<response.data[i].photos.length;j++)
            {
                photos.push(response.data[i].photos[j])
                val.push(response.data[i].albumname)
            }
           
            
        }
    }
    // console.log(val)
    
}
return {apiVal:val,photos:photos}
}
function down(e)
{
    document.getElementById(e).classList.toggle("show");
}
const download=(url)=>{
    saveAs(url, 'image.jpg');
}
useEffect(()=>{
    // console.log(docs)
    async function callApi(){
 let res =  await checkEmailUser(val.email);
 setData(res.photos)
 setApi(res.apiVal)
    }
    callApi();
//  console.log(data)
},[docs])

const result = async ()=>{
    return await checkEmailUser(val.email);
}

const deletePhoto=async (url,albumname) =>{
    let res =  await getUserData()
    // console.log(res)
    let photo=[];
    let deletedData={};
    let id=''
    for(let i=0;i<res.data.length;i++)
    {
        if(res.data[i].email===val.email && res.data[i].albumname===albumname)
        {
            for(let j=0;j<res.data[i].photos.length;j++)
            {
                if(res.data[i].photos[j]!==url)
                {
                    photo.push(res.data[i].photos[j])
                   
                }
            }
            id=res.data[i].id;
            deletedData={
                email:res.data[i].email,
                albumname:res.data[i].albumname,
                photos:photo
            }
            break;
        }
    }
    console.log(deletedData)
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+id;
    try{
        axios.put(api3,deletedData)
        .then(res=>{
            console.log(res)
            result().then(
                res=>{
                    console.log(res)
                    setData(res.photos)
                    setApi(res.apiVal)
                }
            )
            .catch(err=>console.log(err))
        })
        .catch(err=>console.log(err));
       
    }
    catch(error)
    {
        console.log(error);
    }
}

    return (
        <div className="img-grid">
            {
                docs && docs.map(doc =>
                    {
                        if(data.includes(doc.url))
                        {
                            return (
                                <div className="photo-wrap">
                                <motion.div className="img-wrap" key={doc.id}
                                layout
                                whileHover={{opacity: 1}}
                                onClick={()=>setSelectedImg(doc.url)}
                                >
                                    <motion.img src={doc.url} alt="uploaded pic"
                                    initial={{opacity:0}}
                                    animate={{opacity:1}}
                                    transition={{delay:1}}
                                    />
                  
                       

                  
                                </motion.div>
                                <div className="photo-down-content">
                            <button onClick={(e)=>down(doc.id)}>DropDown</button>
                        {/* <img src={arrow} alt="dropdown" onClick={down} className='dropbtn arrow'/> */}
                  
                       <center> <div id={doc.id} className='dropdown-content2'>
                           <button className="download" onClick={()=>download(doc.url)} >Download</button>
                           <button className="delete" onClick={()=>deletePhoto(doc.url,apiVal[data.indexOf(doc.url)])}>Delete</button>
                           
                        </div>
                        </center>
                        </div>
                                </div>
                            )
                        }
                    })}
                    {
                        data.length===0?<div>No Photos</div>:''
                    }
                  
        </div>
    )

 }
  export default ImageGridAll;