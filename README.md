# Simulating how Mips assembly code runs on a cpu

## The application is structured in the following way:

1. The first section is the program. Where you write code in assembly for the cpu to run, and after you run it you can view which instruction the cpu is currently running.

2. The second section is a view of the state of the data memory of the program where it is divided into 32 addresses each corresponding to a single word (4 bytes), so the total data memory for this cpu is 1kb.

3. The third section is the register file. It contains 8 registers numbered $0 to $7 for simplicity (as opposed to the 32 registers in the real MIPS microarchitecture), and it represents the value of each register during the execution of the program.

## The supported instructions are:

add $r1, $r2, $r3 (add $r3 to $r2 and store the result in $r1)

addi $r1, $r2, imm (add an integer represented by imm to $r2 and store result in $r1)

lw $r1, imm($r2) (load the word from the memory address $r2+imm into the register $r1)

sw $r1, imm($r2) (store the word in $r1 into the memory address $r2 + imm)

beq $r1, $r2, label (go to the instruction number in label if $r1 and $r2 are equal)

bne $r1, $r2, label (same as beq but if $r1 and $r2 are not equal)

j label (go to the label unconditionally)

## Notes:

Labels are the line number in the editor
Comments can be added using # before the comment
Click on the demo button to execute a demo program


