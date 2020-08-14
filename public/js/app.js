const weatherForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = searchInput.value
    fetch('/weather?address='+ location).then((response) =>{
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = data.error
            messageTwo.textContent = ''
        }
        else{
            console.log(data.forecast)
            messageOne.textContent = 'Local time: ' + data.forecast.localTime + ', temperatura:  ' 
            + data.forecast.temperature +'. Rain probality ' + (data.forecast.rain * 100)   + '%. Humidity is '+
            data.forecast.humidity + '%'
            messageTwo.textContent = 'Location: ' + data.location
        }
    })
}).catch((error)=>{
})
    console.log(location)
})