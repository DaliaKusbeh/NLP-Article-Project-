// urlChecker.test.js
const { checkForURLValidity } = require('../client/js/urlChecker');

describe('URL Validity Checker Tests', () => {

    const validURLs = [
        'http://example.com',
        'https://example.com',
        'www.example.com',
        'example.com',
        'https://www.example.com/path?name=test#anchor',
        'http://subdomain.example.com',
        'https://example.co.uk'
    ];

    const invalidURLs = [
        'htp://example',
        'example',
        'ftp://example.com',
        'http://.com',
        'http://example.',
        'http://example.c',
        'http://example,com'
    ];

    test.each(validURLs)('should validate "%s" as a valid URL', (url) => {
        expect(checkForURLValidity(url)).toBe(1);
    });

    test.each(invalidURLs)('should validate "%s" as an invalid URL', (url) => {
        expect(checkForURLValidity(url)).toBe(0);
    });

});
