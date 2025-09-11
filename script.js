const form = document.querySelector("form");
const result = document.getElementById("result");

// Ensure result wrapper structure for consistent styling
function ensureResultStructure(){
    if(!document.querySelector('.result-wrapper')){
        const wrapper = document.createElement('div');
        wrapper.className = 'result-wrapper';
        const pill = document.createElement('div');
        pill.className = 'bmi-pill';
        pill.setAttribute('aria-hidden','true');
        pill.innerHTML = '<span class="val">--</span>';
        const box = document.createElement('div');
        box.id = 'result-box';
        box.innerHTML = '<div class="bmi-value">Your BMI will appear here</div><div class="bmi-desc">Enter values and press Calculate</div>';
        wrapper.appendChild(pill);
        wrapper.appendChild(box);
        result.appendChild(wrapper);
    }
}

ensureResultStructure();

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const heightInput = document.querySelector('#height');
    const weightInput = document.querySelector('#weight');
    const height = parseFloat(heightInput.value);
    const weight = parseFloat(weightInput.value);

    const pill = document.querySelector('.bmi-pill');
    const valSpan = pill.querySelector('.val');
    const valueBox = document.querySelector('#result-box');
    const valueText = valueBox.querySelector('.bmi-value');
    const descText = valueBox.querySelector('.bmi-desc');

    // validation
    if(isNaN(height) || height <= 0){
        valueText.textContent = 'Please enter a valid height (cm)';
        descText.textContent = '';
        pill.className = 'bmi-pill pill-over';
        valSpan.textContent = '—';
        return;
    }
    if(isNaN(weight) || weight <= 0){
        valueText.textContent = 'Please enter a valid weight (kg)';
        descText.textContent = '';
        pill.className = 'bmi-pill pill-over';
        valSpan.textContent = '—';
        return;
    }

    const bmi = +(weight / (height * height) * 10000).toFixed(2);
    valSpan.textContent = bmi;
    valueText.innerHTML = `Your BMI is <strong>${bmi}</strong> kg/m<sup>2</sup>`;

    // classify correctly
    let category = '';
    if(bmi < 18.6){
        category = 'Underweight';
        pill.className = 'bmi-pill pill-under';
    } else if(bmi >= 18.6 && bmi <= 24.9){
        category = 'Normal weight';
        pill.className = 'bmi-pill pill-normal';
    } else {
        category = 'Overweight';
        pill.className = 'bmi-pill pill-over';
    }

    descText.textContent = `(${category})`;

    // update accessible live region text
    result.setAttribute('aria-live','polite');
    result.setAttribute('aria-atomic','true');
});