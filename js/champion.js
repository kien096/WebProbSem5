const galeries = document.querySelector(".galeries");
const galeriesWrapper = document.querySelector(".galeries-wrapper");
const galeryItem = document.querySelectorAll(".galery-item");
const search = document.querySelector(".search");
const loading = document.querySelector(".loading");
const errorSearch = document.querySelector(".error_search");
const endpoint = "http://localhost:3000/galeries";

const handleErrorWithAxios = (promise) => {
  return promise
    .then((data) => [undefined, data])
    .catch((error) => [error, undefined]);
};

function debounceFn(func, wait, immediate) {
  let timeout;
  return function () {
    let context = this,
      args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

function renderItem(item) {
  const template = `<div class="galery-item">
    <img
      src="${item.url}"
      alt=""
      class="galery-image"
    />
    <p class="galery-title">${item.title}</p>
  </div> `;
  galeries.insertAdjacentHTML("beforeend", template);
}

async function getGaleries(link = endpoint) {
  loading.style.display = "inline-block";
  //   let errors, response;
  errorSearch.textContent = "";
  try {
    const response = await fetch(link);
    const data = await response.json();
    galeries.innerHTML = "";
    if (data.length) {
      data.forEach((item) => renderItem(item));
    }
  } catch (errors) {
    errorSearch.textContent = "An error has occurred";
  }

  loading.style.display = "none";
}
const handleSearch = (e) => {
  const input = e.target.value;
  const link = `${endpoint}?title_like=${input}`;
  getGaleries(link);
};

search.addEventListener("input", debounceFn(handleSearch, 500));

getGaleries(endpoint);
