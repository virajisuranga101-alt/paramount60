// Scroll reveal
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('in') })
}, { threshold: 0.15 })
document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el) })

// Navbar background + mobile menu
var nav = document.getElementById('nav')
var btn = document.getElementById('menu-btn')
var menu = document.getElementById('mobile-menu')
var navOn = ['bg-black/80', 'backdrop-blur-md', 'border-b', 'border-amber-500/20']
function updateNav() {
  var on = window.scrollY > 40 || !menu.hidden
  navOn.forEach(function (c) { nav.classList.toggle(c, on) })
}
function setMenu(open) {
  menu.hidden = !open
  btn.setAttribute('aria-expanded', open)
  var s = btn.querySelectorAll('span')
  s[0].classList.toggle('translate-y-1.5', open); s[0].classList.toggle('rotate-45', open)
  s[1].classList.toggle('opacity-0', open)
  s[2].classList.toggle('-translate-y-1.5', open); s[2].classList.toggle('-rotate-45', open)
  updateNav()
}
btn.addEventListener('click', function () { setMenu(menu.hidden) })
menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false) }) })
window.addEventListener('scroll', updateNav)
updateNav()

// Live clock
function tick() {
  var n = new Date(), s = n.getSeconds(), m = n.getMinutes() + s / 60, h = (n.getHours() % 12) + m / 60
  document.getElementById('h-hour').setAttribute('transform', 'rotate(' + h * 30 + ' 100 100)')
  document.getElementById('h-min').setAttribute('transform', 'rotate(' + m * 6 + ' 100 100)')
  document.getElementById('h-sec').setAttribute('transform', 'rotate(' + s * 6 + ' 100 100)')
}
tick(); setInterval(tick, 1000)

// Hide sponsor logos that fail to load
document.querySelectorAll('img[src*="google.com/s2/favicons"]').forEach(function (img) {
  img.addEventListener('error', function () { img.style.display = 'none' })
})
