const converterForm = document.getElementById("converter-form"); 
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const amountInput = document.getElementById("amount");
const resultDiv = document.getElementById("result");


window.addEventListener("load", fetchCurrencies);

converterForm.addEventListener("submit", convertCurrency);

async function fetchCurrencies(){
  const response = await fetch("https://v6.exchangerate-api.com/v6/2e2a0639f23def7cc52ad5bd/latest/USD");
  const data = await response.json();

const currencyOptions = Object.keys(data.conversion_rates);

currencyOptions.forEach((currency) => {
  const option1 = document.createElement("option");
  option1.value = currency;
  option1.textContent = currency;
  fromCurrency.appendChild(option1);

  const option2 = document.createElement("option");
  option2.value = currency;
  option2.textContent = currency;
  toCurrency.appendChild(option2)
})
}

async function convertCurrency(e){
 e.preventDefault();

 const amount = parseFloat(amountInput.value);
 const fromCurrencyValue = fromCurrency.value;
 const toCurrencyValue = toCurrency.value;

 if(amount < 0){
  alert("Please enter a valid amount");
  return;
 }

 const response = await fetch (`https://v6.exchangerate-api.com/v6/2e2a0639f23def7cc52ad5bd/latest/${fromCurrencyValue}`);
 const data = await response.json();

 const rate = data.conversion_rates[toCurrencyValue];
 const convertedAmount = (amount * rate).toFixed(2);

 resultDiv.textContent = `${amount} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
}