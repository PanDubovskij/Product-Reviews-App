const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";
let arr = ['ZTE Blade A3 NFC', 'Samsung Galaxy A02', 'HUAWEI Y5p', 'Samsung Galaxy A03 Core', 'Alcatel 1SE (2020) 5030D', 'Realme C11 2021', 'ZTE Blade A51', 'Xiaomi Redmi 9A', 'TECNO Spark 7', 'Xiaomi Redmi 9C', 'Samsung Galaxy A12']
let reviews='Amazon\n Good one!\n\nAliexpress\n High quality)\n\nOnliner\n Amazing! Looks well'

function searchSongs(term) {
    let product = arr.find(item=> item==term)
    result.innerHTML = `
    <ul class="songs">
      ${`<li>
      <span><strong>${product}</strong></span>
      <button class="btn" data-artist="${product}" data-songtitle="${product}">Get Reviews</button>
    </li>`     
    }
    </ul>
    `;
}

async function getLyrics(artist, songTitle) {
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();
  console.log(artist, songTitle);
  if (data.error) {

    const lyrics = reviews.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
        <h2><strong>${artist}</strong></h2>
        <span>${lyrics}</span>
    `;
  } else {
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
        <h2><strong>${artist}</strong></h2>
        <span>${lyrics}</span>
    `;
  }
  more.innerHTML = "";
}

async function getMoreSongs(url) {
    const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`); // proxy is required to avoid CORS issue
    const data = await res.json();
    showData(data);
}

function showData(data) {
    result.innerHTML = `
    <ul class="songs">
      ${arr
            .map(
                (item) => `<li>
      <span><strong>${item}</strong></span>
      <button class="btn" data-artist="${item}" data-songtitle="${item}">Get Reviews</button>
    </li>`
            )
            .join("")}
    </ul>
    `;
    // Pagination
    if (data.prev || data.next) {
        more.innerHTML = `
                    ${data.prev
                ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
                : ""
            }
                    ${data.next
                ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
                : ""
            }
                    `;
    } else more.innerHTML = "";
}

function showAlert(message) {
    const notif = document.createElement("div");
    notif.classList.add("toast");
    notif.innerText = message;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

// Event Listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (!searchTerm) showAlert("Please type in a search term");
    else searchSongs(searchTerm);
});
result.addEventListener("click", (e) => {
    const clickedElement = e.target;
    if (clickedElement.tagName === "BUTTON") {
        const artist = clickedElement.getAttribute("data-artist");
        const songTitle = clickedElement.getAttribute("data-songtitle");
        getLyrics(artist, songTitle);
    }
});

showData(arr);