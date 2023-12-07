const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Function to get project-specific credentials
function get_owner(projectName) {
    const credentialsPath = path.join(__dirname, 'repo_owner.json');
    const rawCredentials = fs.readFileSync(credentialsPath);
    const credentials = JSON.parse(rawCredentials);

    return credentials[projectName];
}

exports.fetchGitHubData = async (developerName, projectName, metric) => {
    try {
        // Get the credentials for the specified project
        const projectCredentials = get_owner(projectName);

        // Calculate the timestamp for one hour ago
        // const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

        // Construct the URL for the GitHub API request with the 'since' parameter
        const url = `https://api.github.com/repos/${projectCredentials.owner}/${projectName}/commits?author=${developerName}&since=${sevenDaysAgo}`;
        
        // Make the request to the GitHub API using the token
        const token = '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'
        const response = await axios.get(url, {
            headers: { 'Authorization': `token ${token}` }
        });

        const commitCount = response.data.length;

        return commitCount;
        // Process and return this data as per your requirement
    } catch (error) {
        return ("The REST API call was not successful. Please check user input!"); // Consider more detailed error handling
    }
};
