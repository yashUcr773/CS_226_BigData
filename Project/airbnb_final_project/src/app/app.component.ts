import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'airbnb_final_project';

    constructor() {

    }

  async executeQuery() {
    const queryInput:any = document.getElementById('queryInput');
    const resultContainer:any = document.getElementById('resultContainer');

    // Get user-entered location
    const location = queryInput.value.trim();

    if (location === '') {
        alert('Please enter a location.');
        return;
    }

    // Prepare the query
    const query = `SELECT * FROM parquet_data2 WHERE host_location LIKE '%${location}%'`;

    try {
        // Send the query to the backend
        const response = await fetch('/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        // Parse the response as JSON
        const result = await response.json();

        // Display the result in the result container
        resultContainer.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;
    } catch (error:any) {
        console.error('Error executing query:', error.message);
        resultContainer.innerHTML = `<p>Error executing query. Please try again.</p>`;
    }
}
}
