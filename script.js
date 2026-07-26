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

/*

---------------------------------------------------------

SVG文字生成

---------------------------------------------------------

*/

function createCharacter(character) {

    const text = document.createElementNS(SVG_NS, "text");

    text.textContent = character.text;

    text.setAttribute("x", character.x);

    text.setAttribute("y", character.y);

    const horizontalPattern = /[A-Za-z0-9#()（）]/;

    let className = character.class;

    if (horizontalPattern.test(character.text)) {
        className += " horizontalChar";
    }

    text.setAttribute("class", className);

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

}

/*

---------------------------------------------------------

作者名描画

---------------------------------------------------------

*/

function drawAuthor() {

    AUTHOR.characters.forEach(character => {

        titleSVG.appendChild(

            createCharacter(character)

        );

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

}

 function drawPoem() {

    POEM.columns.forEach(block => {

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

            [...line].forEach((char, rowIndex) => {

                poemSVG.appendChild(

                    createCharacter({

                        text: char,

                        x: block.xPositions
    ? block.xPositions[columnIndex]
    : block.startX - columnIndex * block.columnGap,

                        y: block.startY + rowIndex * block.lineGap,

                        class: "poemChar"

                    })

                );

            });

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

start();

titleScreen.addEventListener("click", () =>{

    hideTitle();

});
