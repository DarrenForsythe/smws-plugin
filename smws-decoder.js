const url = chrome.runtime.getURL('/smws-codes.json');

fetch(url)
    .then(response => response.json())
    .then(json => doReplace(json))


function doReplace(codeList) {
    var x = document.getElementsByClassName("caskNo");

    //Two digits and a dot
    let maltregex = /[0-9]{2,3}./;
    let othercodes = /[A-Z]\d./;

    for (let i = 0; i < x.length; i++) {
        let caskElement = x[i].innerHTML;
        //Iterate over each caskNo item
        if (othercodes.test(caskElement)) {
            let code = othercodes.exec(caskElement)[0].replace('.', '')
            let replacement = codeList[code].Distillery
            caskElement = caskElement.replace(code, 'Distillery - [' + replacement + ', code - ' + code + ' Cask - ')
            caskElement = caskElement.replace('CASK NO.', '')
            caskElement = caskElement + ']'
        } else {
            let code = maltregex.exec(caskElement)[0].replace('.', '')
            let replacement = codeList[code].Distillery
            caskElement = caskElement.replace(code, 'Distillery - [' + replacement + ', code - ' + code + ' Cask - ')
            caskElement = caskElement.replace('CASK NO.', '')
            caskElement = caskElement + ']'
        }
        x[i].innerHTML = caskElement
    }
}