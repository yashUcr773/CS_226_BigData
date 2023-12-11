import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'airbnb_final_project';
    results: any;
    time_elapsed: any;
    num_results: any;

    constructor() {

    }

    results_fetch_event(event: any) {
        this.results = event.results
        this.time_elapsed = event.time_elapsed
        this.num_results = event.results.length
    }


}
