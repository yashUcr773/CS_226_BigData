import { Injectable } from '@angular/core';

@Injectable()
export class ParquetService {

    async fetchQuery(query: any) {
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
            return result
        } catch (error: any) {
            console.error('Error executing query:', error.message);
            return error
        }
    }

}