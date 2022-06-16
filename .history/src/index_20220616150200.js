document.addEventListener('DOMContentLoaded', () => {
    getPups();
  


function getPups() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(pups => {
      pups.forEach(createPup)
      //filterPups(pups)
    })
    .catch(err => document.querySelector('#dog-bar').textContent = err.message);
  }
  
  function createPup(pup) {
    const span = document.createElement('span');
    span.textContent = pup.name;
    span.addEventListener('click', () => dogInfo(pup))
    const dogBar = document.querySelector('#dog-bar');
    dogBar.appendChild(span);
  }
  
  function dogInfo(pup) {
    const img = document.createElement('img');
    img.src = pup.image;
  
    const h2 = document.createElement('h2');
    h2.textContent = pup.name;
    
    const btn = document.createElement('button');
    btn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    btn.addEventListener('click', e => changeAdjective(e, pup));
  
    const info = document.querySelector('#dog-info')
    const previousInfo = Array.from(info.children);
    if (previousInfo.length > 0) {
      previousInfo.forEach(info => info.remove());
    }
    
    info.append(img, h2, btn);
  }
  
  function changeAdjective(e, pup) {
    const btn = e.target;
    pup.isGoodDog = !pup.isGoodDog;
    btn.textContent = pup.isGoodDog ? 'Good Dog!' : 'Bad Dog!';
    
    fetch(`http://localhost:3000/pups/${pup.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pup)
    })
    .catch(err => document.querySelector('#dog-bar').textContent = err.message)
  }
  
  //when user clicks filterGoodDogs button
    //buttons text should change from 'Filter good dogs: OFF'
      //to 'Filter good dogs: ON' vice versa
    //if button now says ON
      //the dog bar should only show pups whose isGoodDog
      //if off should show all pups like normal
  // let filterOn = false;
  // function filterPups(pups) {
  //   const dogFilter = document.querySelector('#good-dog-filter');
  //   const goodPups = pups.filter(pup => pup.isGoodDog)
  //   console.log(goodPups);
  //   dogFilter.addEventListener('click', () => {
  //     if (!filterOn) {
  //       filterOn = true;
  //       dogFilter.textContent = 'Filter good dogs: ON';
  //       goodPups.forEach(createPup);
  //     } else {
  //       filterOn = false;
  //       dogFilter.textContent = 'Filter good dogs: OFF';
  //     }
  //   })
  // }
  
  
 
 
 
  