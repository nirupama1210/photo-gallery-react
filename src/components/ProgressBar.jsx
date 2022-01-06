import React from "react";
import axios from 'axios';
import { useEffect } from "react/cjs/react.development";
import useStorage from "../hooks/useStorage";
import {motion} from 'framer-motion'
let api='https://618fc8a0f6bf450017484a4d.mockapi.io/info';
let api2='https://618fc8a0f6bf450017484a4d.mockapi.io/albums';

 const ProgressBar = ({file,setFile,data}) =>{

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
    console.log(email,albumname)
    // console.log(response)
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

    async function editPhoto(myData,url){
        let res=await checkEmailUser(myData.email,myData.albumname);
        res.photo.push(url)
        let data={
            "email":res.email,
            "albumname":res.name,
            "photos":res.photo
    
        }
        // console.log(data)
       try{
        let api3='https://618fc8a0f6bf450017484a4d.mockapi.io/albums/'+myData.id;
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

     const {url, progress} = useStorage(file);
    
  useEffect(()=>{
async function fetchData()
{
        if(url)
        {
           await editPhoto(data,url)
           
            setFile(null)
        }
    }
    fetchData();

     }, [url, setFile])

    return (
        <motion.div className="progress-bar" 
        initial={{widows:0}}
        animate={{width:progress + '%'}}
        >
        </motion.div>
    )

 }

 export default ProgressBar;