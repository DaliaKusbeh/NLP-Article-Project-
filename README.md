# Analyze News Articles with Natural Language Processing

## Overview
This web application enables users to evaluate news articles using Natural Language Processing (NLP). By leveraging the MeaningCloud API, the application analyzes various linguistic aspects of the articles, including sentiment polarity, agreement, subjectivity, confidence, and irony.

## Key Features
- **Sentiment Polarity**: Determine if the sentiment is positive, neutral, or negative.
- **Agreement Analysis**: Assess whether the text shows agreement or disagreement.
- **Subjectivity Detection**: Classify the content as subjective or objective.
- **Confidence Scoring**: Evaluate the confidence level of the sentiment analysis.
- **Irony Identification**: Detect if the text contains irony.

## Installation Guide

### Prerequisites
Ensure you have the following installed:
- Node.js and npm
- A valid MeaningCloud API key

### Setup Instructions
1. **Clone the Repository**
    ```bash
    git clone https://github.com/DaliaKusbeh/NLP-Article-Project-.git
    cd NLP-Article-Project-
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Configure API Key**
    - Create a `.env` file in the root directory of your project.
    - Add your MeaningCloud API key to the `.env` file:
    ```bash
    API_KEY=your_meaningcloud_api_key
    ```

4. **Build the Project**
    ```bash
    npm run build-prod
    ```

5. **Start the Development Server**
    ```bash
    npm start
    ```

## How to Use
1. Open your browser and go to `http://localhost:8000`.
2. Input the URL of the article you wish to analyze.
3. Click the "Analyze" button to view the analysis results.

## Dependencies
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Webpack](https://webpack.js.org/)
- [Workbox Webpack Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
- [MeaningCloud API](https://www.meaningcloud.com/developer/apis)

## Contributing
To contribute to the project:
1. **Fork the Repository** to your own GitHub account.
2. **Create a New Branch**:
    ```bash
    git checkout -b your-feature-branch
    ```
3. **Make Your Changes** and test thoroughly.
4. **Commit and Push** your changes:
    ```bash
    git commit -m "Describe your changes"
    git push origin your-feature-branch
    ```
5. **Submit a Pull Request** with a description of the changes.

Feel free to explore and contribute to make the project better!
