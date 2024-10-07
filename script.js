const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD";

const choices = document.querySelectorAll(".choice select");
const btn = document.querySelector("button");
const input = document.querySelector("input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select ");
const msg = document.querySelector(".msg");

for (let select of choices) {
  for (let curCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curCode;
    newOption.value = curCode;
    if (select.name === "from" && curCode === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && curCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchageRate = async () => {
  let amtVal = input.value;
  if (amtVal <= 0 || amtVal === "") {
    input.value = 1;
    amtVal = 1;
  }
  const URL = `https://api.exchangerate-api.com/v4/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data.rates[toCurr.value];
  let finalAmount = rate * amtVal;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

let updateFlag = (element) => {
  let curCode = element.value;
  let countryCode = countryList[curCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; //Inm
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

document.addEventListener("DOMContentLoaded", () => {
  updateExchageRate();
});

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchageRate();
});
