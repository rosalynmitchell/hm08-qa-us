const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('Should select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    })

    it('should fill in phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })
    it('should add credit card number and CVV code ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.AddPaymentmethodcard();
        await  expect($(page.linkButton)).toBeExisting();
        await expect($(page.addCardButton)).toBeExisting();
        await  expect($(page.linkButton)).toBeExisting();
        await expect($(page.paymentMethodButton)).toBeExisting();
    })
    it('Should fill comment in message field ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillComment();
        await expect($(page.messagetoDriverField)).toBeExisting();
    })
    it('Should Select Blanket and Handkercheifs ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.OrderBlankerandhandkerchiefs();
        await expect($(page.blanketandhandkercheifs)).toBeDisplayed();
        await expect($(page.togglebutton)).toBeExisting();
    })
    it('Should Add Two Icecreams to Order ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.Ordertwoicecreams();
        await expect($(page.icecreambucket)).toBeDisplayed();
        await expect($(page.icecream)).toBeDisplayed();
        await expect($(page.counterbox)).toBeDisplayed();
        await expect($(page.counterdisplay)).toBeExisting();
        await expect($(page.counterplus)).toBeExisting();
        await expect($(page.countervalue)).toBeExisting();
    })
    it('Car search Modal Appears ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.Carsearchmodalappears();
        await expect($(page.carmodalwrapper)).toBeDisplayed();
        await expect($(page.carmodalbutton)).toBeDisplayed();
        await expect($(page.carmodalmainbutton)).toBeDisplayed();
    })
})

