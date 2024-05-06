module.exports = {
    // Inputs
    fromField: '#from',
    toField: '#to',
    phoneNumberField: '#phone',
    codeField: '#code',
    cardNumberField: '#number',
    cvvCode: '.card-second-row #code',
    messagetoDriverField: '#comment.input',
    blanketandhandkercheifs: '.r-sw-label',
    icecreambucket: '.r-group-title',
    icecream: '.r-counter-label',
    // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',
    linkButton: 'button=Link',
    paymentMethodButton: '.pp-text',
    addCardButton: '.pp-plus-container',
    toggledisplay: '.r-sw',
    togglebutton: '.switch',
    toggleswitch: '.switch-input',
    toggleslider: 'span.slider.round',
    counterbox: '.r-counter',
    counterdisplay: '.counter',
    countervalue: '.counter-value',
    counterplus: '.counter-plus',
    carmodalwrapper: '.smart-button-wrapper',
    carmodalbutton: '.smart-button',
    carmodalmainbutton: '.smart-button-main',
    // Modals
    phoneNumberModal: '.modal',
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
    },
    fillPhoneNumber: async function(phoneNumber) {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    submitPhoneNumber: async function(phoneNumber) {
        await this.fillPhoneNumber(phoneNumber);
        // we are starting interception of request from the moment of method call
        await browser.setupInterceptor();
        await $(this.nextButton).click();
        // we should wait for response
        // eslint-disable-next-line wdio/no-pause
        await browser.pause(2000);
        const codeField = await $(this.codeField);
        // collect all responses
        const requests = await browser.getRequests();
        // use first response
        await expect(requests.length).toBe(1)
        const code = await requests[0].response.body.code
        await codeField.setValue(code)
        await $(this.confirmButton).click()
    },
        FillCardNumber: async function(cardNumber) {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed()
        await addCardButton.click();
        const cardNumberField = await $(this.cardNumberField);
        await $(this.cardNumberField).waitForExist();
        await $(this.cardNumberField).waitForDisplayed();
    },
    //FillCvvCode: async function(cvvCodeField) {
        //const cvvCodeField = await $(this.cvvCodeField);
       // await cvvCodeField.setValue(cvvCode);
        //await cvvField.waitForDisplayed();
        //const linkButton = await $(this.linkButton);
        //await linkButton.waitForDisplayed();
        //await linkButton.click();
    //},
    AddPaymentmethodcard: async function() {
        const paymentMethodButton = await $(this.paymentMethodButton);
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
        
        const addCardButton = await $(this.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();

        const cardNumberField = await $(this.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue(12456789098789);
        const cvvCode = await $(this.cvvCode);
        await cvvCode.waitForDisplayed();
        await cvvCode.setValue(45);

        const linkButton = await $(this.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
    },
    fillMessage: async function() {
        const phoneNumberButton = await $(this.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(this.phoneNumberModal);
        await phoneNumberModal.waitForDisplayed()
        const phoneNumberField = await $(this.phoneNumberField);
        await phoneNumberField.waitForDisplayed();
        await phoneNumberField.setValue(phoneNumber);
    },
    fillComment: async function() {
        const messagetoDriverField = await $(this.messagetoDriverField);
        await messagetoDriverField.waitForDisplayed();
        await messagetoDriverField.scrollIntoView();
        await messagetoDriverField.setValue("Get some apples.");
    },
    OrderBlankerandhandkerchiefs: async function() {
        const blanketandhandkercheifs = await $(this.blanketandhandkercheifs);
        await blanketandhandkercheifs.waitForDisplayed();
        await blanketandhandkercheifs.scrollIntoView();

        const toggledisplay = await $(this.toggledisplay);
        await toggledisplay.waitForDisplayed();
        //await toggledisplay.click();
        
        const togglebutton = await $(this.togglebutton);
        await togglebutton.waitForDisplayed();
        await togglebutton.click();

        const toggleswitch = await $(this.togglebutton);
        await toggleswitch.waitForDisplayed();
        //await toggleswitch.click();

        const toggleslider = await $(this.toggleslider);
        await toggleslider.waitForDisplayed();
        //await toggleslider.click();
    },
    Ordertwoicecreams: async function() {
        const icecreambucket = await $(this.icecreambucket);
        await icecreambucket.waitForDisplayed();
        await icecreambucket.scrollIntoView();

        const icecream = await $(this.icecream);
        await icecream.waitForDisplayed();
        
        const counterbox = await $(this.counterbox);
        await counterbox.waitForDisplayed();

        const counterdisplay = await $(this.counterdisplay);
        await counterdisplay.waitForDisplayed();

        const counterplus = await $(this.counterplus);
        await counterplus.waitForDisplayed();
        await counterplus.click();
        await counterplus.click();

        const countervalue = await $(this.countervalue);
        await countervalue.waitForDisplayed();
    },

    Carsearchmodalappears: async function() {
        const carmodalwrapper = await $(this.carmodalwrapper);
        await carmodalwrapper.waitForDisplayed();
        await carmodalwrapper.scrollIntoView();
        await carmodalwrapper.click();

        const carmodalbutton = await $(this.carmodalbutton);
        await carmodalbutton.waitForDisplayed();
        
        const carmodalmainbutton = await $(this.carmodalmainbutton);
        await carmodalmainbutton.waitForDisplayed();
    },
};