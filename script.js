const generatedQuotes = document.getElementById("generatedQuotes");
const generateButton = document.getElementById("generateButton");
const deleteButton = document.getElementById("deleteButton");
const loader = document.getElementById("loader");
const dislikeButton = document.getElementById("dislike");
const dislikeList = document.getElementById("dislike-list");
const twitterShare = document.getElementById("twitterShare");
const copyToClipboard = document.getElementById('copy');

const dislikedQuotes = [];
let quotes = [];


window.addEventListener("load", () => {
    fetch('https://api.gameofthronesquotes.xyz/v1/random/5')
        .then(response => response.json())
        .then(data => {
            quotes = data.map(quote => quote.sentence);
            generateButton.addEventListener('click', () => {
                generateButton.innerHTML = `<i class="fa-solid fa-sync fa-spin"></i> generating...`;
                generateButton.style.opacity = 0.5;
                    if (quotes.length > 0) {
                const availableQuotes = quotes.filter(quote => !dislikedQuotes.includes(quote));
                console.log(availableQuotes);
                if (availableQuotes.length > 0) {
                    const random = Math.floor(Math.random() * availableQuotes.length);
                    const currentQuote = availableQuotes[random];
                    generatedQuotes.textContent = currentQuote;
                    } else {
                        generatedQuotes.textContent = "No quotes available.";
                        generateButton.disabled = true;
                    }
                }
                generateButton.innerHTML = `New Quote`;
                generateButton.style.opacity = 1;
                generateButton.disabled = false;
            });
            if (quotes.length > 0) {
                generatedQuotes.textContent = quotes[0];
            } else {
                generatedQuotes.textContent = "No quotes available.";
            }
        })
        .catch(error => {
            setTimeout(() => {
                
        }, 30000);
        });
});


dislikeButton.addEventListener('click', () => {
    const currentQuote = generatedQuotes.textContent;
    if (!dislikedQuotes.includes(currentQuote)) {
        dislikedQuotes.push(currentQuote);
        const li = document.createElement('li');
        li.className = 'flex justify-between my-4';
        li.innerHTML = `
            <p class="text-[0.7rem] px-4">${currentQuote}</p>
            <img src="./images/remove.png" class="w-4 h-4 deleteButton"/>
        `;
        const deleteImg = li.querySelector('.deleteButton');
        deleteImg.addEventListener('click', () => {
            dislikeList.removeChild(li);
            const index = dislikedQuotes.indexOf(currentQuote);
            if (index > -1) {
                dislikedQuotes.splice(index, 1);
            }
        });
        dislikeList.appendChild(li);
    }
});


twitterShare.addEventListener('click', () => {
    const currentQuote = generatedQuotes.textContent;
    twitterShare.setAttribute('href', `https://x.com/intent/post?text=${currentQuote}`);
    console.log(currentQuote)
})

copyToClipboard.addEventListener('click', () => {
    const currentQuote = generatedQuotes.textContent;

    navigator.clipboard.writeText(currentQuote);
})