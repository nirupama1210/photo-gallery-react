import React from 'react';

function EditAlbumName(props) {
    return (props.trigger) ? (
        <div className='popupadd2'>
            <div className='popup-inner2'>
            <button className='cbut3' onClick={(e)=>props.updateAlbum(e)}>Save</button>
                <button className='cbut2' onClick={(e)=>props.setTrigger(e)}>Cancel</button>
                {props.children}
            </div>
        </div>
    ):'';
}

export default EditAlbumName;