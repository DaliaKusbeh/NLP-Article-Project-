// Function to validate a URL
const validateURL = (url) => {
    // Regular expression to match a valid URL pattern
    const urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}\/?.*$/;

    // Test the input URL against the regular expression
    return urlPattern.test(url) ? 1 : 0;
};

export { validateURL };
