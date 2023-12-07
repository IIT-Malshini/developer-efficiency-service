const githubService = require('../services/githubService');
const databaseService = require('../services/databaseService');

exports.calculateProductivity = async (req, res) => {
    try {
        const { developerName, projectName, metric } = req.body;
        const data = await githubService.fetchGitHubData(developerName, projectName, metric);
        
        // Further processing and save to database can be done here
        res.json(data)  

        if (data != 'The REST API call was not successful. Please check user input!')            
            // Save to Database
            databaseService.saveCommitCountToDatabase(metric, developerName, projectName, data)
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        // Send a user-friendly error message
        res.status(500).json({ error: "There was a problem displaying the response." });
    }
};

