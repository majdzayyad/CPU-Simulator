import { useState } from "react"
const registers = ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7']

const Registers = (props) => {
    return (
        <>
        <div className="Title">Registers</div>
        {registers.map( (e) => (
            <div key={e}
                style={{
                    'display': 'inline-flex',
                    'border-radius': '0.5em',
                    'height': '3em',
                    'padding': '2px',
                    'fontFamily': 'system-ui',
                }}> 

                <div id={e} style={{
                    'background-color': '#004080',
                    'border-radius': '0.5em',
                    'color': 'white',
                    'margin-right': '2px',
                    'padding': '1em',
                    'paddingTop': '0.7em',
                    'font': 'system-ui',
                    'fontSize': '18px'
                }}>
                    {e}
                </div>
                <div style={{
                    'width': '4em',
                    'background-color': '#00284d',
                    'border-radius': '0.5em',
                    'color': 'white',
                    'padding': '1em',
                    'font': 'system-ui',
                    'fontSize': '18px',
                    'paddingTop': '0.7em',
                }}>
                    {props.registerFile[e]}
                </div>

            </div>
        ))}
        </>
    )
}

export default Registers