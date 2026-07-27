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

    "#": { horizontal: true, dx: -16, dy: 10 },
    "👣": { dy: -10 },

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


text.setAttribute("x", adjustedX);
text.setAttribute("y", adjustedY);

    let className = character.class;

    if (special?.horizontal) {
        className += " horizontalChar";
    }

    if (special?.sideways) {
    className += " sidewaysChar";
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

    poemSVG.appendChild(

        createCharacter({

            text: char,

            x: block.xPositions
                ? block.xPositions[columnIndex]
                : block.startX - columnIndex * block.columnGap,

            y:drawY,

            class: "poemChar",

            blockIndex

        })

    );

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
