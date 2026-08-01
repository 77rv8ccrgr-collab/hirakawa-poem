/*

=========================================================

script.js

=========================================================

*/

const SVG_NS = "http://www.w3.org/2000/svg";

const titleSVG = document.getElementById("titleSVG");

const titleScreen = document.getElementById("titleScreen")

const readingScreen = document.getElementById("readingScreen")

const poemSVG = document.getElementById("poemSVG");

const poemLines = [];

const player = {

    lineIndex: 0,
    charIndex: 0,

    state: "title",

    isPlaying: false,

    barShown: false,

    squareCircleShown: false,

};

const BAR_LINE = 4;                    // 5行目
const LAST_LINE = poemLines.length - 1;

function getCurrentLine() {

    return poemLines[player.lineIndex];

}

/*

---------------------------------------------------------

SVG文字生成

---------------------------------------------------------

*/

const specialCharacters = {

    "#": { horizontal: true, dx: -16, dy: 10 },
    "👣": { dy: -10 },
    "bar": { horizontal: true, dx: 0, dy: 0 },

    "0": { horizontal: true, dx: -14, dy: 2 },
    "1": { horizontal: true, dx: -14, dy: 2 },
    "2": { horizontal: true, dx: -14, dy: 2 },
    "3": { horizontal: true, dx: -14, dy: 2 },
    "4": { horizontal: true, dx: -16, dy: 8 },
    "5": { horizontal: true, dx: -14, dy: 2 },
    "6": { horizontal: true, dx: -14, dy: 2 },
    "7": { horizontal: true, dx: -14, dy: 2 },
    "8": { horizontal: true, dx: -16, dy: 25 },
    "9": { horizontal: true, dx: -16, dy: 30 },

    "(": { sideways: true },
"?": { sideways: true },

};

function createCharacter(character) {

    const text = document.createElementNS(SVG_NS, "text");

    text.textContent = character.text;
    if (character.text === "👣") {

    if (character.blockIndex === 2) {
        text.setAttribute("fill", "#7b5ea7");   // 紫
    }

    if (character.blockIndex === 3) {
        text.setAttribute("fill", "#000000");   // 黒
    }

}

    const special = specialCharacters[character.text]?? {};

    const x = character.x + (special?.dx ?? 0);
    const y = character.y + (special?.dy ?? 0);

    let adjustedX = x;
    let adjustedY = y;

    if (
    typeof IS_MOBILE_VERSION !== "undefined" &&
    IS_MOBILE_VERSION &&
    (character.text === "（" || character.text === "）")
) {
    adjustedX += 15;
    adjustedY += 55;
}


text.setAttribute("x", adjustedX);
text.setAttribute("y", adjustedY);

    let className = character.class;

    if (character.text === "（" || character.text === "）") {
    className += " sidewaysChar";
}

    if (special?.horizontal) {
        className += " horizontalChar";
    }

    if (special?.sideways) {
    className += " sidewaysChar";
}

    text.setAttribute("class", className);

if (
    typeof IS_MOBILE_VERSION !== "undefined" &&
    IS_MOBILE_VERSION &&
    (character.text === "（" || character.text === "）")
) {

    text.setAttribute(
    "transform",
    `rotate(90 ${x} ${y})`
);

}

    // 回転（必要な文字だけ）
    if (special?.rotate) {
        text.setAttribute(
            "transform",
            `rotate(${special.rotate} ${x} ${y})`
        );
    }

    // 将来、文字サイズを変えたい文字用
    if (special?.fontSize) {
        text.setAttribute("font-size", special.fontSize);

    }

text.style.opacity = 0;

if (
    character.class &&
    (
        character.class.includes("square") ||
        character.class.includes("circle") ||
        character.class.includes("footstep")
    )
) {
    text.style.opacity = 0;
}

    return text;

}

/*

---------------------------------------------------------

タイトル描画

---------------------------------------------------------

*/

function drawTitle() {

    TITLE.characters.forEach(character => {

        titleSVG.appendChild(

            createCharacter(character)

        );

    });

    titleSVG.querySelectorAll("text").forEach(text => {
    text.style.opacity = 1;
});

}

/*

---------------------------------------------------------

作者名描画

---------------------------------------------------------

*/

function drawAuthor() {

    console.log(AUTHOR.characters);

    AUTHOR.characters.forEach(character => {

        titleSVG.appendChild(

            createCharacter(character)

        );

    });

    titleSVG.querySelectorAll(".authorChar").forEach(text => {
        text.style.opacity = 1;
    });

}

/*

---------------------------------------------------------

開始

---------------------------------------------------------

*/

function start() {

    console.log("start");

    drawTitle();
    drawAuthor();
    drawPoem();

console.log(poemLines);
console.log(titleSVG.children.length);

    drawBar();

}

function drawBar() {

    const b = createCharacter({
    text: "b",
    x: 1496,
    y: 695,
    class: "poemChar bar"
});

poemSVG.appendChild(b);

    const a = createCharacter({
    text: "a",
    x: 1544,
    y: 695,
    class: "poemChar bar"
});

poemSVG.appendChild(a);

    const r = createCharacter({
    text: "r",
    x: 1590,
    y: 695,
    class: "poemChar bar"
});

poemSVG.appendChild(r);
   

}

