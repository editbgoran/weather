// console.log("Client side javascript")

// // fetch('http://puzzle.mead.io/puzzle').then((res) => {
// //     res.json().then((data) => {
// //         console.log(data)
// //     })
// // })

//  async function f1() {
//     let response = await fetch('http://puzzle.mead.io/puzzle')
//     let data = await response.json()
//     console.log(data)
// }

// f1()


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener('submit', (e) => {
   
    e.preventDefault()
    const location = search.value 
   
    messageOne.textContent = 'loading message...'
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            console.log(data.error)
            messageOne.textContent = data.error
        }
        else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
            console.log(data.location)
            console.log(data.forecast)
        }
    })
})

})
