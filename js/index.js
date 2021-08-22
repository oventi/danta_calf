// you can import exposed functions from the theme
import {notify} from '../theme/js'

/*
 * wait till this document is loaded and then run this code
 * any browser js can be added here
 */
document.addEventListener('DOMContentLoaded', () => {
  return

  const is_home = document.querySelector('body').classList.contains('home')

  if(is_home) {
    notify('Petitions for a just, fair and sustainable society (click to dismiss)')
  }
})
