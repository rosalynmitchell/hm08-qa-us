exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],
    maxInstances: 10,
    headless: true,
    capabilities: [
    {
        maxInstances: 5,
        browserName: 'firefox',
        acceptInsecureCerts: true,
        'moz:firefoxOptions': {
            binary: '/Applications/Firefox.app/Contents/MacOS/firefox'
            //args: ['-headless']
        }
    }
],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://cnt-e604678b-25d9-4adc-bcbf-65aa097e9174.containerhub.tripleten-services.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [ 
        'geckodriver', 
        'intercept', 
    ],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
}