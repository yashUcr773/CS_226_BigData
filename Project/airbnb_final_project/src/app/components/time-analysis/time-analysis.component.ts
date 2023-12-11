import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-time-analysis',
    templateUrl: './time-analysis.component.html',
    styleUrls: ['./time-analysis.component.scss']
})
export class TimeAnalysisComponent implements OnInit {

    @Input('time') time: any;
    @Input('num_results') num_results: any;

    constructor() {

    }

    ngOnInit(): void {

    }

    calculateTime(time: number) {
        if (time < 1000) {
            return time / 1000 + ' seconds'
        } else if (time < 1000 * 60) {
            return time / 1000 + ' seconds'
        } else if (time > 1000 * 60) {
            return time / 1000 + ' minutes'
        } else {
            return time / 1000 + ' seconds'
        }

    }


}

