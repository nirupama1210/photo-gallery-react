import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import Login from './components/Login';
import NewAccount from './components/NewAccount'
import {Routes,Route,Link} from "react-router-dom";
import Forgot from './components/Forgot'
import Albums from './components/Albums';
import Photos from './components/Photos';
import AllPhotos from './components/AllPhotos';
import ImageSlider from './components/ImageSlider';
function Empty()
{
  return <h1>There's Nothing to display</h1>
}
function App() {
  return (
    <>
   <Routes>
   <Route path="/" element={<Home/>}/>
   <Route path="login" element={<Login/>}/>
   <Route path="album" element={<Albums/>}/> 
   <Route path="forgot" element={<Forgot/>}/> 
   <Route path="account" element={<NewAccount/>}/> 
   <Route path="photos" element={<Photos/>}/>
   <Route path="allphotos" element={<AllPhotos/>}/>
   <Route path="slider" element={<ImageSlider/>}/>
   <Route path="*" element={<Empty/>}/>
   
  </Routes>
  </>
  );
}

export default App;
