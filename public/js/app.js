console.log('Client side javascript file is loaded!')
const search = document.querySelector('#search');
const weatherForm = document.querySelector('form');
const error = document.querySelector('#error');
const success = document.querySelector('#success');
weatherForm.addEventListener('submit', (e)=>{
    const location = search.value
    e.preventDefault();
    // fetch(`http://localhost:3000/weather?address=${location}`)
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                error.textContent = data.error;
                success.textContent = "";
            } else{
                let container = `${data.location}
                PreciProbability: ${data.forecast.precipProbability}
                Summary: ${data.forecast.summary}
                Temperature: ${data.forecast.temperature}`;
                success.textContent = container;
                error.textContent ="";
                // console.log(data.forecast)
            }
        })
    })
        
})