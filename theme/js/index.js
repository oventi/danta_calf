export const notify = message => {
  const notifications = document.querySelector('#notifications')
  const id = `notification-${Date.now()}`

  setTimeout(() => {
    notifications.innerHTML += `
      <div id="${id}" class="notification">
      ${message}
      </div>
    `

    const notification = document.querySelector(`#${id}`)
    notification.addEventListener('click', event => {
      event.preventDefault()
      notifications.removeChild(notification)
    })
  }, 10)
}
