export const opcodes = ['add', 'addi', 'lw', 'sw', 'beq', 'bne', 'j']
export const registers = ['$0', '$1', '$2', '$3', '$4', '$5', '$6', '$7']
export const registerFileInit = {
  $0: 0,
  $1: 0,
  $2: 0,
  $3: 0,
  $4: 0,
  $5: 0,
  $6: 0,
  $7: 0,
}
export const memorySize = 32


export const executeLine = (line, memory, registers, pc, maxLabel) => {
  let address = true
  let err = false
  switch (line.opcode) {
    case 'lw':
      address = registers[line.registers[1]]+Number(line.immediate)
      if (address >= memorySize){
        alert('Runtime Error: address is out of memory bounds')
        err = true
        break
      }
      registers[line.registers[0]] = memory[address]
      break
    case 'sw':
      address = registers[line.registers[1]]+Number(line.immediate)
      if (address >= memorySize){
        alert('Runtime Error: address is out of memory bounds')
        err = true
        break
      }
      memory[address] = registers[line.registers[0]]
      break
    case 'add':
      registers[line.registers[0]] = registers[line.registers[1]] + registers[line.registers[2]]
      break
    case "addi":
      registers[line.registers[0]] = registers[line.registers[1]] + Number(line.immediate)
      break
    case 'beq':
      if (Number(line.immediate) > maxLabel) {
        alert('Runtime Error: label does not exist')
        err = true
        break
      }
      pc = registers[line.registers[0]] === registers[line.registers[1]] ? Number(line.immediate)-1 : pc
      break
    case 'bne':
      if (Number(line.immediate) > maxLabel) {
        alert('Runtime Error: label does not exist')
        err = true
        break
      }
      pc = registers[line.registers[0]] === registers[line.registers[1]] ? pc : Number(line.immediate)-1
      break
    case 'j':
      if (Number(line.immediate) > maxLabel) {
        alert('Runtime Error: label does not exist')
        err = true
        break
      }
      pc = Number(line.immediate)-1
      break
  }
  return [memory, registers, pc, err]
}

export const markLine = (lineId) => {
  document.getElementById(lineId.toString()).style=`
  background-color: steelblue;
  border-radius: 25%;
  display: inline-block;
  `
}

export const unmarkLine = (lineId) => {
  document.getElementById(lineId.toString()).style=`
  background-color: #004080;
  border-radius: 25%;
  display: inline-block;
  `
}

export const checkInstructions = (instructions) => {
  let errorLines = []

  // checking each instruction
  instructions.forEach(element => {
    // if instruction is noOp return
    if (element.opcode === '') return

    // if opcode is invalid
    if (!opcodes.includes(element.opcode)) {
      errorLines.push(element.label)
      return
    }

    // if registers are invalid
    element.registers.forEach( e => {
      if (!registers.includes(e)) {
        errorLines.push(element.label)
        return
      }
    })

    // checking immediate value
    if (element.opcode != 'addi' && (element.immediate < 0)) {
      errorLines.push(element.label)
      return
    }
  })
  errorLines = [... new Set(errorLines)]
  return errorLines
}
