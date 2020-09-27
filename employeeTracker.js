
function renderLogo() {
    const logo = require('asciiart-logo');
    const config = require('./package.json');
    console.log(logo(config).render());
}

function init(){
    renderLogo();
}

init();