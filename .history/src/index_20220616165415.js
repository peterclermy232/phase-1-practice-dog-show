const findId = (id) => document.getElementById(id);
const createEl = (element) => document.createElement(element);

//Declare Variables Globally
const dogsUrl = `http://localhost:3000/pups`;
const dogBar = findId(`dog-bar`);
const dogInfo = findId(`dog-info`);
const dogPic = createEl(`img`);
const dogH2 = createEl(`h2`);
const dogButton = createEl(`button`);

//Fetch from API
function fetchPups() {
  fetch(`http://localhost:3000/pups`)
    .then((response) => response.json())
    .then((pups) => pups.forEach(renderPups));
}

//Challenge 1

function renderPups(pups) {
  const dogNameSpan = createEl(`span`);
  dogNameSpan.textContent = pups.name;
  dogBar.appendChild(dogNameSpan);

  //Challenge 2
  dogNameSpan.addEventListener(`click`, (e) => {
    const dogStatus = pups.isGoodDog;
    dogPic.src = pups.image;
    dogH2.innerText = pups.name;
    dogButton.textContent = dogStatus ? `Good Dog` : `Bad Dog`;
    dogInfo.append(dogPic, dogH2, dogButton);
  });
}

fetchPups();
