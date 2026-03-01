const body = document.querySelector('body');
const sun = document.getElementById('sun');
const moon = document.getElementById('moon');

const BTN = document.getElementById('btn');
const result = document.getElementById('result');
const inp = document.querySelector('input');

const openJournal = document.getElementById("openJournal");
const journalPopup = document.getElementById("journalPopup");
const backBtn = document.getElementById("backBtn");
const tradeList = document.getElementById("tradeList");
// const tradeItem = document.getElementById("trade-item");
const clearTradesBtn = document.getElementById("clearTrades");

const stats = document.querySelector(".stats");

const totalTradesEl = document.getElementById("totalTrades");
const totalWinsEl = document.getElementById("totalWins");
const totalLossesEl = document.getElementById("totalLosses");
const winRateEl = document.getElementById("winRate");



let theme;

// dark and light mode
moon.addEventListener('click', darkmode);
sun.addEventListener('click', lightmode);


function darkmode() {
    theme = 'dark';

    moon.style.display = 'none';
    sun.style.display = 'block';

    // change colors
    body.style.backgroundColor = 'black';
    body.style.color = '#D9E3E5';

    openJournal.style.backgroundColor = 'white';
    openJournal.style.color = 'black';

    journalPopup.style.backgroundColor = 'black';
    journalPopup.style.color = '#D9E3E5';

    clearTradesBtn.style.backgroundColor = 'white';
    clearTradesBtn.style.color = 'black';

    // backBtn.style.backgroundColor = 'white';
    // backBtn.style.color = 'black';
    
    BTN.style.backgroundColor = 'white';
    BTN.style.color = 'black';

    result.style.backgroundColor = 'white';
    result.style.color = 'black';


    localStorage.setItem('theme', JSON.stringify(theme))

}



function lightmode() {
    theme = 'light';

    moon.style.display = 'block';
    sun.style.display = 'none';

    // change colors
    body.style.backgroundColor = '#fff';
    body.style.color = '#04090F';

    openJournal.style.backgroundColor = 'black';
    openJournal.style.color = 'white';

    journalPopup.style.backgroundColor = '#fff';
    journalPopup.style.color = '#black';

    clearTradesBtn.style.backgroundColor = '#fff';
    clearTradesBtn.style.color = 'black';

    // backBtn.style.backgroundColor = '#fff';
    // backBtn.style.color = 'black';

    BTN.style.backgroundColor = 'black';
    BTN.style.color = 'white';

    result.style.backgroundColor = 'black';
    result.style.color = 'white';
    
    localStorage.setItem('theme', JSON.stringify(theme))
}




let parsedTheme = JSON.parse(localStorage.getItem('theme'))

if(parsedTheme === 'dark' ) {
    moon.style.display = 'none';
    sun.style.display = 'block';

    // change colors
    body.style.backgroundColor = 'black';
    body.style.color = '#D9E3E5';
    BTN.style.backgroundColor = 'white';
    BTN.style.color = 'black';

    result.style.backgroundColor = 'white';
    result.style.color = 'black';

    input.style.backgroundColor = 'black';
    input.style.border = '1px solid white';

    openJournal.style.backgroundColor = 'white';
    openJournal.style.color = 'black';

    clearTradesBtn.style.backgroundColor = 'white';
    clearTradesBtn.style.color = 'black';


}

else if (parsedTheme === 'light') {
    moon.style.display = 'block';
    sun.style.display = 'none';

    // change colors
    body.style.backgroundColor = '#fff';
    body.style.color = '#04090F';
    
    BTN.style.backgroundColor = 'black';
    BTN.style.color = 'white';

    result.style.backgroundColor = 'black';
    result.style.color = 'white';

    openJournal.style.backgroundColor = 'black';
    openJournal.style.color = 'white';

    clearTradesBtn.style.backgroundColor = 'black';
    clearTradesBtn.style.color = 'white';
}



function calculate() {
    const risk = parseFloat(document.getElementById("risk").value);
    const entry = parseFloat(document.getElementById("entry").value);
    const stop = parseFloat(document.getElementById("stop").value);

    if (!risk || !entry || !stop) {
      alert("Please fill in all fields");
      return;
    }  

    const positionSize = (risk * entry) / Math.abs(entry - stop);

    RST= document.getElementById("result");
    RST.style.display = 'block';
    RST.innerHTML = `<p>Order Value - $ <strong>${positionSize.toFixed(2)}</strong></p>`; 

    // Automatically add trade to journal
    addTrade({
        risk: risk,
        entry: entry,
        stop: stop
    });

}    




// =======================
// TRADE JOURNAL SYSTEM
// =======================

let trades = JSON.parse(localStorage.getItem("trades")) || [];

function saveTrades() {
    localStorage.setItem("trades", JSON.stringify(trades));
}

openJournal.addEventListener("click", () => {
    journalPopup.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
    journalPopup.classList.add("hidden");
});

clearTradesBtn.addEventListener("click", () => {
    trades = [];
    saveTrades();
    renderTrades();
});

function addTrade(tradeData) {
    trades.push({ ...tradeData, result: null });
    saveTrades();
    renderTrades();
}

function markWin(index) {
    trades[index].result = "win";
    saveTrades();
    renderTrades();
}

function markLoss(index) {
    trades[index].result = "loss";
    saveTrades();
    renderTrades();
}

function renderTrades() {
    tradeList.innerHTML = "";

    let wins = 0;
    let losses = 0;

    trades.forEach((trade, index) => {
        const div = document.createElement("div");
        div.classList.add("trade-item");

        if (trade.result === "win") {
            div.classList.add("win");
            wins++;
        }

        if (trade.result === "loss") {
            div.classList.add("loss");
            losses++;
        }

        div.innerHTML = `
            <p><strong>Risk:</strong> $${trade.risk}</p>
            <p><strong>Entry:</strong> ${trade.entry}</p>
            <p><strong>Stop:</strong> ${trade.stop}</p>
            <button onclick="markWin(${index})">Win</button>
            <button onclick="markLoss(${index})">Loss</button>
        `;

        tradeList.appendChild(div);
    });

    const total = trades.length;
    totalTradesEl.textContent = total;
    totalWinsEl.textContent = wins;
    totalLossesEl.textContent = losses;

    const winRate = total > 0 ? ((wins / total) * 100).toFixed(2) : 0;
    winRateEl.textContent = winRate + "%";
}

renderTrades();


