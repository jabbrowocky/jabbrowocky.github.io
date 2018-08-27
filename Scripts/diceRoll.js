const rollDice = (sides, inputId) => {
    document.getElementById(inputId + "-btn").disabled = true;
    killDiv('roll-target');
    var rollCount = parseInt(document.getElementById('input-' + inputId).value);  
    var lh = document.createElement('lh');
    lh.innerHTML = `<strong>${inputId}</strong>`;
    
    document.getElementById('roll-target').appendChild(lh);
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
        (--i) ? loopRolls(i, sides, origVal) : document.getElementById("d" + sides + "-btn").disabled = false;
    }, 1500);
    
}
const buildRow = (diceType, sideCount) => {   
    if(!document.getElementById(diceType)){
        var targetBody = document.getElementById('addRolls').getElementsByTagName('tbody')[0];       
        var tableRow = document.createElement('tr');
        tableRow.id = diceType;
        var row = [
            buildIcon('dice-'+diceType),
            buildNumInput(diceType),
            buildButton(diceType,'btn btn-sm btn-success','Make Rolls',`rollDice(${sideCount}, '${diceType}')`),
            buildButton(diceType,'btn btn-sm btn-danger','Remove', `removeRow('${diceType}')`)
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
}


const buildButton = (id,classString, btnText, funcAssign) => {
    //var button = document.createElement('button');
    //button.innerHTML = btnText;
    //button.className = classString;
    //button.onclick = funcAssign;
    //return button;
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
    inputBox.onkeydown = function () {
        return false;
    }
    inputBox.className = 'form-control';
    inputBox.step = 1;
    inputBox.min = 1;
    inputBox.value = 1;
    inputBox.id = `input-${idString}`;
    return inputBox;
}

const removeRow = (rowId) => {
    var rowToRemove = document.getElementById(rowId);
    var table = document.getElementById('addRolls').getElementsByTagName('tbody')[0];
    table.removeChild(rowToRemove);
}