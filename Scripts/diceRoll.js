window.onload = function(){
   var dice = [
        {key:"d20", value:20},
        {key:"d12", value:12},
        {key:"d100", value:100},
        {key:"d10", value:10},
        {key:"d8", value:8},
        {key:"d6", value:6},
        {key:"d4", value:4}
    ];
    dice.map(dice => {
        buildRow(dice.key,dice.value);
    });
}
const rollDice = (sides, inputId) => {    
    Array.from(document.getElementById('addRolls')
        .getElementsByTagName('tbody')[0].getElementsByTagName('button')).map(btn => btn.disabled = true);
    killDiv('roll-target');
    var rollCount = parseInt(document.getElementById('input-' + inputId).value);  
    var li = document.createElement('li');
    li.innerHTML = `<strong>${inputId}</strong>`;
    
    document.getElementById('roll-target').appendChild(li);
    loopRolls(rollCount, sides, rollCount);
    
}
const killDiv = id => {
    var div = document.getElementById(id);
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function loopRolls(i,sides,origVal) {
    setTimeout(function () {
        var textNode = document.createTextNode(`\nRoll ${(origVal - i) + 1} is: ${Math.floor(Math.random() * Math.floor(sides)) + 1}`);
        var rollTarget = document.getElementById('roll-target');
        var li = document.createElement('li');
        li.appendChild(textNode);
        rollTarget.appendChild(li);
       (--i) ? loopRolls(i, sides, origVal) : Array.from(document.getElementById('addRolls').getElementsByTagName('tbody')[0].getElementsByTagName('button')
       ).map(btn => btn.disabled = false);
    }, 1050);
    
}
const buildRow = (diceType, sideCount) => {   
    
        var targetBody = document.getElementById('addRolls').getElementsByTagName('tbody')[0];       
        var tableRow = document.createElement('tr');
        tableRow.id = diceType;
        var row = [
            buildIcon('dice-'+diceType),            
            buildInputGroup(diceType,buildButton(diceType,'btn btn-dark','Roll',`rollDice(${sideCount}, '${diceType}')`))                      
        ];          
        for (let i = 0; i < row.length; i ++){             
            var td = document.createElement('td');
            td.appendChild(row[i]);
            tableRow.appendChild(td);           
        }
        targetBody.appendChild(tableRow);
    
}
const buildInputGroup = (diceGroup,rollFunc) =>{
    
    var inputDiv = document.createElement('div');
    inputDiv.className = 'input-group input-group-lg mb-3';
    var decreaseDiv = document.createElement('div');
    decreaseDiv.className = 'input-group-prepend';
    decreaseDiv.innerHTML = buildButton(`${diceGroup}-decrease`,'btn btn-outline-danger',"<i class='fas fa-minus-square'></i>",`decrementInput('input-${diceGroup}')`);
    inputDiv.appendChild(decreaseDiv);
    inputDiv.appendChild(buildInput(diceGroup));
    var increaseDiv = document.createElement('div');
    increaseDiv.className = 'input-group-append';
    increaseDiv.innerHTML = buildButton(`${diceGroup}-increase`,'btn btn-outline-success',"<i class='fas fa-plus-square'></i>",`incrementInput('input-${diceGroup}')`) + rollFunc;
    inputDiv.appendChild(increaseDiv);
    
    return inputDiv;
}
const incrementInput = (inputId) =>{
    
    var input = document.getElementById(inputId);
    var inputVal = parseInt(input.value);
    input.value = inputVal+1;
    
    
}
const decrementInput = (inputId) =>{
    var input = document.getElementById(inputId);
    var inputVal = parseInt(input.value);
    ((inputVal-1) >= 1) ? input.value = inputVal-1:input.value;
}
const buildButton = (id,classString, btnText, funcAssign) => {
   
    return `<button id='${id}-btn' class='${classString}' onclick="${funcAssign}" type='button'>${btnText}</button>`;    

}

const buildIcon = (classString) => {
    var icon = document.createElement('i');
    icon.className = classString;
    return icon;
}

const buildInput = (idString) => {
    
    var inputBox = document.createElement('input');
    inputBox.type = 'text';    
    inputBox.className = 'form-control';    
    inputBox.value = '1';    
    inputBox.id = `input-${idString}`;
    inputBox.disabled = "true";
    return inputBox;
}

