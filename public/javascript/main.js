let typingTimer
const doneTypingInterval = 200
const resultElement = document.getElementById('result')

/**
 * When user start typing
 * @param element
 */
// eslint-disable-next-line no-unused-vars
const onKeyup = (element) => {
  resultElement.innerHTML = ''
  clearTimeout(typingTimer)
  typingTimer = setTimeout(() => doneTyping(element), doneTypingInterval)
}

/**
 * When user stop typing
 */
// eslint-disable-next-line no-unused-vars
const onKeyDown = () => {
  clearTimeout(typingTimer)
}

/**
 * Wait until the timer clear and perform actions.
 * @param element
 */
const doneTyping = (element) => {
  resultElement.innerHTML = ''
  if (element.value.trim() !== '') {
    renderResultElement()
    callApiAndRender(element)
  } else if (element.value.trim() === '') {
    resultElement.style.display = 'none'
  }
}

/**
 * Call apis and render the return data
 * @param element
 */
const callApiAndRender = (element) => {
  let html = ''
  fetch(`/api/v1/search?q=${element.value}`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      if (data.success) {
        html = ''
        html += '<ul>'
        if (data.records !== null && data.records.length > 0) {
          data.records.forEach((item) => {
            html += '<li>'
            if (item.name) {
              html += `<p>${item.name}</p>`
            }
            if (item.short_description) {
              html += `<p style="font-size: 12px; word-break: break-all;">${item.short_description}</p>`
            }
            if (item.apiUrl) {
              html += `<p style="font-size: 12px">${item.apiUrl}</p>`
            }

            html += '</li>'
          })
          html += '</ul>'
        } else if (data.records === null) {
          html += '<li>No record found</li>'
        }
        resultElement.innerHTML = html
        resultElement.style.display = 'block'
      }
    }).catch((error) => {
      renderResultElement(error.name)
    })
}
/**
 * Render result element, if the value is empty then
 * searching .... will be displayed
 * @param value
 */
const renderResultElement = (value) => {
  let html = '<ul>'
  html += `<li>${typeof value === 'undefined' ? 'Searching ....' : value}</li>`
  html += '</ul>'
  resultElement.innerHTML = html
  resultElement.style.display = 'block'
}
