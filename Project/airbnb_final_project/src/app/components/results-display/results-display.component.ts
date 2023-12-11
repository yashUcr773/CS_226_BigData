import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-results-display',
    templateUrl: './results-display.component.html',
    styleUrls: ['./results-display.component.scss']
})
export class ResultsDisplayComponent implements OnInit {
    @Input('data') data: any;
    total_results_count: any;
    curr_page: any
    page_count: any
    results_per_page = 100;
    results_to_display: any;

    constructor() {

    }

    ngOnInit(): void {
        this.total_results_count = Object.keys(this.data).length;
        this.page_count = Math.ceil(this.total_results_count / this.results_per_page)
        this.curr_page = 0
        setTimeout(() => {
            this.goToPage(this.curr_page)
        })
    }

    goToPage(page: any) {
        if (page < 0 || page >= this.page_count) {
            return
        }
        this.results_to_display = this.data.slice(page * this.results_per_page, (page + 1) * (this.results_per_page))

        document.querySelector('#page-' + this.curr_page)?.classList.remove('active')
        this.curr_page = page
        document.querySelector('#page-' + this.curr_page)?.classList.add('active')
    }

    getIterable(size: number) {
        return Array(size).map((a, idx) => { idx })
    }


}
