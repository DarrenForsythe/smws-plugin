const url = chrome.runtime.getURL('/smws-codes.json');

fetch(url)
    .then(response => response.json())
    .then(json => doReplace(json))


//TODO: It works, but whatever framework is ajax need to check on page change
function doReplace(codeList) {
    var x = document.getElementsByClassName("caskNo");

    //Two digits and a dot
    let maltregex = /[1-9]{1,3}./;
    let othercodes = /[A-Z]{1,2}\d./;

    for (let i = 0; i < x.length; i++) {
        let caskElement = x[i].innerText;
        //Iterate over each caskNo item
        if (othercodes.test(caskElement)) {
            //TODO: refactor to just selec tthe correct regex and execute on it
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
        x[i].innerText = caskElement
    }
}