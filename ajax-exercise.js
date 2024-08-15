import axios from 'axios';

// PART 1: Show Dog Photo

async function showDogPhoto(evt) {
  // TODO: get a random photo from the Dog API and show it in the #dog-image div
  const response = await axios.get('https://dog.ceo/api/breeds/image/random')
  const dogUrl = response.data.message
  document.querySelector('#dog-image').innerHTML = `<img src="${dogUrl}">`
}

document.querySelector('#get-dog-image').addEventListener('click', showDogPhoto);

// PART 2: Show Weather

async function showWeather(evt) {
  const zipcode = document.querySelector('#zipcode-field').value;
  const response = await axios.get(`/weather.txt?zipcode=${zipcode}`)
  document.querySelector('#weather-info').innerText = response.data.forecast
  // TODO: request weather with that URL and show the forecast in #weather-info
}

document.querySelector('#weather-button').addEventListener('click', showWeather);

// PART 3: Order Cookies

async function orderCookies(evt) {
  evt.preventDefault()
  const qty = document.querySelector('#qty-field').value
  const cookieType = document.querySelector('#cookie-type-field').value

  const response = await axios.post('/order-cookies.json', {
    qty,
    cookieType
  })

  const resultCode = response.data.resultCode
  const message = response.data.message
  document.querySelector('#order-status').innerText = message
  if (resultCode === "ERROR") {
    document.querySelector('#order-status').classList.add('order-error')
  } else {
    document.querySelector('#order-status').classList.remove('order-error')
  }
  
  // TODO: Need to preventDefault here, because we're listening for a submit event!
  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
}
document.querySelector('#order-form').addEventListener('submit', orderCookies);

// PART 4: iTunes Search

function iTunesSearch(evt) {
  evt.preventDefault();
  const searchTerm = document.querySelector("#search-term").value;
  const formData = {'term' : searchTerm}
  const queryString = new URLSearchParams(formData).toString()
  const url = `https://itunes.apple.com/search?${queryString}`
  
  axios.get(url)
    .then((res) => {
      console.log(res.data)
      let songInfo = ""
      for (const song of res.data.results) {
        songInfo += `<li>Artist: ${song.artistName} | Song Title: ${song.trackName}</li>` 
      }
      document.querySelector('#itunes-results').innerHTML = songInfo
    })
  

  // TODO: In the #itunes-results list, show all results in the following format:
  // `Artist: ${artistName} Song: ${trackName}`
}
document.querySelector('#itunes-search-form').addEventListener('submit', iTunesSearch);


async function getPokeInfo(evt) {
  evt.preventDefault()

  const pokeNum = document.querySelector('#pokenumber').value
  if (pokeNum < 1 || pokeNum > 1025) {
    return document.querySelector('#poke-status').innerText = "Not a valid Pokemon. Try Again"
  }
  const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`)
  const pokeDiv = document.querySelector('#poke-info')
  let pokeInfoStr = ''
  const name = response.data.name
  const abilityArr = response.data.abilities
  const typeArr = response.data.types
  let typeCombo = []
  const spriteUrl = response.data.sprites.front_default

  pokeInfoStr += `<p>Name: ${name}</p>`
  for (const abi of abilityArr) {
    pokeInfoStr += `<p>Ability ${abilityArr.indexOf(abi)+1}: ${abi.ability.name}</p>`
  }
  for (const type of typeArr) {
    typeCombo.push(type.type.name)
  }
  pokeInfoStr += `<p>Type: ${typeCombo.join(", ")}</p>`

  pokeInfoStr += `<img src="${spriteUrl}">`


  pokeDiv.innerHTML = pokeInfoStr
}

document.querySelector('#pokemon-form').addEventListener('submit', getPokeInfo)