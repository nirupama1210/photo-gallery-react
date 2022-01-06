import React from 'react';

function MovePhoto(props) {
    return (props.trigger) ? (
        <div className='popupadd2'>
            <div className='popup-inner3'>
            
                <button className='cbut3' onClick={(e)=>props.movePhoto(e)}>Move</button>
                <button className='cbut2' onClick={(e)=>props.setTrigger(e)}>Cancel</button>
                {props.children}
            </div>
        </div>
    ):'';
}

export default MovePhoto;