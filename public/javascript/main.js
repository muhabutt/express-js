let typingTimer
const doneTypingInterval = 100
const resultElement = document.getElementById('result')

export const onKeyup = (element) => {
  resultElement.innerHTML = ''
  clearTimeout(typingTimer)
  typingTimer = setTimeout(() => doneTyping(element), doneTypingInterval)
}
export const onKeyDown = () => {
  clearTimeout(typingTimer)
}

export const doneTyping = (element) => {
  let html = ''
  if (element.value.trim() !== '') {
    renderElement()
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
              if (typeof item.id !== 'undefined' && item.id !== '') {
                html += `<li>${item.id}</li>`
              }
            })
            html += '</ul>'
          } else if (data.records === null) {
            html += '<li>No record found</li>'
          }
          resultElement.innerHTML = html
          resultElement.style.display = 'block'
        }
      }).catch((error) => {
        renderElement(error.name)
      })
  } else if (element.value.trim() === '') {
    resultElement.style.display = 'none'
  }
}

const renderElement = (value) => {
  let html = '<ul>'
  html += `<li>${typeof value === 'undefined' ? 'Searching ....' : value}</li>`
  html += '</ul>'
  resultElement.innerHTML = html
  resultElement.style.display = 'block'
}
