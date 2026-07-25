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

            id: 0,

            chars: [

    { text:"■", x:900, y:200, class:"poemChar" },
    { text:"ど", x:900, y:270, class:"poemChar" },
    { text:"（", x:900, y:340, class:"poemChar" },
    { text:"、", x:900, y:410, class:"poemChar" },
    { text:"ど", x:900, y:480, class:"poemChar" },
    { text:"ど", x:900, y:550, class:"poemChar" },
    { text:"■", x:900, y:620, class:"poemChar" },
    { text:"ぞ", x:900, y:690, class:"poemChar" },
    { text:"と", x:900, y:760, class:"poemChar" },
    { text:"絞", x:900, y:830, class:"poemChar" },
    { text:"っ", x:900, y:900, class:"poemChar" },
    { text:"て", x:900, y:970, class:"poemChar" },
    { text:"■", x:900, y:1040, class:"poemChar" },
    { text:"跨", x:900, y:1110, class:"poemChar" },
    { text:"る", x:900, y:1180, class:"poemChar" },
    { text:"白", x:900, y:1250, class:"poemChar" },
    { text:"熱", x:900, y:1320, class:"poemChar" },
    { text:"球", x:900, y:1390, class:"poemChar" },
    { text:"お", x:900, y:1460, class:"poemChar" }

]

        },

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