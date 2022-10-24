import { useState } from "react"

const Memory = (props) => {
    //const [memory, setMemory] = 
    return (
        <>
        <div className="Title">Memory</div>
        <div className="mem">
        <div className="mem1">
        {props.memArray.slice(0,16).map((e, i) => (
            <div key={`${0}mem${i}`}
            style={{
                'background-color': '#004080',
                'border-radius': '0.5em',
                'color': 'white',
                'margin-right': '2px',
                'padding': '0.4em',
                'padding-top': '0.4em',
                'font': 'system-ui',
                'fontSize': '16px',
                'margin': '2px',
                'width': '5em'
            }}>
                {`[${i}]: ${e}`}
            </div>
        ))}</div>
        <div className="mem2">
        {props.memArray.slice(16,32).map((e, i) => (
            <div key={`${1}mem${i}`}
            style={{
                'background-color': '#004080',
                'border-radius': '0.5em',
                'color': 'white',
                'margin-right': '2px',
                'padding': '0.4em',
                'padding-top': '0.4em',
                'font': 'system-ui',
                'fontSize': '16px',
                'margin': '2px',
                'width': '5em'
            }}>
                {`[${i+16}]: ${e}`}
            </div>
        ))}</div>
        </div>
        </>
    )
}

export default Memory