var cards = {
  // (A) PROPERTIES
  data : null, // flashcards data array
  cNow : null, // current flashcard
  cMode : null, // current mode - "v"iew or "m"anage
  hScr : null, // html screens
  hCard : null, // html card wrapper

  // (B) INIT APP
  init : () => {
    // (B1) RESTORE CARDS FROM LOCALSTORAGE
    cards.data = localStorage.getItem("cards");
    if (cards.data == null) { cards.data = []; }
    else { cards.data = JSON.parse(cards.data); }

    // (B2) GET HTML ELEMENTS
    cards.hScr = [
      document.getElementById("screenA"),
      document.getElementById("screenB")
    ];
    cards.hCard = document.getElementById("bCard");
  },

  // (C) SWTICH HTML SCREEN
  screen : i => { for (let j in cards.hScr) {
    if (i==j) { cards.hScr[j].classList.remove("hide"); }
    else { cards.hScr[j].classList.add("hide"); }
  }},

  // (D) UPDATE CURRENT & TOTAL CARDS
  count : () => {
    document.getElementById("bCardNow").innerHTML = cards.data.length==0 ? 0 : cards.cNow + 1;
    document.getElementById("bCardAll").innerHTML = cards.data.length;
  },
  
  // (E) VIEW/MANAGE CARDS
  view : mode => {
    // (E1) VIEW MODE - CONTINUE ONLY WHEN THERE ARE CARDS
    if (mode=="v" && cards.data.length==0) {
      alert("Add some cards first...");
      return;
    }

    // (E2) UPDATE FLAGS & CARDS COUNT
    cards.cMode = mode;
    cards.cNow = 0;
    cards.count();
    
    // (E3) SHOW/HIDE "MANAGE CARD" CONTROLS
    if (mode=="v") { for (let i of document.querySelectorAll(".bManage")) {
      i.classList.add("hide");
    }} else { for (let i of document.querySelectorAll(".bManage")) {
      i.classList.remove("hide");
    }}
    
    // (E4) DRAW CARD & SHOW
    cards.draw();
    cards.screen(1);
  },
  
  // (F) DRAW CARD
  draw : () => {
    // (F1) VIEW MODE CARD
    if (cards.cMode=="v") {
      cards.hCard.innerHTML = `<div class="card" onclick="this.classList.toggle('flip')">
      <div class="front">${cards.data[cards.cNow][0]}</div>
      <div class="back">${cards.data[cards.cNow][1]}</div>
      </div>`;
    }

    // (F2) MANAGE MODE CARD
    else {
      if (cards.data.length==0) {
        cards.hCard.innerHTML = `<div class="mFront">Add a card first.</div>`;
      } else {
        cards.hCard.innerHTML = `
        <textarea class="mFront" onchange="cards.update(this.value, 1)">${cards.data[cards.cNow][0]}</textarea>
        <textarea class="mBack" onchange="cards.update(this.value)">${cards.data[cards.cNow][1]}</textarea>`;
      }
    }
  },

  // (G) LAST/NEXT CARD
  move : next => {
    // (G1) UPDATE CURRENT CARD
    if (next) { cards.cNow++; }
    else { cards.cNow--; }
    if (cards.cNow >= cards.data.length) { cards.cNow = 0; }
    if (cards.cNow < 0) { cards.cNow = cards.data.length - 1; }

    // (G2) UPDATE HTML INTERFACE
    cards.count();
    cards.draw();
  },

  // (H) SAVE CARD DATA TO LOCALSTORAGE
  save : () => localStorage.setItem("cards", JSON.stringify(cards.data)),

  // (I) ADD EMPTY CARD
  add : () => {
    cards.data.splice(cards.cNow, 0, ["Front", "Back"]);
    cards.save();
    cards.count();
    cards.draw();
  },
  
  // (J) UPDATE CURRENT CARD
  update : (txt, side) => {
    if (side) { cards.data[cards.cNow][0] = txt; }
    else { cards.data[cards.cNow][1] = txt; }
    cards.save();
  },
  
  // (K) DELETE CURRENT CARD
  delete : () => { if (cards.data.length!=0) {
    cards.data.splice(cards.cNow, 1);
    cards.save();
    if (cards.data.length == 0) { cards.cNow = 0; }
    else if (cards.cNow+1 >= cards.data.length) {cards.cNow = cards.data.length-1; }
    cards.count();
    cards.draw();
  }}
};
window.onload = cards.init;