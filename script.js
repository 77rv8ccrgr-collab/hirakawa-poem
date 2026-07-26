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

const specialCharacters = {

    "#": { horizontal: true, dx: -16, dy: 4 },

    "0": { horizontal: true, dx: -14, dy: 2 },
    "1": { horizontal: true, dx: -14, dy: 2 },
    "2": { horizontal: true, dx: -14, dy: 2 },
    "3": { horizontal: true, dx: -14, dy: 2 },
    "4": { horizontal: true, dx: -16, dy: 4 },
    "5": { horizontal: true, dx: -14, dy: 2 },
    "6": { horizontal: true, dx: -14, dy: 2 },
    "7": { horizontal: true, dx: -14, dy: 2 },
    "8": { horizontal: true, dx: -14, dy: 2 },
    "9": { horizontal: true, dx: -16, dy: 30 },

    "？": { rotate: 90, dx: 19, dy: 12 },
    "?": { rotate: 90, dx: 19, dy: 12 }

};

function createCharacter(character) {

    const text = document.createElementNS(SVG_NS, "text");

    text.textContent = character.text;

    const special = specialCharacters[character.text];

    const x = character.x + (special?.dx ?? 0);
    const y = character.y + (special?.dy ?? 0);

    text.setAttribute("x", x);
    text.setAttribute("y", y);

    let className = character.class;

    if (special?.horizontal) {
        className += " horizontalChar";
    }

    text.setAttribute("class", className);

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
