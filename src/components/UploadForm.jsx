import React from 'react'
import { useState } from 'react';
import ProgressBar from './ProgressBar';
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

const UploadForm = (props) => {
    const myData = props.myData;
    const [file,setFile] = useState(null);
    const [error,setError] = useState(null)

    const types = ['image/png','image/jpeg'];

    const changeHandler =(e)=>{
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type))
        {
            setFile(selected);
            setError('')
        }
        else{
            setFile(null);
            setError('Please select an image file (png or jpeg)');
        }
    }
    return (
        <form>
        <label>
          <input type="file" onChange={changeHandler} />
          <LightTooltip arrow interactive 
          PopperProps={{
            modifiers:{
              offset: {
                enabled: true,
                offset: '0px, -5px',
              },
            },
          }}
          title="Upload Photos">
          <span>+</span>
          </LightTooltip>
          
        </label>
        <div className="output">
          { error && <div className="error">{ error }</div>}
          { file && <div>{ file.name }</div> }
          { file && <ProgressBar file={file} setFile={setFile} data={myData}/> }
        </div>
      </form>
    )
}

export default UploadForm;