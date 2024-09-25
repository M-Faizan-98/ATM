const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const btnMainMenu = document.getElementById('btn-main-menu');
const btn = document.getElementById('btn');
const btn2 = document.getElementById('btn2');
const btn3 = document.getElementById('btn3');
const row1 = document.getElementById('row1');
const h3 = document.getElementById('h3');

let pin = 1234;
let balance = 500;
let attempts = 3;

let p = document.createElement('p');
p.classList.add('empty-input');

function addTask() {
  if (parseInt(inputBox.value) === 1234) {
    inputBox.setAttribute('type', 'number');
    p.remove();
    btn.style.display = 'none';
    h3.style.display = 'block';
    // let li = document.createElement('li');
    // li.setAttribute('id', 'option-1');
    // li.innerHTML = 'Check Balance';
    // listContainer.appendChild(li);
    // let img = document.createElement('img');
    // img.src = 'https://i.postimg.cc/vT4R7bRp/cccircular.png';
    // li.appendChild(img);

    // let li2 = document.createElement('li');
    // li2.setAttribute('id', 'option-2');
    // li2.innerHTML = 'Deposit Cash';
    // listContainer.appendChild(li2);
    // let img2 = document.createElement('img');
    // img2.src = 'https://i.postimg.cc/vT4R7bRp/cccircular.png';
    // li2.appendChild(img2);

    // let li3 = document.createElement('li');
    // li3.setAttribute('id', 'option-3');
    // li3.innerHTML = 'Withdraw Cash';
    // listContainer.appendChild(li3);
    // let img3 = document.createElement('img');
    // img3.src = 'https://i.postimg.cc/vT4R7bRp/cccircular.png';
    // li3.appendChild(img3);

    // let li4 = document.createElement('li');
    // li4.setAttribute('id', 'option-4');
    // li4.innerHTML = 'Exit';
    // listContainer.appendChild(li4);
    // let img4 = document.createElement('img');
    // img4.src = 'https://i.postimg.cc/vT4R7bRp/cccircular.png';
    // li4.appendChild(img4);
    createListItems();
    inputBox.value = '';
    inputBox.style.display = 'none';
  } else {
    if (inputBox.value.length <= 0) {
      row1.appendChild(p);
      inputBox.classList.add('input-empty');
      p.innerHTML = 'Enter a 4 digits Pin';
    } else {
      attempts--;
      inputBox.classList.add('input-empty');
      inputBox.value = '';
      if (attempts > 0) {
        row1.appendChild(p);
        p.innerHTML = `Incorrect Pin!   ${attempts}  chance(s) `;
      } else {
        row1.appendChild(p);
        p.innerHTML = 'No attempts left. Access denied.';
        btn.setAttribute('disabled', 'true');
        inputBox.setAttribute('disabled', 'true');
        inputBox.classList.remove('input-empty');
        btn.style.cursor = 'not-allowed';
      }
    }
  }
}

function selOptions(e) {
  if (e.target == document.getElementById('option-1')) {
    p.innerHTML = 'Your current balance is ' + balance + '$';
    row1.appendChild(p);
    e.target.style.display = 'none';
  } else if (e.target == document.getElementById('option-2')) {
    btn2.style.display = 'block';
    inputBox.placeholder = 'Enter the amount to deposit';
    LiClicked();
  } else if (e.target == document.getElementById('option-3')) {
    btn3.style.display = 'block';
    inputBox.placeholder = 'Enter the amount to withdraw';
    LiClicked();
  } else if (e.target == document.getElementById('option-4')) {
    // listContainer.style.display = 'none';
    // h3.style.display = 'none';
    // inputBox.style.display = 'none';
    // btn.style.display = 'none';
    // btn2.style.display = 'none';
    // btn3.style.display = 'none';
    // btnMainMenu.style.display = 'none';
    const elementsToHide = [
      'list-container',
      'h3',
      'input-box',
      'btn',
      'btn2',
      'btn3',
      'btn-main-menu',
    ];

    elementsToHide.forEach((element) => {
      document.querySelector(`#${element}`).style.display = 'none';
    });
    row1.appendChild(p);
    p.innerHTML = 'Exiting the ATM. Thank you for using our service';
    setTimeout(function () {
      location.reload();
    }, 1500);
  }
}