function getAdvance(char, blockIndex, block) {

    if (char === "（（") {
        return block.lineGap;
    }

    return block.lineGap;

}

function drawPoem() {

    POEM.columns.forEach((block, blockIndex) => {

        console.log(block.id, block.startX);

        // ===== デバッグ用：ブロックの右端ガイド =====

 /*       
const guide = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
);

guide.setAttribute("x1", block.startX);
guide.setAttribute("x2", block.startX);
guide.setAttribute("y1", 0);
guide.setAttribute("y2", POEM.height);

guide.setAttribute("stroke", "#ff4d4d");
guide.setAttribute("stroke-width", "2");
guide.setAttribute("stroke-dasharray", "12 8");

poemSVG.appendChild(guide);

*/

// ===============================

        block.columns.forEach((line, columnIndex) => {

            const currentLine = [];

          let currentY = block.startY;

 const chars = [...line];
 let afterDoubleParen = false;

chars.forEach((char,index) => {

let drawY = currentY;

if (afterDoubleParen) {
    drawY -= 22;
}

if (
    index > 0 &&
    chars[index - 1] === "（" &&
    char === "（"
) {
    drawY -= 22;
    afterDoubleParen = true;
}

    const charElement = createCharacter({
    text: char,
    x: block.xPositions
        ? block.xPositions[columnIndex]
        : block.startX - columnIndex * block.columnGap,
    y: drawY,
    class:
    char === "■" ? "poemChar square" :
    char === "●" ? "poemChar circle" :
    char === "👣" ? "poemChar footstep" :
    char === "（" ? "poemChar paren" :
    char === "）" ? "poemChar paren" :
    "poemChar",
    blockIndex
});

poemSVG.appendChild(charElement);

currentLine.push(charElement);

    let advance = getAdvance(char, blockIndex, block);

if ( blockIndex === 3 && columnIndex === 6 ) {

    if (index === 2) advance += 8;
    if (index === 3) advance += 4;
    if (index === 4) advance += 2;
    if (index === 5) advance += 1;
    if (index === 12) advance += 4;
    if (index === 23) advance += 2;
    if (index === 24) advance += 1;

}

if (blockIndex === 0 && columnIndex === 4) {

    if (index === 8) advance += 30;
    if (index === 15) advance += 32;

}

currentY += advance;

});

poemLines.push(currentLine);

        });

    });

}

/*
---------------------------------------------------------
タイトル終了
---------------------------------------------------------
*/

function hideTitle() {

titleScreen.classList.remove("active");

readingScreen.classList.add("active");

}
async function playCurrentLine() {

    if (player.isPlaying) return;

    const line = getCurrentLine();

    if (!line) return;

    player.isPlaying = true;

    for (let i = 0; i < line.length; i++) {

        line[i].style.opacity = 1;

        await new Promise(resolve => setTimeout(resolve, 45));

    }

    player.isPlaying = false;
    player.charIndex = 0;

    if (
    player.lineIndex === BAR_LINE &&
    !player.barShown
) {

    document.querySelectorAll(".bar").forEach(bar => {
        bar.style.opacity = 1;
    });

    player.barShown = true;

}

}

start();



    async function nextStep() {

        console.log("state =", player.state);

    if (player.state === "footsteps") {

    fadePoem();

    return;

}
    
        if (player.state === "title") {

    hideTitle();

    player.state = "reading";

    player.lineIndex = 0;

    await playCurrentLine();

    return;

}

   if (
    player.state !== "reading" &&
    player.state !== "last" &&
    player.state !== "squareCircle"
) {
    return;
}

    // 最終行まで来たら停止
    if (player.state === "last"|| player.state === "squareCircle") {

    if (!player.squareCircleShown) {

        player.squareCircleShown = true;

        showSquareCircle();

        return;

    }

    if (!player.footstepsShown) {

    player.footstepsShown = true;

    showFootsteps();

    return;

}

    return;

}

      player.lineIndex++;
      player.charIndex = 0;

    if (player.lineIndex >= poemLines.length) {

        player.state = "last";

        return;

    }

    await playCurrentLine();

}

function showSquareCircle() {

    const targets = document.querySelectorAll(".square, .circle");

    if (targets.length === 0) return;

    targets.forEach(element => {

        element.style.opacity = 1;

    });

    player.state = "squareCircle";

player.footstepsShown = false;

}
    function showFootsteps() {

    document.querySelectorAll(".footstep").forEach((element, index) => {

        element.style.opacity = 1;
        element.classList.add("walking");
        const startX = -150 - Math.random() * 180;

element.style.transform = `translateX(${startX}px)`;

const delay = index * 120 + Math.random() * 250;

setTimeout(() => {

    requestAnimationFrame(() => {

        element.style.transform = "translateX(0)";

    });

}, delay);

    });

    player.state = "footsteps";

}
    
function fadePoem() {

    document.querySelectorAll(".poemChar, .bar").forEach(element => {

        element.style.transition = "opacity 1.5s ease";

        element.style.opacity = 0;

    });

    player.state = "fadePoem";

}



titleScreen.addEventListener("click", nextStep);

readingScreen.addEventListener("click", nextStep);