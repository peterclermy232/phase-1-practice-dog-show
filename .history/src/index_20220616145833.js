document.addEventListener('DOMContentLoaded', init)

function init(){
    fetch('http://localhost:3000/pups')
    .then(res=>res.json())
    .then(data=>display(data))
    
}

function display(pups){
    // console.log(pups.length)
    
    const div = document.querySelector('#dog-bar')
    
    // console.log(dogs.pups)
    pups.forEach(pup=>{
        const span = document.createElement('span')
        // console.log(pup)
        // console.log(pup.name)
        span.innerText=pup.name
        div.appendChild(span)
        span.addEventListener('click', ()=>{
            const dogDiv = document.querySelector('#dog-info')
            let img = document.createElement('img');
            let h2 = document.createElement('h2');
            let pupBtn = document.createElement('button')
            img.src=pup.image;
            h2.textContent = pup.name;

            if(pup.isGoodDog ===true){
                pupBtn.textContent = 'Good Dog!'
            } else {
                pupBtn.textContent = 'Bad Dog!'
            };
            
            pupBtn.addEventListener('click',()=>{
                if (pupBtn.textContent === 'Good Dog!'){
                    pupBtn.textContent = 'Bad Dog!'
                    pup.isGoodDog = false
                }else{ pupBtn.textContent = 'Good Dog!'
            pup.isGoodDog=true}
                updateDoggo(pup);
            })
            dogDiv.append(img,h2,pupBtn)
        })
    })
  
}
function updateDoggo(pup){
    fetch(`http://localhost:3000/pups/${pup.id}`,{
        method: 'PATCH',
        headers:{
            'Content-type': 'application/json'
        },
        body: JSON.stringify(pup)
    })
    .then(res=>res.json())
    .then(pup=> console.log(pup))
    
}
