const humberger = document.querySelector(".humberger");
const navBar = document.querySelector(".slide-bar");
humberger.addEventListener("click", function (e) {
  navBar.classList.toggle("is-active");
});
window.addEventListener("click", function (e) {
  console.log(e.target);
  if (!navBar.contains(e.target) && !e.target.matches(".humberger")) {
    navBar.classList.remove("is-active");
  }
});
