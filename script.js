/*
==================================================
script.js
==================================================
*/

"use strict";

//==================================================
// 定数
//==================================================

const SVG_NS = "http://www.w3.org/2000/svg";

//==================================================
// DOM
//==================================================

const titleScreen   = document.getElementById("titleScreen");
const readingScreen = document.getElementById("readingScreen");

const titleSVG = document.getElementById("titleSVG");
const poemSVG  = document.getElementById("poemSVG");

//==================================================
// 描画データ
//==================================================

const poemLines = [];

//==================================================
// プレイヤー状態
//==================================================

const player = {

    lineIndex: 0,
    charIndex: 0,

    state: "title",

    isPlaying: false,

    barShown: false,

    squareCircleShown: false,
    footstepsShown: false

};

//==================================================
// 定数
//==================================================

const BAR_LINE = 4;

//==================================================
// 現在の行を取得
//==================================================

function getCurrentLine() {

    return poemLines[player.lineIndex] ?? null;

}

//==================================================
// SVG文字生成
//==================================================

function createCharacter(character) {

    const text = document.createElementNS(SVG_NS, "text");

    text.textContent = character.text;

    const special = specialCharacters[character.text] ?? {};

    const x = character.x + (special.dx ?? 0);
    const y = character.y + (special.dy ?? 0);

    text.setAttribute("x", x);
    text.setAttribute("y", y);

    let className = character.class ?? "";

    if (special.horizontal) {
        className += " horizontalChar";
    }

    if (special.sideways) {
        className += " sidewaysChar";
    }

    text.setAttribute("class", className.trim());

    if (special.rotate !== undefined) {

        text.setAttribute(
            "transform",
            `rotate(${special.rotate} ${x} ${y})`
        );

    }

    if (special.fontSize) {
        text.setAttribute("font-size", special.fontSize);
    }

    if (character.text === "👣") {

        if (character.blockIndex === 2) {
            text.setAttribute("fill", "#7b5ea7");
        }

        if (character.blockIndex === 3) {
            text.setAttribute("fill", "#000000");
        }

    }

    const hiddenClasses = [
        "square",
        "circle",
        "footstep"
    ];

    if (
        hiddenClasses.some(name => className.includes(name))
    ) {

        text.style.opacity = 0;

    } else {

        text.style.opacity = 0;

    }

    return text;

}

//==================================================
// タイトル描画
//==================================================

function drawTitle() {

    TITLE.characters.forEach(character => {

        titleSVG.appendChild(
            createCharacter(character)
        );

    });

    titleSVG
        .querySelectorAll("text")
        .forEach(text => {

            text.style.opacity = 1;

        });

}

//==================================================
// 作者名描画
//==================================================

function drawAuthor() {

    AUTHOR.characters.forEach(character => {

        titleSVG.appendChild(
            createCharacter(character)
        );

    });

    titleSVG
        .querySelectorAll(".authorChar")
        .forEach(text => {

            text.style.opacity = 1;

        });

}

//==================================================
// bar描画
//==================================================

function drawBar() {

    const barCharacters = [

        { text: "b", x: 1496, y: 695 },
        { text: "a", x: 1544, y: 695 },
        { text: "r", x: 1590, y: 695 }

    ];

    barCharacters.forEach(character => {

        poemSVG.appendChild(

            createCharacter({

                ...character,

                class: "poemChar bar"

            })

        );

    });

}

//==================================================
// 行送り量
//==================================================

function getAdvance(char, block) {

    return block.lineGap;

}

//==================================================
// 詩本文描画
//==================================================

function drawPoem() {

    POEM.columns.forEach((block, blockIndex) => {

        block.columns.forEach((line, columnIndex) => {

            const currentLine = [];

            let currentY = block.startY;

            const chars = [...line];

            let afterDoubleParen = false;

            chars.forEach((char, index) => {

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

                let advance = getAdvance(char, block);

                if (blockIndex === 3 && columnIndex === 6) {

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


書き直し
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
/*
const specialCharacters = {

    "#": { horizontal: true, dx: -16, dy: 10 },
    "👣": { rotate: -90, dx: -20, dy: 18 },
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

    "（": { rotate: 90, dx: 24, dy: 22 },
　　"）": { rotate: 90, dx: 24, dy: 22 },
   
　　"?": { sideways: true },


　　"ー": { rotate: 90 },

"、": { rotate: 0, dx: 28, dy: -20  },

"。": { rotate: -90, dx: 24, dy: 22  },

"「": { rotate: 90 },
"」": { rotate: 90 },


};
*/

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

    /*
    if (
    typeof IS_MOBILE_VERSION !== "undefined" &&
    IS_MOBILE_VERSION &&
    (character.text === "（" || character.text === "）")
) {
    adjustedX += 12;
    adjustedY += -20;
}
*/

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

   /*
if (
    typeof IS_MOBILE_VERSION !== "undefined" &&
    IS_MOBILE_VERSION &&
    (character.text === "（" || character.text === "）")
) {

    text.setAttribute(
    "transform",
    `rotate(90 ${adjustedX} ${adjustedY})`
);

}

*/

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

    // タイトル画面
    if (player.state === "title") {

        hideTitle();

        player.state = "reading";

        player.lineIndex = 0;

        await playCurrentLine();

        return;
    }

    // 👣表示後
    if (player.state === "footsteps") {

        fadePoem();

        return;
    }

    // □●表示後
    if (player.state === "squareCircle") {

        if (!player.footstepsShown) {

            player.footstepsShown = true;

            showFootsteps();

        }

        return;
    }

    // 最終行まで表示済み
    if (player.state === "last") {

        if (!player.squareCircleShown) {

            player.squareCircleShown = true;

            showSquareCircle();

        }

        return;
    }

    // 読み進め中以外は無視
    if (player.state !== "reading") {

        return;

    }

     // 次の行へ
    player.lineIndex++;
    player.charIndex = 0;

    // 全行表示後
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

element.style.transform = `rotate(-90deg) translateX(${startX}px)`;

const delay = index * 120 + Math.random() * 250;

setTimeout(() => {

    requestAnimationFrame(() => {

        element.style.transform = "rotate(-90deg) translateX(0)";

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