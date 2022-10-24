import { useState, useRef, useEffect} from "react"
import TextAreaWithLineNumber from "./editor/editor"

const demo = `# code that interatively adds 3 to 
# $1 unti it equals 9, then writes 
# the result to $5
addi $1, $1, 3
sw $1, 16($0)
addi $2, $0, 9
bne $1, $2, 4
add $5, $0, $1`

const Instructions = (props) => {
    const valRef = useRef()
    const textRef = useRef()
    const [text, setText] = useState('')

    useEffect( () => {
        if (props.demo) valRef.current.value = demo
    }, [props.demo])

    useEffect( () => {
        const instructionArray = valRef.current.value.split('\n')
        const instructionObjects = []
        instructionArray.forEach((v) => {
            if (v.includes('#')) v = v.split('#')[0]
            let instruction = v.split(' ')
            if (instruction.length > 1) instruction = instruction.filter((e) => {return e != ''})
            if (v.includes('(')){
                console.log(v)
                instruction = [...instruction.slice(0,instruction.length-1), ...instruction[instruction.length-1].split('(')]
                console.log(instruction)
            }
            instruction.forEach((s,i) => {
                let newS = s.replaceAll(',', '')
                instruction[i] = newS.replaceAll(')', '')
            })
            instructionObjects.push({
                opcode: instruction[0],
                registers: (instruction.length > 1 && instruction[0] !== 'j') ? instruction.filter(s => s.includes('$')) : null,
                immediate: (instruction.length > 1 && instruction[0] !== 'add') ? instruction.splice(1).filter(s => !s.includes('$'))[0] : 0,
                label: instructionObjects.length+1
            })
        })
        props.setInstructions(instructionObjects)
        console.log(instructionObjects)
    }, [props.run])
    
    return (
        <div style={{
            'width' : '20em',
            'border' : '1px solid transparent'
        }}>
            <TextAreaWithLineNumber
            innerRef={valRef}
            textRef={textRef}
            onChange={() => {}} 
            placeholder={`Write code here...`} 
            lineNumberBackground='#004080' 
            textAreaBackgroundColor='#00284d' 
            lineNumberTextColor='#ffffff' 
            textAreaTextColor='#ffffff'
            height='80vh'
            scrollbarWidth='6px'
            />
        </div>
    )
}

export default Instructions