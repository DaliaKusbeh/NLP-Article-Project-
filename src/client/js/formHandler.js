// Function to handle form submission
const handleFormSubmission = async (event) => {
    event.preventDefault();

    const urlValue = document.getElementById('URL').value;

    if (Client.isValidURL(urlValue)) {
        try {
            const apiResponse = await postDataToAPI('http://localhost:8000/api', { url: urlValue });
            console.log('API Response:', apiResponse);
            displayResultsOnPage(apiResponse);
        } catch (error) {
            console.error('Error during API request:', error);
        }
    } else {
        alert('The URL provided is not valid. Please enter a correct URL.');
    }
};

// Function to send a POST request and return the response
const postDataToAPI = async (apiEndpoint, data) => {
    console.log('Sending payload:', data);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'same-origin',
        mode: 'cors'
    };

    try {
        const response = await fetch(apiEndpoint, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log('Received data:', responseData);
        return responseData;
    } catch (error) {
        console.error('Fetch request failed:', error);
        throw error;
    }
};

// Function to update the webpage with the results from the API
const displayResultsOnPage = (apiData) => {
    const resultElements = {
        scoreTag: 'score_tag',
        agreementStatus: 'agreement',
        subjectivityLevel: 'subjectivity',
        confidenceScore: 'confidence',
        ironyStatus: 'irony'
    };

    Object.keys(resultElements).forEach(key => {
        const value = apiData[key] || 'Not Available';
        document.getElementById(resultElements[key]).textContent = formatResult(key, value);
    });
};

// Function to format the result data for display
const formatResult = (resultKey, resultValue) => {
    if (resultKey === 'scoreTag') {
        return getPolarityDescription(resultValue);
    }
    return resultValue;
};

// Function to convert sentiment score to a readable format
const getPolarityDescription = (polarityScore) => {
    const polarityMap = {
        'P+': 'Strong Positive',
        'P': 'Positive',
        'NEW': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong Negative',
        'NONE': 'No Sentiment'
    };

    return polarityMap[polarityScore] || 'Unknown';
};

export { handleFormSubmission, getPolarityDescription };
