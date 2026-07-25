/*

=========================================================

poemData.js

作品データ

=========================================================

*/

/*

---------------------------------------------------------

タイトル

---------------------------------------------------------

*/

const TITLE = {

    characters: [

        { text: "‐", x: 730, y: 115, class: "titleChar" },

        { text: "■", x: 730, y: 185, class: "titleChar" },

        { text: "ど", x: 730, y: 255, class: "titleChar" },

        { text: "︵", x: 730, y: 335, class: "titleChar" },

        { text: "う", x: 730, y: 405, class: "titleChar" },

        { text: "し", x: 730, y: 475, class: "titleChar" },

        { text: "ろ", x: 730, y: 545, class: "titleChar" },

        { text: "■", x: 730, y: 625, class: "titleChar" },

        { text: "︵", x: 730, y: 705, class: "titleChar" },

        { text: "#", x: 730, y: 775, class: "titleChar" },

        { text: "、", x: 730, y: 845, class: "titleChar" }

    ]

};

const AUTHOR = {

    characters: [

        { text: "平", x: 650, y: 1490, class: "authorChar" },

        { text: "川", x: 650, y: 1555, class: "authorChar" },

        { text: "綾", x: 650, y: 1620, class: "authorChar" },

        { text: "真", x: 650, y: 1685, class: "authorChar" },

        { text: "智", x: 650, y: 1750, class: "authorChar" }

    ]

};

/*

---------------------------------------------------------

本文

---------------------------------------------------------

*/

const POEM = {

    /*

    SVG全体サイズ

    */

    width: 1080,

    height: 1920,

    /*

    文字サイズ

    */

    fontSize: 42,

    /*

    一列ごとのデータ

    */

    columns: [

        /*

        column 0

        */

        {
    id: "right",

    startX: 900,

    startY: 200,

    columnGap: 70,

    lineGap: 70,

    columns: [

        "◾️ど（どど◾️ど（、どど◾️うぞと絞って◾️跨る白熱球お",

        "姉さん◾️が顔を皮下（脂肪の黄色が◾️かった層に◾️はで",

        "（き◾️なかったね（、◾️ど(#　ド)どとど◾️ど赤の階調",

        "◾️の、ど◾️ど腸◾️どどど中◾️にあって、砂浜メートル◾️",

        "に◾️打ち寄せ◾️る　　　ル◾️パンの9　泡◾️ですなぁ◾️ど、",

        "（どど。◾️明るく挿◾️入され◾️ていた背骨デ◾️ジタルへ",

        "◾️小学生の◾️執刀医ジャム（を◾️指先で◾️（#　レ）◾️皮、",

        "下脂◾️肪◾️どど（黄色に◾️つまむ◾️。呉服チェーン姿◾️",

        "（は、どど（◾️階◾️調マカデミアの◾️砂浜に◾️行けば？"

    ]

}

    ]

};

/*

---------------------------------------------------------

演出タイミング

---------------------------------------------------------

*/

const EFFECTS = {

    /*

    「bar」が現れる位置

    */

    bar: {

        column: null,

        index: null

    },

    /*

    読み終わり

    */

    endColumn: null,

    /*

    シンボル開始

    */

    symbols: {

        square: true,

        circle: true

    },

    /*

    足あと

    */

    footprints: true

};

/*

---------------------------------------------------------

アニメーション速度

---------------------------------------------------------

*/

const SETTINGS = {

    cameraDuration: 700,

    columnDelay: 200,

    symbolDuration: 3000,

    footprintDuration: 5000,

    dissolveDuration: 2500

};