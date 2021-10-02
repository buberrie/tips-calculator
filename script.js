//set initialize values
let billValue = 0.00;
let initialPerson = 1;
let initialResult = 0.00;
let tipsValue = 0.15;

//select all buttons and values
const btns = document.querySelectorAll('.btns');
const custom = document.querySelector('.input')
const resetBtn = document.querySelector('.reset-button')
const tipsBtn = document.getElementById('button-val');
const result = document.querySelectorAll('.total');
const people = document.querySelector('.person');
const bill = document.querySelector('.bill');
const errorDisplay = document.querySelector('.error-msg');



console.log(result)
console.log(btns)
console.log(bill)
console.log(errorDisplay)

let activeBtn = null;


//enable actions
btns.forEach(function(btn){
    btn.addEventListener('click', handleBtn);
});

tipsBtn.addEventListener('input', tipInput);

people.addEventListener('input', peopleNo);

bill.addEventListener('input', setBillValue);

resetBtn.addEventListener('click', reset)


function validFloat(s){
    var rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx); 
}

function validInt(s){
    var rgx = /^[0-9]*$/;
    return s.match(rgx); 
}

function setBillValue(){ 
    if (bill.value.includes(',')){
        bill.value = bill.value.replace(',','.');
    }

    if (!validFloat(bill.value)){
        bill.value = bill.value.substring(0, bill.value.length-1);
    }

    billValue = parseFloat(bill.value);

    calculateTip();

    //console.log(billValue);
}

function handleBtn(event){
       //set active state
      event.currentTarget.classList.add('active');

       if ((activeBtn = null && activeBtn != event.currentTarget)) {
           event.currentTarget.classList.remove('active');
        }

       activeBtn = event.currentTarget;
         
       tipsValue = parseFloat(activeBtn.value)/100;

       tipsBtn.value = '';

       calculateTip();

        //console.log(tipsValue);
    }

function tipInput(){
    if (!validInt(tipsBtn.value)){
        tipsBtn.value = tipsBtn.value.substring(0, tipsBtn.value.length-1);
    }

    tipsValue = parseFloat(tipsBtn.value)/100;

    calculateTip();

    //console.log(tipsValue);
}

function peopleNo(){
    if (!validInt(people.value)){
        people.value = people.value.substring(0, people.value.length-1);
    }

    noOfPeople = parseFloat(people.value);

    if (noOfPeople <= 0){
        errorDisplay.classList.add('show-error-msg');
    }
    if (noOfPeople != 0){
            errorDisplay.classList.remove('show-error-msg');
        }

    calculateTip();

    //console.log(noOfPeople);
}

//calculate
function calculateTip(){
    if (noOfPeople >= 1){
        let tipAmount = billValue * tipsValue / noOfPeople;
        let total = billValue * (tipsValue + 1) / noOfPeople;
       result[0].innerHTML = '$' + tipAmount.toFixed(2);
       result[1].innerHTML = '$' + total.toFixed(2);
    }
};

function reset(){
    bill.value = '';
    setBillValue()

    people.value = '1';
    peopleNo()

    result[0].innerHTML = '$' + '0.00';
    result[1].innerHTML = '$' + '0.00';
}

