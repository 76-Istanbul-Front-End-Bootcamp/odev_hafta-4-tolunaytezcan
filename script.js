const data = {
  USD: { EUR: 0.82, GBP: 0.74, TRY: 7.57 },
  EUR: { USD: 1.23, GBP: 0.91, TRY: 9.22 },
  GBP: { USD: 1.35, EUR: 1.10, TRY: 10.23 },
  TRY: { EUR: 0.11, GBP: 0.098, USD: 0.13 },
};

const currencyKeys = Object.keys(data);

function createCurrencyElements(elements, root, inputName) {
  for (let i = 0; i < elements.length; i++) {
    const currencyKeyDiv = document.createElement("div");
    const currencyKeyInput = document.createElement("input");
    currencyKeyInput.setAttribute("type", "radio");
    currencyKeyInput.setAttribute("name", inputName);
    currencyKeyInput.setAttribute("id", inputName + elements[i]);
    currencyKeyInput.setAttribute("value", elements[i]);

    const currencyKeyLabel = document.createElement("label");
    currencyKeyLabel.setAttribute("for", inputName + elements[i]);
    currencyKeyLabel.textContent = elements[i];

    currencyKeyDiv.appendChild(currencyKeyInput);
    currencyKeyDiv.appendChild(currencyKeyLabel);
    root.appendChild(currencyKeyDiv);
  }
}

//from
const parentEl = document.querySelector("#currency-box-from");
const fromInputName = "currency_from";
createCurrencyElements(currencyKeys, parentEl, fromInputName);

// to
const parentToEl = document.querySelector("#currency-box-to");
const toInputName = "currency_to";
createCurrencyElements(currencyKeys, parentToEl, toInputName);


const calculateButton = document.querySelector("#calculate-button");
calculateButton.addEventListener("click", function () {
  const fromTarget = document.querySelector("input[name='currency_from']:checked");
  const toTarget = document.querySelector("input[name='currency_to']:checked");
  const currencyResult = document.querySelector("#currency-result");
  const amount = document.querySelector("input[name='amount']")

  const fromTargetValue = fromTarget ?.value;
  const toTargetValue = toTarget ?.value;
  const amountValue = Number(amount.value);

  if (!fromTarget && !toTarget) {
    return currencyResult.innerHTML = "Please make a choice"
  }
  if (!fromTarget) {
    return currencyResult.innerHTML = "Please choose first exchange"
  }
  if (!toTarget) {
    return currencyResult.innerHTML = "Please choose second exchange"
  }
  if (fromTargetValue === toTargetValue) {
    return currencyResult.innerHTML = "Please choose a different exchange rate"
  }
  if (typeof amountValue !== "number" || isNaN(amountValue)) {
    return currencyResult.innerHTML = "Please enter numbers only"
  }

  const currentCurrencyObject = data[fromTargetValue];
  const resultForOne = currentCurrencyObject[toTargetValue];
  const result = amountValue * resultForOne;

  currencyResult.innerHTML = 
  `${amountValue} ${fromTargetValue} = ${result} ${toTargetValue}
  (1${fromTargetValue}= ${resultForOne}${toTargetValue})`
});