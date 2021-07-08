// Step 1
function fetchDogs(cb) {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => json.forEach(cb))
}

// Step 2
function renderDogBar(dog) {
    let span = document.createElement('span')

    span.textContent = dog.name

    document.querySelector('#dog-bar').append(span)

    span.addEventListener('click', (e) => {
        document.querySelector('#dog-info').innerHTML = ''
        renderDogInfo(dog)
    })
}

// Step 3
function renderDogInfo(dog) {
    let img = document.createElement('img')
    let h2Name = document.createElement('h2')
    let button = document.createElement('button')

    img.src = dog.image
    h2Name.textContent = dog.name
    button.textContent = (dog.isGoodDog ? 'Good Dog!' : 'Bad Dog!')

    document.querySelector('#dog-info').append(img, h2Name, button)

    // Step 4
    button.addEventListener('click', (e) => {
        let isGoodDog
        if (button.textContent === 'Good Dog!') {
            button.textContent = 'Bad Dog!'
            isGoodDog = false
            patchRequest(dog.id, isGoodDog)
        } else {
            button.textContent = 'Good Dog!'
            isGoodDog = true
            patchRequest(dog.id, isGoodDog)
        }
    })
}

// Step 4: PATCH
function patchRequest(id, isGoodDog) {
    fetch(`http://localhost:3000/pups/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            isGoodDog: isGoodDog
        })
    })
    .then(res => res.json())
    .then(json => json)
}

//Step 5
document.querySelector('#good-dog-filter').addEventListener('click', (e) => {
    let dogBar = document.querySelector('#dog-bar')

    if (e.target.innerText === 'Filter good dogs: OFF') {
        dogBar.innerHTML = ''
        e.target.innerText = 'Filter good dogs: ON'
        fetchGoodDogs(renderDogBar)
    } else {
        dogBar.innerHTML = ''
        e.target.innerText = 'Filter good dogs: OFF'
        fetchDogs(renderDogBar)
    }
})

function fetchGoodDogs(cb) {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(json => {
        let data = json.filter(dog => dog.isGoodDog === true)
        data.forEach(cb)
    })
}

// Initial Render 
function initialRender() {
    fetchDogs(renderDogBar)
}

initialRender()