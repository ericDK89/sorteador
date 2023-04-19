const inputNumber = document.getElementById("max-number");
const p = document.getElementById("output-number");

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const sortNumber = Math.round(Math.random() * inputNumber.value);

  if (sortNumber === 0) {
    p.innerHTML = `O número sorteado foi: <span class="sort-span">0${
      sortNumber + 1
    }</span>`;
  } else if (sortNumber > 0 && sortNumber < 10) {
    p.innerHTML = `O número sorteado foi: <span class="sort-span">0${sortNumber}</span>`;
  } else {
    p.innerHTML = `O número sorteado foi: <span class="sort-span">${sortNumber}</span>`;
  }
});
