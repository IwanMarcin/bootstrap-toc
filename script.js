const generateEN = document.getElementById("generateEN");
const generatePL = document.getElementById("generatePL");
const generateDE = document.getElementById("generateDE");
const clearText = document.getElementById("reset");

let toggleH3 = document.getElementById("checkH3");

isH3On = false;

function generateTOC(content){

    
    let HTMLcontent = document.getElementById("HTMLfromUser");
    let textFromUser = HTMLcontent.value;

    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = textFromUser;

    let hTags = tempDiv.querySelectorAll("h2, h3");
    let hTexts = [];

    hTags.forEach(function (hTag) {
        hTexts.push(hTag.textContent);
        }
    );
    
    let tableOfHeaders = []

    hTags.forEach(function(hTag){
        tableOfHeaders.push(hTag.tagName);
    }
    );
    
    const transformText = (textFromUser) => textFromUser
        .toLowerCase()
        .split("ł")
        .join("l")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-zA-Z0-9 -]/g, "")
        .replace(/ /g, "-");

    let transformedTexts = hTexts.map(function (textFromUser) {
        return transformText(textFromUser);
    });

    let parser = new DOMParser();
        let doc = parser.parseFromString(textFromUser, 'text/html');
        let selectAllHeaders = doc.querySelectorAll( "h2, h3" );
        
        for (let i=0; i < selectAllHeaders.length; i++) {
            selectAllHeaders[i].id = transformedTexts[i];
        }

        textFromUser = doc.body.innerHTML;
        
    if (isH3On === false){
        let toDelete = "H3";
        tableOfHeaders = tableOfHeaders.filter(function (header) {
            return header !== toDelete;
        });
    }

    for (let i = 0; i <= hTexts.length - 1; i++) {
        if (tableOfHeaders[i] === "H3"){
            content = content + `<ul>\n`;
                while (tableOfHeaders[i] === "H3"){
                    content = content + `<li><a href="#${transformedTexts[i]}">${hTexts[i]}</a></li>\n`;
                    i++;
                }
            content = content + `</ul>\n`;
        }
        if(i <= hTexts.length - 1){
            content = content + `<li><a href="#${transformedTexts[i]}">${hTexts[i]}</a></li>\n`;
        }
    }

    content += `</ul>`;
    document.getElementById("tableOfContents").innerHTML = `${content} \n${textFromUser}`;
    console.log(tableOfHeaders)
    return hTexts;
}

generateEN.addEventListener( 'click', function() {
    let content = `<p><b>Table of Contents</b></p>\n<ul>`;
    generateTOC(content);
});

generatePL.addEventListener( 'click', function() {
    let content = `<p><b>Spis treści</b></p>\n<ul>`;
    generateTOC(content);
});

generateDE.addEventListener( 'click', function() {
    let content = `<p><b>Das Inhaltsverzeichnis</b></p>\n<ul>`;
    generateTOC(content);
});

toggleH3.addEventListener( 'click', function(){

    if ( isH3On === false ){
        document.getElementById("checkH3").innerHTML = `<b>H3 ON</b>`;
        isH3On = true;
    } else {
        document.getElementById("checkH3").innerHTML = `<b>H3 OFF</b>`;
        isH3On = false;
    }
    
});

clearText.addEventListener( 'click', function(){
    window.location.reload();
});