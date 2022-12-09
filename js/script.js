//inputs
const bill = document.querySelector("#bill-price");
const tipPercentages = document.querySelectorAll(".tip-percentages");
const customTipPercentage = document.querySelector(".custom-tip-percentage");
const people = document.querySelector("#people-group");

const btnReset = document.querySelector(".reset")

//process variables
let total = 0;
let totalEntered = false;
let tipPercentage = 0;
let tipSelected = false;
let numOfPeople = 0;
let numEntered = false;

//outputs
const tipAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");

tipPercentages.forEach(function(button) {
    button.addEventListener('click', (e) => {
        tipPercentage = e.target.value;
        tipSelected = true;

        if (totalEntered && tipSelected && numEntered)
        {
            CalculateTipAndTotalAmount();
        }
    });
})

bill.onfocus = function() {
    document.querySelector(".bill-input").classList.add("group-outline");
}

bill.onclick = function() {
    bill.select();
}

bill.onchange = function() {
    total = bill.value;
    totalEntered = true;

    if (totalEntered && tipSelected && numEntered) {
            CalculateTipAndTotalAmount();
    }
}

customTipPercentage.onclick = function() {
    customTipPercentage.select();
}

customTipPercentage.onchange = function() {
    if (customTipPercentage.value.match("[a-zA-Z]+")) {
        customTipPercentage.style.cssText = ("border: 2px solid hsl(0, 100%, 66%)");
    } else {
        tipPercentage = customTipPercentage.value / 100;
        tipSelected = true;

        if (totalEntered && tipSelected && numEntered) {
            CalculateTipAndTotalAmount();
        }
    }
}

people.onfocus = function() {
    document.querySelector(".people-number").classList.add("group-outline");
}

people.onclick = function() {
    people.select();
}

people.onchange = function() {
    numOfPeople = Math.round(people.value);
    if (numOfPeople == 0) {
        //display error message
    } else {
        numEntered = true;
    }
    

    if (totalEntered && tipSelected && numEntered) {
        CalculateTipAndTotalAmount();
    }
}

btnReset.onclick = function() {
    totalEntered = false;
    tipSelected = false;
    numEntered = false;

    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";

    btnReset.disabled = true;

    bill.focus();
    bill.select();
}

function CalculateTipAndTotalAmount() {
    let billPerPerson = total / numOfPeople;
    tipAmount.textContent = "$" + (billPerPerson * tipPercentage).toFixed(2).toString();
    totalAmount.textContent = "$" + (billPerPerson + billPerPerson * tipPercentage).toFixed(2).toString();

    btnReset.disabled = false;
}


