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

    if (
    special.rotate !== undefined) {

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

        text.dataset.x = x;
    text.dataset.y = y;

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

if (character.text === "👣") {

    const group = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "g"
    );

    group.setAttribute(
        "transform",
        `rotate(-90 ${x} ${y})`
    );

    group.appendChild(text);

    return group;
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

//==================================================
// 開始
//==================================================

function start() {

    drawTitle();
    drawAuthor();
    drawPoem();
    drawBar();

}

//==================================================
// タイトル終了
//==================================================

function hideTitle() {

    titleScreen.classList.remove("active");
    readingScreen.classList.add("active");

}

//==================================================
// 現在の行を再生
//==================================================

async function playCurrentLine() {

    if (player.isPlaying) {
        return;
    }

    const line = getCurrentLine();

    if (!line) {
        return;
    }

    player.isPlaying = true;

    for (const character of line) {

        character.style.opacity = 1;
        
        await new Promise(resolve =>
            setTimeout(resolve, 45)
        );

    }

    player.isPlaying = false;
    player.charIndex = 0;

    if (
        player.lineIndex === BAR_LINE &&
        !player.barShown
    ) {

        document
            .querySelectorAll(".bar")
            .forEach(bar => {

                bar.style.opacity = 1;

            });

        player.barShown = true;

    }

}

//==================================================
// 初期化
//==================================================

start();
//==================================================
// クリック処理
//==================================================

async function nextStep() {

    console.log("state =", player.state);

    switch (player.state) {

        //==============================
        // タイトル
        //==============================

        case "title":

            hideTitle();

            player.state = "reading";
            player.lineIndex = 0;
            player.charIndex = 0;

            await playCurrentLine();

            return;

        //==============================
        // 読み進め
        //==============================

        case "reading":

            player.lineIndex++;
            player.charIndex = 0;

            if (player.lineIndex >= poemLines.length) {

                player.state = "last";

                return;

            }

            await playCurrentLine();

            return;

        //==============================
        // 全文表示終了
        //==============================

        case "last":

            if (!player.squareCircleShown) {

                player.squareCircleShown = true;

                showSquareCircle();

            }

            return;

        //==============================
        // ■ ● 表示後
        //==============================

        case "squareCircle":

            if (!player.footstepsShown) {

                player.footstepsShown = true;

                showFootsteps();

            }

            return;

        //==============================
        // 👣表示後
        //==============================

        case "footsteps":

            fadePoem();

            return;

        //==============================
        // フェード中
        //==============================

        case "fade":

            return;

        default:

            return;

    }

}
//==================================================
// 演出
//==================================================

function showSquareCircle() {

    const targets = document.querySelectorAll(
        ".square, .circle"
    );

    if (targets.length === 0) {
        return;
    }

    targets.forEach(element => {

        element.style.opacity = 1;

    });

    player.state = "squareCircle";

}

//==================================================

function showFootsteps() {

    const footsteps = document.querySelectorAll(
        ".footstep"
    );

    footsteps.forEach((element, index) => {

console.log(element.getAttribute("transform"));

        element.style.opacity = 1;

        const startX =
            -150 - Math.random() * 180;

        element.style.transform =`translateX(${startX}px)`;

        element.classList.add("walking");    

        const delay =
            index * 120 + Math.random() * 250;

        setTimeout(() => {

            requestAnimationFrame(() => {

                element.style.transform ="translateX(0)";

            });

        }, delay);

    });

    player.state = "footsteps";

}

//==================================================

function fadePoem() {

    document
        .querySelectorAll(".poemChar, .bar")
        .forEach(element => {

            element.style.transition =
                "opacity 1.5s ease";

            element.style.opacity = 0;

        });

    player.state = "fade";

}

//==================================================
// イベント
//==================================================

titleScreen.addEventListener(
    "click",
    nextStep
);

readingScreen.addEventListener(
    "click",
    nextStep
);
