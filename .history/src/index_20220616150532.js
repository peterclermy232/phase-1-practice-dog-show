document.addEventListener('DOMContentLoaded', (e) => {
    console.log('Loaded');
    fetchData();
})

urlPuppy = 'http://localhost:3000/pups'

function fetchData(){
    fetch(urlPuppy)
    .then(resp => resp.json())
    .then (data => data.forEach(function(image) => renderDog(image))) 
}

function renderDog(image){
    //console.log(image);
    
    let newDog = document.createElement('span')
    newDog.innerText = `${image.name}`
    
    let img = document.createElement('img')
    img.setAttribute('src', `${image.image}`)
    let h2 = document.createElement('h2')
    h2.innerText = `${image.name}`
    let btn = document.createElement('button')
    if (image.isGoodDog === true){
        btn.innerText = 'Good Dog!'
    } else {
        btn.innerText = 'Bad Dog!'
    }
    
    newDog.addEventListener('click', (e) => {
        let viewDogContainer = document.querySelector('#dog-info')
        //console.log(viewDogContainer)
        viewDogContainer.append(img, h2, btn)
    })

    btn.addEventListener('click', (e) => {
        if (btn.innerText === 'Good Dog!'){
            btn.innerText = 'Bad Dog!';
            image.isGoodDog = false
        } else {
            btn.innerText = 'Good Dog!';
            image.isGoodDog = true
        }
        makePatch(image)
    })

    let dogContainer = document.querySelector('#dog-bar')
    dogContainer.appendChild(newDog)
    
    //console.log(dogContainer)
}

function makePatch(image){
    fetch(`${urlPuppy}/${image.id}`, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
            id : image.id,
            name: image.name,
            isGoodDog : image.isGoodDog,
            image : image.image
        }) 
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}
