document.getElementById("year").textContent = new Date().getFullYear();

const ranks = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];
const suits = [
  { symbol: "♠", type: "suit-black" },
  { symbol: "♥", type: "suit-red" },
  { symbol: "♦", type: "suit-red" },
  { symbol: "♣", type: "suit-black" },
];

const contacts = [
  {
    id: "email",
    icon: "fa-regular fa-envelope",
    label: "Email",
    value: "Send",
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=andreavirgil89@gmail.com",
  },
  {
    id: "github",
    icon: "fa-brands fa-github",
    label: "GitHub",
    value: "Open",
    link: "https://github.com/andrea-avo/",
  },
  {
    id: "li",
    icon: "fa-brands fa-linkedin-in",
    label: "LinkedIn",
    value: "Connect",
    link: "https://www.linkedin.com/in/andreavirgilofian/",
  },
];

function getRandomDeck() {
  let visualDeck = [];
  while (visualDeck.length < 8) {
    // Edit Jumlah Kartu
    const randRank = ranks[Math.floor(Math.random() * ranks.length)];
    const randSuit = suits[Math.floor(Math.random() * suits.length)];
    const isDuplicate = visualDeck.some(
      (c) => c.rank === randRank && c.suit.symbol === randSuit.symbol,
    );

    if (!isDuplicate) {
      visualDeck.push({ rank: randRank, suit: randSuit });
    }
  }

  let contentDeck = contacts.map((c) => ({ type: "contact", data: c }));

  const slotsNeeded = 8 - contentDeck.length; // Edit Jumlah Kartu

  for (let i = 0; i < slotsNeeded; i++) {
    contentDeck.push({ type: "zonk" });
  }

  for (let i = contentDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [contentDeck[i], contentDeck[j]] = [contentDeck[j], contentDeck[i]];
  }

  return visualDeck.map((visual, index) => ({
    ...visual,
    content: contentDeck[index],
  }));
}

function renderGame() {
  const grid = document.getElementById("card-grid");
  grid.innerHTML = "";

  const finalDeck = getRandomDeck();

  finalDeck.forEach((card, index) => {
    const cardEl = document.createElement("div");
    cardEl.className = "card-container card-animate";
    cardEl.style.animationDelay = `${index * 80}ms`;

    cardEl.onclick = function () {
      this.classList.toggle("flipped");
    };

    cardEl.innerHTML = `
            <div class="card-inner">
              <div class="card-cover"></div>
              
              <div class="card-info ${card.suit.type}">
                
                <div class="corner-top opacity-80">
                  <div class="text-lg md:text-xl font-bold font-sans">${card.rank}</div>
                  <div class="text-sm md:text-base">${card.suit.symbol}</div>
                </div>

                <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   ${
                     card.content.type === "contact"
                       ? `
                      <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 shadow-sm text-slate-700 text-lg md:text-2xl">
                          <i class="${card.content.data.icon}"></i>
                      </div>
                      <h3 class="text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">${card.content.data.label}</h3>
                      <a href="${card.content.data.link}" target="_blank" class="pointer-events-auto text-[10px] md:text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1 rounded-full hover:bg-slate-800 hover:text-white transition-colors border border-slate-200">
                        ${card.content.data.value}
                      </a>
                   `
                       : `
                      <div class="text-4xl md:text-6xl opacity-10 font-serif">${card.suit.symbol}</div>
                   `
                   }
                </div>

                <div class="corner-bottom opacity-80">
                  <div class="text-lg md:text-xl font-bold font-sans">${card.rank}</div>
                  <div class="text-sm md:text-base">${card.suit.symbol}</div>
                </div>

              </div>
            </div>
          `;
    grid.appendChild(cardEl);
  });
}

renderGame();