listContainer.addEventListener('click', selOptions);
btn.addEventListener('click', addTask);

btn2.addEventListener('click', () => {
  if (inputBox.value >= 1 && inputBox.value !== '') {
    balance += parseInt(inputBox.value);
    row1.appendChild(p);
    inputBox.nextElementSibling.innerHTML =
      inputBox.value +
      '$ Deposit Successfully </br> Your new balance is ' +
      balance +
      ' $';
    btn2.style.display = 'none';
    DepositWithdrawBtnClicked();
    // h3.style.display = 'block';
    // listContainer.style.display = 'block';
    // listContainer.firstChild.style.display = 'block';
    // inputBox.style.display = 'none';
    // btnMainMenu.style.display = 'none';
  } else {
    row1.appendChild(p);
    inputBox.classList.add('input-empty');
    p.innerHTML = 'Please enter a valid amount ';
  }
});

btn3.addEventListener('click', () => {
  if (
    inputBox.value <= balance &&
    inputBox.value >= 1 &&
    inputBox.value !== ''
  ) {
    balance -= parseInt(inputBox.value);
    row1.appendChild(p);
    inputBox.nextElementSibling.innerHTML =
      inputBox.value +
      '$ Withdraw Successfully </br> Your new balance is ' +
      balance +
      ' $';

    btn3.style.display = 'none';
    DepositWithdrawBtnClicked();
    // h3.style.display = 'block';
    // listContainer.style.display = 'block';
    // listContainer.firstChild.style.display = 'block';
    // inputBox.style.display = 'none';
    // btnMainMenu.style.display = 'none';
  } else if (inputBox.value < 1 || inputBox.value == '') {
    row1.appendChild(p);
    inputBox.classList.add('input-empty');
    p.innerHTML = 'Please enter a valid amount ';
  } else {
    row1.appendChild(p);
    p.innerHTML = 'Insufficient balance! You have only ' + balance + '$';
  }
});

btnMainMenu.addEventListener('click', () => {
  listContainer.style.display = 'block';
  listContainer.firstChild.style.display = 'block';
  h3.style.display = 'block';
  inputBox.style.display = 'none';
  btn2.style.display = 'none';
  btn3.style.display = 'none';
  btnMainMenu.style.display = 'none';
  p.remove();
  const elementsToHide = ['input-box', 'btn2', 'btn3', 'btn-main-menu'];

  elementsToHide.forEach((element) => {
    document.querySelector(`#${element}`).style.display = 'none';
  });
});

//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////

function LiClicked() {
  p.remove();
  h3.style.display = 'none';
  inputBox.value = '';
  inputBox.classList.remove('input-empty');
  inputBox.style.display = 'block';
  listContainer.style.display = 'none';
  btnMainMenu.style.display = 'block';
}
function DepositWithdrawBtnClicked() {
  h3.style.display = 'block';
  listContainer.style.display = 'block';
  listContainer.firstChild.style.display = 'block';
  inputBox.style.display = 'none';
  btnMainMenu.style.display = 'none';
}

let liElements = [];
let liNames = ['Check Balance', 'Deposit', 'Withdraw', 'Exit'];

function createListItems() {
  for (let i = 0; i < 4; i++) {
    let li = document.createElement('li');
    let liName = `Item ${liElements.length + 1}`;
    li.setAttribute('id', `option-${liElements.length + 1}`);
    li.textContent = liNames[i];
    listContainer.appendChild(li);
    let img = document.createElement('img');
    img.src = 'https://i.postimg.cc/vT4R7bRp/cccircular.png';
    li.appendChild(img);
    liElements.push(li);
  }
}
