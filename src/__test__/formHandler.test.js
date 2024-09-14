const { handleSubmit, mapPolarity } = require('../client/js/formHandler');

describe('Form Handler Functions', () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <input id="URL" value="https://example.com">
            <div id="score_tag"></div>
            <div id="agreement"></div>
            <div id="subjectivity"></div>
            <div id="confidence"></div>
            <div id="irony"></div>
        `;

        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({
                    score_tag: 'P+',
                    agreement: 'AGREEMENT',
                    subjectivity: 'SUBJECTIVE',
                    confidence: '100',
                    irony: 'NONIRONIC'
                }),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should process a valid URL and reflect results on the page', async () => {
        const mockEvent = {
            preventDefault: jest.fn(),
        };

        global.Client = {
            checkForURLValidity: jest.fn().mockReturnValue(true),
        };

        await handleSubmit(mockEvent);

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/api', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: 'https://example.com' }),
        });

        expect(document.querySelector('#score_tag').textContent).toBe('STRONG POSITIVE');
        expect(document.querySelector('#agreement').textContent).toBe('AGREEMENT');
        expect(document.querySelector('#subjectivity').textContent).toBe('SUBJECTIVE');
        expect(document.querySelector('#confidence').textContent).toBe('100');
        expect(document.querySelector('#irony').textContent).toBe('NONIRONIC');
    });

    it('should notify the user if the URL is invalid', async () => {
        const mockEvent = {
            preventDefault: jest.fn(),
        };

        global.Client.checkForURLValidity = jest.fn().mockReturnValue(false);
        global.alert = jest.fn();

        await handleSubmit(mockEvent);

        expect(global.alert).toHaveBeenCalledWith('Invalid URL. Please enter a valid URL.');
    });

    it('should correctly translate sentiment scores into descriptive text', () => {
        const cases = [
            { score: 'P+', expected: 'STRONG POSITIVE' },
            { score: 'P', expected: 'POSITIVE' },
            { score: 'NEW', expected: 'NEUTRAL' },
            { score: 'N', expected: 'NEGATIVE' },
            { score: 'N+', expected: 'STRONG NEGATIVE' },
            { score: 'NONE', expected: 'NO SENTIMENT' },
            { score: 'UNKNOWN', expected: 'UNKNOWN' },
        ];

        cases.forEach(({ score, expected }) => {
            expect(mapPolarity(score)).toBe(expected);
        });
    });

});
