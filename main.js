const menuButton = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const mobileLinks = document.querySelectorAll('.mobile-menu a')
const firstMobileLink = mobileLinks[0]

const setMenuOpen = (isOpen) => {
  if (!menuButton || !mobileMenu) return

  menuButton.setAttribute('aria-expanded', String(isOpen))
  mobileMenu.classList.toggle('is-open', isOpen)
  mobileMenu.setAttribute('aria-hidden', String(!isOpen))
  mobileMenu.inert = !isOpen
  document.body.classList.toggle('menu-open', isOpen)
}

const closeMenu = (restoreFocus = false) => {
  setMenuOpen(false)
  if (restoreFocus) menuButton?.focus()
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true'
  setMenuOpen(!isOpen)
  if (!isOpen) firstMobileLink?.focus()
})

mobileLinks.forEach((link) => link.addEventListener('click', () => closeMenu()))

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu(true)
  }
})

const hero = document.querySelector('.hero')
const heroBackdrop = document.querySelector('.hero-backdrop')
const desktopMotion = window.matchMedia('(min-width: 761px)')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
let parallaxFrame = 0

const updateParallax = () => {
  parallaxFrame = 0

  if (!hero || !heroBackdrop || !desktopMotion.matches || reducedMotion.matches) {
    heroBackdrop?.style.removeProperty('--hero-parallax-y')
    return
  }

  const progress = Math.max(0, Math.min(hero.offsetHeight, -hero.getBoundingClientRect().top))
  const offset = Math.min(progress * 0.12, 100)
  heroBackdrop.style.setProperty('--hero-parallax-y', `${offset.toFixed(1)}px`)
}

const requestParallaxUpdate = () => {
  if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax)
}

window.addEventListener('scroll', requestParallaxUpdate, { passive: true })
window.addEventListener('resize', requestParallaxUpdate)
desktopMotion.addEventListener('change', requestParallaxUpdate)
reducedMotion.addEventListener('change', requestParallaxUpdate)
requestParallaxUpdate()

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) closeMenu()
})

const contentSections = document.querySelectorAll('main > section:not(.hero)')

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  contentSections.forEach((section, index) => {
    section.classList.add(index % 2 === 0 ? 'reveal-from-left' : 'reveal-from-right')
  })

  document.body.classList.add('has-scroll-reveal')

  const sectionObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return

        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
  )

  contentSections.forEach((section) => sectionObserver.observe(section))
} else {
  contentSections.forEach((section) => section.classList.add('is-visible'))
}