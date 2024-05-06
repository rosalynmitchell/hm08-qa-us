In project 8 I used Javascript code in visual studios to write several to check the functionality of Urban Routes. I wrote my test in the createAnOrder.e2e.js file located in the test/specs folder.

Open Visual Studio: 
At the top of the left hand corner click the double paper icon. 
Open folder hm08-qa-us
Select createanorder.e2e.js, page.js, wdio.config.js (All files will have their own tab).
Update server in base url of wdio.config.js in visual studio (must update server url periodically to continue running tests).
Go to search bar 
type >terminal
Select developer: write data to terminal 

Before working on project run npm install from the console in your project folder.

First test is selecting the address. Page.js and createanorder.e2e.js has preinstalled functions for this tests. 

Page.js: 
    // Functions
    fillAddresses: async function(from, to) {
        const fromField = await $(this.fromField);
        await fromField.setValue(from);
        const toField = await $(this.toField);
        await toField.setValue(to);
        const callATaxiButton = await $(this.callATaxiButton);
        await callATaxiButton.waitForDisplayed();
        await callATaxiButton.click();
Createanorder.e2e.js
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

    run npm run wdio in the terminal in visual studio.
    first test should pass in terminal. 

    On your computer go to firefox or Google chrome Browser
    copy and paste server url in address. click enter. 
    Urban Routes app appear.
    Open dev tools 
    MAC: cmd + option + C 
    WINDOWS: ctrl + shift + C

    Second tests is selecting the supportive plan
    Go to urban routes
    enter address click call a taxi 
    click supportive (blue car)
    right click : inspect 
    look for correct inputs or buttons for the supportive plan. 
    Add code to page.js file. 

    Page.js file 
     // Buttons
    callATaxiButton: 'button=Call a taxi',
    phoneNumberButton: '//div[starts-with(text(), "Phone number")]',
    nextButton: 'button=Next',
    confirmButton: 'button=Confirm',
    supportivePlanButton: 'div=Supportive',

    Go to createandorder.e2e.js and add this functions to test the supportive plan in urban routes. 
    it('Should select the supportive plan', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    })

    run npm run wdio in terminal in Visual studio
    Popup window will appear with test running. 
    test should pass in the terminal.

    Third test is filling in the phone number. 
    locators and functions for filling in the phone number are pre installed in page.js
    Go to createandordere2e.js and enter the following function:
    it('should fill in phone number', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })
     
      run npm run wdio in terminal in Visual studio
    Popup window will appear with test running. 
    test should pass in the terminal.

    Fourth test is adding credit card
    Go to urban routes scroll down to payment method 
    Look in dev tools and find the right locators and inputs and add them to the page.js  file
    //inputs
    codeField: '#code',
    cardNumberField: '#number',
    cvvCode: '.card-second-row #code',
    //Buttons
    paymentMethodButton: '.pp-text',
    addCardButton: '.pp-plus-container',
Write the following function in page.js: 
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
    Go to createandordere2e.js and add the following function: 
    it('should add credit card number and CVV code ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        //await page.FillCardNumber('1234 0098 2233');
        //await page.FillCvvCode('12');
        await page.AddPaymentmethodcard();
        await  expect($(page.linkButton)).toBeExisting();
        await expect($(page.addCardButton)).toBeExisting();
        await  expect($(page.linkButton)).toBeExisting();
        await expect($(page.paymentMethodButton)).toBeExisting();
    })
    run  npm run wdio in the terminal in visual studio 
    test should pass 

    Fifth test is writing a message to the driver
    Go to urban routes scroll down to message to the driver. Add a message.
    Look in dev tools and find the right locators and inputs and add them to the page.js  file
    //inputs 
    messagetoDriverField: '#comment.input',
    Write the following function in page.js: 
           const messagetoDriverField = await $(this.messagetoDriverField);
        await messagetoDriverField.waitForDisplayed();
        await messagetoDriverField.scrollIntoView();
        await messagetoDriverField.setValue("Get some apples.");
    },
    Go to createandordere2e.js and add the following function: 
     it('Should fill comment in message field ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.fillComment();
        await expect($(page.messagetoDriverField)).toBeExisting();
    })
    run  npm run wdio in the terminal in visual studio 
    pop up window will appear to run the test
    test should pass

    Sixth test is ordering a blanket and handkerchief. 
    Go to urban routes scroll down to order requirements
    click order requirements. 
    Look in dev tools and find the right locators and inputs for blanker and handkerchief and add them to the page.js  file
    //inputs 
    blanketandhandkercheifs: '.r-sw-label',
    //buttons
    toggledisplay: '.r-sw',
    togglebutton: '.switch',
    toggleswitch: '.switch-input',
    toggleslider: 'span.slider.round',
     Write the following function in page.js: 
     OrderBlankerandhandkerchiefs: async function() {
        const blanketandhandkercheifs = await $(this.blanketandhandkercheifs);
        await blanketandhandkercheifs.waitForDisplayed();
        await blanketandhandkercheifs.scrollIntoView();

        const toggledisplay = await $(this.toggledisplay);
        await toggledisplay.waitForDisplayed();
        
        const togglebutton = await $(this.togglebutton);
        await togglebutton.waitForDisplayed();
        await togglebutton.click();

        const toggleswitch = await $(this.togglebutton);
        await toggleswitch.waitForDisplayed();

        const toggleslider = await $(this.toggleslider);
        await toggleslider.waitForDisplayed();
    },
    Go to createandordere2e.js and add the following function:
        it('Should Select Blanket and Handkercheifs ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.OrderBlankerandhandkerchiefs();
        await expect($(page.blanketandhandkercheifs)).toBeDisplayed();
        await expect($(page.togglebutton)).toBeExisting();
        })
    run  npm run wdio in the terminal in visual studio 
    pop up window will appear to run the test
    test should pass

Seventh test is ordering two ice creams
Go to urban routes scroll down to order requirements
    click order requirements. 
    Look in dev tools and find the right locators and inputs for ice cream and add them to the page.js  file
    //inputs
     icecreambucket: '.r-group-title',
    icecream: '.r-counter-label',
    //buttons
     counterbox: '.r-counter',
    counterdisplay: '.counter',
    countervalue: '.counter-value',
    counterplus: '.counter-plus',
    Write the following function in page.js:
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
    Go to createandordere2e.js and add the following function:
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
    run  npm run wdio in the terminal in visual studio 
    pop up window will appear to run the test
    test should pass

    Eighth test will show the car search modal 
    Go to urban routes 
    User will see a blue box titled Enter the number and order.
    Click the blue box, car search and timer will appear. 
    Look in dev tools and find the right locators and inputs and add them to the page.js  file
    //buttons: 
    carmodalwrapper: '.smart-button-wrapper',
    carmodalbutton: '.smart-button',
    carmodalmainbutton: '.smart-button-main',
 Write the following function in page.js:
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
    Go to createandordere2e.js and add the following function:
     it('Car search Modal Appears ', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.Carsearchmodalappears();
        await expect($(page.carmodalwrapper)).toBeDisplayed();
        await expect($(page.carmodalbutton)).toBeDisplayed();
        await expect($(page.carmodalmainbutton)).toBeDisplayed();
    })
    run  npm run wdio in the terminal in visual studio 
    pop up window will appear to run the test
    test should pass

    To add project to your Github account: 
    go to current directory
    Use command:
    git commit -am "project final version" 
    git push 

    This will push your current project to your Github repository. 