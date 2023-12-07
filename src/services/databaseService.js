require('dotenv').config();
const sql = require('mssql');

// Azure SQL Database configuration
const config = {
  server: 'developer-iq.database.windows.net',
  database: 'developer-iq',
  user: 'IIT-Cloud',
  password: '2023developer@',
  options: {
    encrypt: true, // Use this if you're on Windows Azure
  },
};

// Function to save commit count to the database
const saveCommitCountToDatabase = async (metric, developerName, projectName, commitCount) => {
  try {
    // Connect to the database
    await sql.connect(config);

    // Create a new request object
    const request = new sql.Request();

    // Define your SQL query to update or insert the commit count
    const query = `
    INSERT INTO prod.developer_iq (MetricName, DeveloperName, ProjectName, MetricValue, CalculatedTimestamp)
    VALUES ('${metric}', '${developerName}', '${projectName}', '${commitCount}', '${new Date().toISOString()}');
    `;


    // Execute the query
    const result = await request.query(query);

    // Close the database connection
    await sql.close();

    // Return the result of the query execution
    return result;
  } catch (error) {
    console.error('Error saving commit count to the database:', error.message);
    throw error;
  }
};

module.exports = {
  saveCommitCountToDatabase,
};
