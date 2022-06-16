document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/dogs")
        .then(resp => resp.json())
        .then(data => slideDog(data))

    function slideDog(data) {
        data.forEach(dog => {
            const dogBar = document.querySelector("#dog-bar")
            const newDog = document.createElement('span')

            // When a user clicks on a pup's span in the div#dog-bar, that pup's info (image, name, and isGoodDog status) 
            function displayDog() {
                const container = document.querySelector("#dog-info")
                const button = document.createElement("button")
                button.id = "dog-container-btn"
                if (dog.isGoodDog === true) {
                    button.innerText = "Good Dog!"
                } else if (dog.isGoodDog === false) {
                    button.innerText = "Bad Dog!"
                }
                container.innerHTML = ` <h2>${dog.name}</h2> 
                <img src=${dog.image}>`
                container.append(button)
                button.addEventListener("click", toggleGoodDog)
                }
            // When a user clicks the Good Dog/Bad Dog button, two things should happen:
            // Determine what the dogs status, switch to whatever the opposite is
            // Send that on the fetch PATCH
            // The button's text should change from Good to Bad or Bad to Good
            // The corresponding pup object in the database should be updated to reflect the new isGoodDog value
            // You can update a dog by making a PATCH request to /pups/:id and including the updated isGoodDog status in the body of the request.
            function toggleGoodDog (e) {
                if (e.target.innerText === "Good Dog!"){
                    e.target.innerText = "Bad Dog!"
                    dog.isGoodDog = false
                } else {
                    e.target.innerText = "Good Dog!"
                    dog.isGoodDog = true
                }
                // console.log(e.target.innerText)
                console.log(dog.isGoodDog)
                fetch('http://localhost:3000/dogs/3', {
                    method: 'PATCH',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    body: JSON.stringify({isGoodDog: dog.isGoodDog}),
                })
                .then(resp => resp.json())
                .then(data => (data))
            }

            
            newDog.addEventListener("click", displayDog)
            newDog.textContent = dog.name
            dogBar.append(newDog)
        })

    }







})
