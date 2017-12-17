import React  from 'react';




export const Broadcrumbs = (props) =>{

    return  (<div style={{width: '100%', height:'3em', marginTop: '4em', borderBottom:
            '1px solid #d2d0d0', display: 'flex', backgroundColor: '#fff' }}>
                <div style={{ alignItems: 'center', display: 'flex', marginLeft: '26px',fontSize: '20px',
                    color: 'rgba(0,0,0,0.54)'}} >
                        {props.linkName}
                        </div>
                </div>)
};
