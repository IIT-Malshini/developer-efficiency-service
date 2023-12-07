document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateDropdown('developerName', data.developers);
            populateDropdown('projectName', data.projects);
            populateDropdown('metric', data.metrics);
        });
});

function populateDropdown(id, options) {
    const select = document.getElementById(id);
    options.forEach(option => {
        let opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

document.getElementById('metricForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const developerName = document.getElementById('developerName').value;
    const projectName = document.getElementById('projectName').value;
    const metric = document.getElementById('metric').value;

    fetch('/calculate-productivity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ developerName, projectName, metric })
    })
    .then(response => response.json())
    .then(data => {
        showResults(data, developerName, projectName, metric);
    })
    .catch(error => {
        console.error('Error:', error);
        showResults({ error: 'Error fetching data' });
    });
});

function showResults(data, developerName, projectName, metric) {
    const resultsDiv = document.getElementById('results');
    const formContainer = document.querySelector('.form-container');
    const resetBtn = document.getElementById('resetBtn');
    const welcomeHeader = document.querySelector('.header');
    const welcomeDescription = document.querySelector('p');

    // Hide welcome header and description
    welcomeHeader.style.display = 'none';
    welcomeDescription.style.display = 'none';

    // Hide the form and show the results
    formContainer.style.display = 'none';
    resultsDiv.style.display = 'block';

    // Create and append the title with a class
    const title = document.createElement('h2');
    title.textContent = `${developerName} - ${projectName} - ${metric}`;
    title.classList.add('result-title'); // Add a class to the title
    resultsDiv.appendChild(title);

    // Append the response data with a class
    const responseData = document.createElement('pre');
    responseData.classList.add('response-data'); // Add a class to the response data
    responseData.textContent = JSON.stringify(data, null, 2);
    resultsDiv.appendChild(responseData);

    // Show the reset button
    resetBtn.style.display = 'block';
}

document.getElementById('resetBtn').addEventListener('click', function() {
    const formContainer = document.querySelector('.form-container');
    const resultsDiv = document.getElementById('results');

    // Show welcome header and description
    document.querySelector('.header').style.display = 'block';
    document.querySelector('p').style.display = 'block';

    // Hide results and show the form again
    resultsDiv.style.display = 'none';
    formContainer.style.display = 'block';

    // Remove the title and response data
    resultsDiv.innerHTML = '';

    // Reset form fields and hide the reset button
    document.getElementById('metricForm').reset();
    this.style.display = 'none';
});