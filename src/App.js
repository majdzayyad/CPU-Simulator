import { useEffect, useState } from 'react';
import Instructions from './Components/instructions';
import Memory from './Components/memory';
import Registers from './Components/registers';
import {opcodes, registers, memorySize, markLine, checkInstructions, unmarkLine, executeLine, registerFileInit} from './utils.js'

function App() {
  const [state, setState] = useState(false) // false means edit mode, true means run
  const [pc, setPC] = useState(1)
  const [nextPc, setNextPc] = useState(2)
  const [instructions, setInstructions] = useState([])
  const [memArray, setMemory] = useState(Array(memorySize).fill(0))
  const [registerFile, setRegisterFile] = useState(registerFileInit)
  const [demo, setDemo] = useState(false)

  const handleRun = () => {
    setState((prevState) => {return !prevState})
    setPC(1)
    setNextPc(2)
  }

  useEffect( () => {
    if (state) {
      const errorLines = checkInstructions(instructions)
      console.log(errorLines)
      if (errorLines.length > 0) {
        setState(false)
        alert(`Compilation errors in Lines: ${errorLines}`)
      }
    }
  }, [instructions])

  useEffect( () => {
    if (instructions.length > 0) {
      for (let i=1; i<=instructions.length; i++) unmarkLine(i) 
    }
    if (state == true){
      if (pc > instructions.length) {
        return
      }
      markLine(pc)
      let registerFileCopy = {...registerFile}
      let memArrayCopy = [...memArray]
      let newPc = 0
      let maxLabel = instructions.length
      let res = executeLine(instructions[pc-1], memArrayCopy, registerFileCopy, pc, maxLabel)
      if (res[3]) {
        setState(false)
        return
      }
      console.log(res[0])
      console.log(res[1])
      setMemory(res[0])
      setRegisterFile(res[1])
      setNextPc(res[2]+1)
    }
    else {
      setMemory(Array(memorySize).fill(0))
      setRegisterFile(registerFileInit)
    }
  }, [instructions, pc])

  return (
    <div className='All'>
    <div className='Header'>Mips CPU Simulator - Majd Zayyad</div>
    <div className="App">
      <div className='InstructionStation'>
        <button
        className='button' 
        onClick={handleRun}> {state ? 'Edit' : 'Run'} 
        </button>
        {
          !state && 
          <button 
          className='button'
          onClick={() => {
            setDemo(prevDemo => {return !prevDemo})
          }}>Demo</button>
        }
        { state &&
          <button 
          className='button'
            onClick={() => {
              setPC(nextPc)
            }}>
            Next
          </button>
        }
        <Instructions run={state} 
          pc={pc} 
          instructions={instructions} 
          setInstructions={setInstructions}
          demo={demo} />
      </div>
      <div className='RegisterStation'>
        <Registers run={state} registerFile={registerFile} />
      </div>
      <div className='MemoryStation'>
        <Memory run={state} memArray={memArray} />
      </div>
    </div>
    </div>
  );
}

export default App;
