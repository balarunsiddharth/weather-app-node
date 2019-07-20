console.log('public js loded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value
  if (location) {
    messageOne.textContent = 'Loading'

    fetch('/weather?address=' + location).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          //   console.log(data.error)
          messageOne.textContent = data.error
          messageTwo.textContent = ''
        } else {
          //   console.log(data.loc)
          //   console.log(data.forecast)
          messageOne.textContent = data.loc
          messageTwo.textContent = 'It ' + data.forecast.temp + ' degree temprature out there, so ' + data.forecast.pP + '% chanse to rain.'
        }
      })
    })
  } else { messageOne.textContent = 'enter a location' }
})
