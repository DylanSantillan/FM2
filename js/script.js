let bill = document.getElementById('bill-amount'),
    tipButton = document.querySelectorAll('.tip-selector__button'),
    tipCustom = document.getElementById('custom-tip'),
    people = document.getElementById('num-people'),
    amount = document.getElementById('amount'),
    total = document.getElementById('total'),
    reset = document.getElementById('reset');
    // validation
let errorText = document.getElementById('error-text'),
    peopleWrapper = document.getElementById('people-wrapper');


/* ------- BILL ------- */
let billUpdate = 0;

bill.addEventListener('input', () => {
    billUpdate = Number(bill.value)
    calculateValues();
})


/* ------- TIP ------- */
let tipUpdate = 0;
let selectedTipButton = null;

tipButton.forEach(select => {
    select.addEventListener('click', () => {
        if (selectedTipButton !== select) {
            if (selectedTipButton) {
                selectedTipButton.classList.remove('select');
            }
            selectedTipButton = select;
            selectedTipButton.classList.add('select');
            tipUpdate = parseFloat(selectedTipButton.value);
            calculateValues();
        }
    });
});

tipCustom.addEventListener('input', () => {
    if (selectedTipButton) {
        selectedTipButton.classList.remove('select');
        selectedTipButton = null;
    }
    tipUpdate = parseFloat(tipCustom.value);
    if (isNaN(tipUpdate)) {tipUpdate = 0;}
    calculateValues();
});


/* ------- PEOPLE ------- */
let peopleUpdate = 0;

people.addEventListener('input', () => {
    peopleUpdate = Number(people.value)
    if(peopleUpdate === 0){
        errorText.classList.remove('error-disable');
        errorText.classList.add('error-active');
        peopleWrapper.classList.add('error-input');
    } else {
        errorText.classList.remove('error-active');
        errorText.classList.add('error-disable');
        peopleWrapper.classList.remove('error-input');
    }
    calculateValues();
})

/* ------- COUNT ------- */
let amountUpdate = 0;
let totalUpdate = 0;

function calculateValues() {
    if (isNaN(billUpdate) || isNaN(tipUpdate) || peopleUpdate <= 0) {
        amount.innerText = '0.00';
        total.innerText = '0.00';
        return;
    }
    
    if (peopleUpdate === 0) {
        peopleUpdate = 1;
    }
    
    amountUpdate = (billUpdate * (tipUpdate / 100)) / peopleUpdate;
    totalUpdate = (billUpdate + (billUpdate * (tipUpdate / 100))) / peopleUpdate;
    amount.innerText = amountUpdate.toFixed(2);
    total.innerText = totalUpdate.toFixed(2);
}
calculateValues();

/* ------- RESET ------- */
reset.addEventListener('click', () => {
    billUpdate = 0;
    bill.value = '';
    
    tipUpdate = 0;
    tipCustom.value = '';
    
    peopleUpdate = 1;
    people.value = '1';
    
    amountUpdate = 0;
    totalUpdate = 0;
    amount.innerText = '0.00';
    total.innerText = '0.00';
    
    if (selectedTipButton) {
        selectedTipButton.classList.remove('select');
        selectedTipButton = null;
    }
    errorText.classList.remove('error-active');
    errorText.classList.add('error-disable');
    peopleWrapper.classList.remove('error-input');
})
