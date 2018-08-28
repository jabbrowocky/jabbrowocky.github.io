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
    }, 750);
    
}
const buildRow = (diceType, sideCount) => {   
    
        var targetBody = document.getElementById('addRolls').getElementsByTagName('tbody')[0];       
        var tableRow = document.createElement('tr');
        tableRow.id = diceType;
        var row = [
            buildIcon('dice-'+diceType),
            buildNumInput(diceType),
            buildButton(diceType,'btn btn-sm btn-success','Roll',`rollDice(${sideCount}, '${diceType}')`)
            
        ];          
        for (let i = 0; i < row.length; i ++){
            var td;
            if (i < 2) {
                td = document.createElement('td');
                td.appendChild(row[i]);
                tableRow.appendChild(td);
            } else {
                td = document.createElement('td');
                td.innerHTML = row[i];
                tableRow.appendChild(td);
            }
        }
        targetBody.appendChild(tableRow);
    
}


const buildButton = (id,classString, btnText, funcAssign) => {
   
    return `<button id='${id}-btn' class='${classString}' onclick="${funcAssign}">${btnText}</button>`;    

}

const buildIcon = (classString) => {
    var icon = document.createElement('i');
    icon.className = classString;
    return icon;
}

const buildNumInput = (idString) => {
    var inputBox = document.createElement('input');
    inputBox.type = 'number';
    inputBox.onkeydown = function (evt) {
       /*  var charCode = (evt.which) ? evt.which : event.keyCode;        
        if (this.value.length == 0 && evt.which == 48){
            return false;
         }
        if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;
        return true; */
        return false;
    }
    inputBox.className = 'form-control';
    inputBox.step = 1;
    inputBox.min = 1;    
    inputBox.id = `input-${idString}`;
    return inputBox;
}

