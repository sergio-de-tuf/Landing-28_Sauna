const menuButton = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileLinks = document.querySelectorAll('.mobile-menu a')

const closeMenu = () => {
  menuButton?.setAttribute('aria-expanded', 'false')
  mobileMenu?.classList.remove('is-open')
  document.body.classList.remove('menu-open')
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
  menuButton.setAttribute('aria-expanded', String(!isOpen))
  mobileMenu?.classList.toggle('is-open', !isOpen)
  document.body.classList.toggle('menu-open', !isOpen)
})

mobileLinks.forEach((link) => link.addEventListener('click', closeMenu))

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu()
})