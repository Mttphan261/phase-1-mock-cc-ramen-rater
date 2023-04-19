// write your code here

document.addEventListener('DOMContentLoaded', () => {

//make a fetch GET request to the API
fetch('http://localhost:3000/ramens') //url for the fetch
.then(response => response.json()) //always turn json to js 
.then((ramenData) =>  ramenData.forEach((ramen) => renderImage(ramen), //establish the json array as ramenData, then fat arrow into ramenData.forEach, calling the renderImage function. Comma, then displayRamen(ramenData[0]) to display the first ramen on load.
displayRamen(ramenData[0])
))


// As a user, I can:

// - See all ramen images in the `div` with the id of `ramen-menu`. When the page
//   loads, request the data from the server to get all the ramen objects. Then,
//   display the image for each of the ramen using an `img` tag inside the
//   `#ramen-menu` div.

const menu = document.getElementById('ramen-menu') //declare menu as the 'ramen-menu' div, where all the images will be appended to. 

// **Creating ramen images on the div, top of the page.**

function renderImage(ramen) { //function to create the ramen images, taking ramen as an object
const img = document.createElement('img') //declare img, to create new images at the top
img.src = ramen.image //set img src to ramen.image from the JSON
menu.appendChild(img) //append the imgs we created to the menu div

img.addEventListener('click', () => displayRamen(ramen)) //add an event listener to the img to call the displayRamen function

}

// - Click on an image from the `#ramen-menu` div and see all the info about that
//   ramen displayed inside the `#ramen-detail` div and where it says
//   `insert comment here` and `insert rating here`.

function displayRamen(ramen) {
    const display = document.getElementById('ramen-detail') //did not need
    const imgDisplay = document.getElementById('ramen-img')
    imgDisplay.src = ramen.image
    const h2 = document.querySelector('h2')
    h2.textContent = ramen.name
    const h3 = document.getElementById('restaurant')
    h3.innerText = ramen.restaurant

    const rating = document.getElementById('rating-display')
    rating.textContent = ramen.rating
    const comment = document.getElementById('comment-display')
    comment.textContent = ramen.comment
    console.log(comment)
}

// - Create a new ramen after submitting the `new-ramen` form. The new ramen should
//   be added to the`#ramen-menu` div. The new ramen does not need to persist; in
//   other words, if you refresh the page, it's okay that the new ramen is no
//   longer on the page.


const form = document.querySelector('form');
console.log(form)

function handleSubmit(e) {
    e.preventDefault();
    let newRamen = {
        name: e.target.name.value,
        restaurant: e.target.restaurant.value,
        image: e.target.image.value,
        rating: e.target.rating.value,
        comment: e.target.comment.value,
    }
    handleNewRamen(newRamen)
}

form.addEventListener('submit', handleSubmit)

function handleNewRamen(newRamen) {
    fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRamen)
    }
        )
        .then ((response) => response.json())
        .then (ramen => renderImage(ramen))   
    }
})