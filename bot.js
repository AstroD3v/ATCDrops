//ATCDrops by @AstroD3v se puede usar, modificar y compartir el código libremente//
const puppeteer = require('puppeteer');

const product_url = "urlproducto" //aqui va la url del producto en la talla que se busca comprar, para ello colocar el link del producto y agregarle al link el número de la talla y un 0 al final todo junto//



async function givePage(){
    const browser = await puppeteer.launch({headless: false}); //en caso de querer optimizar el funcionamiento del bot y no ver el proceso visualmente en chromium cambiar de false a true//
    const page = await browser.newPage();
    return page;
}

async function addToCart(page){
    await page.goto(product_url);
    await page.waitForSelector("button[class='btn btn-default btn-block js-add-to-cart js-enable-btn btn-icon glyphicon-shopping-cart']");
    await page.click("button[class='btn btn-default btn-block js-add-to-cart js-enable-btn btn-icon glyphicon-shopping-cart']", elem => elem.click());
    await page.waitForSelector("button[ID='cboxClose']");
    await page.click("button[ID='cboxClose']", elem => elem.click());
    await page.goto('https://moredrops.cl/cart');
    await page.setViewport({ width: 1366, height: 592 })

    await page.waitForSelector('.yCmsComponent > .cart__actions > .row > .col-sm-4 > .btn-primary');
    await page.click('.yCmsComponent > .cart__actions > .row > .col-sm-4 > .btn-primary');
}


async function fillLogin(page){
    await page.waitForSelector('#j_username');
    await page.type("#j_username", 'tuusuario'); //aqui va tu usuario//
    await page.waitForSelector('#j_password');
    await page.type("#j_password", 'tucontraseña'); //aqui va tu contraseña//
    await page.waitForSelector('.checkoutLoginContainer > .row > .col-md-6 > #loginForm > .btn');
    await page.click('.checkoutLoginContainer > .row > .col-md-6 > #loginForm > .btn');
}


async function fillBilling(page){

await page.waitForSelector('.step-body > .checkout-shipping > .checkout-indent > .checkout-btn > .btn')
await page.click('.step-body > .checkout-shipping > .checkout-indent > .checkout-btn > .btn')

await page.waitForSelector('#cboxLoadedContent > #addressbook > .addressEntry > form > .btn')
await page.click('#cboxLoadedContent > #addressbook > .addressEntry > form > .btn')

await page.waitForSelector('#deliveryMethodSubmit')
await page.click('#deliveryMethodSubmit')

await page.waitForSelector('#paymentModeCredit')
await page.click('#paymentModeCredit')

await page.waitForSelector('#paymentModeSubmit')
await page.click('#paymentModeSubmit')

await page.waitForSelector('#cardholderName')
await page.type("#cardholderName", 'portadorcc') //aqui va el nombre del portador de la tarjeta//

await page.waitForSelector('#cardNumber')
await page.type("#cardNumber", 'númerocc') //aqui va el número de la tarjeta de credito//

await page.waitForSelector('#expiracy')
await page.type("#expiracy", 'fechaexpiración') //aqui va la fecha de expiración de la tarjeta en formato mes y año sin slash ej: 0426//

await page.waitForSelector('#securityCode')
await page.type("#securityCode", 'codigoseguridad') //aqui va el codigo de seguridad de la tarjeta también llamado cvv//

await page.waitForSelector('#installments')
await page.waitFor(1000)
await page.click('#installments')

await page.select('#installments', '1')

await page.waitForSelector('#installments')
await page.waitFor(1000)
await page.click('#installments')

await page.waitForSelector('.col-sm-6 > .checkout-steps > .step-body > #pay > .btn')
await page.click('.col-sm-6 > .checkout-steps > .step-body > #pay > .btn')

await page.waitForSelector('#Terms1')
await page.click('#Terms1')

await page.waitForSelector('#placeOrder')
await page.click('#placeOrder')

await page.waitFor(30000)
}



async function checkout(){
    var page = await givePage();
    await addToCart(page);    
    await fillLogin(page);
    await fillBilling(page);
}

checkout();
