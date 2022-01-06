import React, { useState } from "react";
import axios from 'axios';
import useFirestore from '../hooks/useFirestore'
import { motion } from "framer-motion";
import { useEffect } from "react";
import { saveAs } from 'file-saver'
// import arrow from './arrow.svg'
import MovePhoto from './MovePhoto'
// let api='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/albums';
let albums=[];

 const ImageGrid = ({myData,setSelectedImg}) =>{
    const {docs} = useFirestore('images');
    const [data,setData]=useState([]);
   const [popup,setPopup]=useState(false);
//    const [photomoved,setPhoto]=useState(false)
   const [aname,setAname]=useState('')
   const [url,setUrl]=useState('')
   const [id,setId]=useState('')
    const val=myData;
    // albums=[];
    // albums=setAllAlbums();

    
    
    async function getUserData(){
        try{
        return axios.get(api2)
        }
        catch(error){
            console.error(error);
        }
    }

    async function checkEmailUser(email,albumname)
{

    const response=await getUserData();
     console.log(response)
    let val={};
    if(email!==null)
    {for(let i=0;i<response.data.length;i++)
    {
        
        if(response.data[i].email===email && response.data[i].albumname===albumname)
        {
           
           val=
           {
                id:response.data[i].id,
                email:response.data[i].email,
               name: response.data[i].albumname,
               photo: response.data[i].photos
           }
            
        }
    }
    // console.log(val)
    return val;
}
}
async function setAllAlbums()
{
    
    const response=await getUserData();
    if(val.email!==null)
    {for(let i=0;i<response.data.length;i++)
    {
        //console.log(albums)
        if(response.data[i].email===val.email && response.data[i].albumname!==val.albumname)
        {
           // console.log(response.data[i].albumname)

           albums.push(response.data[i].albumname)            
        }
    }
    console.log(albums)
}
}
async function down(e)
{
    albums=[]
    await  setAllAlbums();
    
    document.getElementById(e).classList.toggle("show");
}
const download=(url)=>{
    saveAs(url, 'image.jpg');
}
useEffect(()=>{
    // console.log(docs)
    async function callApi(){
 let res =  await checkEmailUser(val.email,val.albumname);
 setData(res.photo)
 albums=[];
 await setAllAlbums();
    }
    callApi();
//  console.log(data)
},[docs])

async function editPhoto(myData,url,albumn){
    let res=await checkEmailUser(myData.email,albumn);
    res.photo.push(url)
    let data={
        "email":res.email,
        "albumname":res.name,
        "photos":res.photo

    }
    console.log(res.id)
    console.log(data)
   try{
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+res.id;
        axios.put(api3,data)
        .then(res=>{
            console.log(res)
        })
        .catch(err=>console.log(err));
       
}
    catch(error)
    {
        console.log(error);
    }
 }

const deletePhoto=async (url) =>{
    let res =  await getUserData()
    // console.log(res)
    let photo=[];
    let deletedData={};
    let id=''
    for(let i=0;i<res.data.length;i++)
    {
        if(res.data[i].email===val.email && res.data[i].albumname===val.albumname)
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
    let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+id;
    try{
        axios.put(api3,deletedData)
        .then(res=>{
            console.log(res)
            setData(deletedData.photos)
        })
        .catch(err=>console.log(err));
    }
    catch(error)
    {
        console.log(error);
    }
}
async function moveMyPhoto(e){

    if(aname!=='')
    {console.log(url,aname)
    await deletePhoto(url)
    await editPhoto(val,url,aname)
    console.log("Done")
    toggle(e,id,url)
    }

}
function toggle(e,id,url)
{
    document.getElementById(id).classList.toggle("show");
    
    const val=popup;
    
   setPopup(!val)
    setUrl(url)
    setId(id)
    // if(popup===false)
    // {
    //     setPhoto(false)
    // }
}

    return (
        <div className="img-grid">
            {
                docs && docs.map(doc =>
                    {
                        if(data.includes(doc.url))
                        {
                            return (
                             <>   <div className="photo-wrap">
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
                           <button className="delete" onClick={()=>deletePhoto(doc.url)}>Delete</button>
                           {albums.length>0?<button className="but3" style={{margin:"0px 10px",marginBottom:"10px"}}  onClick={(e) => toggle(e,doc.id,doc.url)} >Move To</button>
                       :''}
                        </div>

                        </center>
                        </div>
                                </div>
                                 <MovePhoto trigger={popup} setTrigger={(e)=>toggle(e,doc.id,doc.url)} movePhoto={(e)=>moveMyPhoto(e)}>
                                
                                     {
                                         albums.length>0?
                                         <select className="tb3" onChange={(e)=>setAname(e.target.value)}>
                                             <option val=''></option>
                                         {albums.map(val=>{
                                             console.log(val)
                                             return (
                                                 <option value={val}>{val}</option>
                                             )
                                         })}
                                         </select>
                                         :''
                                     }
                               
                                 </MovePhoto></>
                            )
                        }
                    })}
                    {
                        data.length===0?<div>No Photos</div>:''
                    }
                
               
        </div>
    )

 }
  export default ImageGrid;