console.log("related to public folder")

//client side module to fetch the api data
// fetch('http://puzzle.mead.io/puzzle')
//     .then((response) =>{
//         response.json().then((data)=>{
//             console.log(data);
//         })
//     })



const weatherForm = document.querySelector('form')
const searchLocation = document.querySelector('input');
const messageOne = document.querySelector('#msg-1');
const messageTwo = document.querySelector('#msg-2');


weatherForm.addEventListener('submit',(event)=>{

    event.preventDefault();     //prevents default behavior of refreshing page
    const location = searchLocation.value;

    messageOne.textContent = "Loading.....";
    messageTwo.textContent = "";

    fetch('http://localhost:3000/weather?address='+location)
    .then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = data.error;
            } else{
                messageOne.textContent = data.location;
                messageTwo.textContent = data.temperature;
            }
        })
    });

})