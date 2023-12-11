import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ParquetService } from 'src/app/services/parquet.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    show_loader: any = false;
    @Output() newItemEvent = new EventEmitter();

    constructor(private parquetService: ParquetService) {

    }
    ngOnInit(): void {

    }

    @HostListener('window:keyup.enter', ['$event'])
    handleEnterKeyUp(event: KeyboardEvent) {
        this.executeQuery()
    }

    async executeQuery() {
        let location = (document.querySelector('#queryInputLocation') as HTMLInputElement)?.value.trim()
        let beds = +(document.querySelector('#queryInputBaths') as HTMLInputElement)?.value.trim()
        let baths = +(document.querySelector('#queryInputBeds') as HTMLInputElement)?.value.trim()
        if (location === '') {
            alert('Please enter a state.');
            return;
        }
        let query = `SELECT * FROM parquet_data2 WHERE state LIKE '%${location}%'`;

        if (beds > 0) {
            query += ` AND beds >= ${beds}`
        }

        if (baths > 0) {
            query += ` AND baths >= ${baths}`
        }


        let time_before = Date.now()
        this.show_loader = true
        let results = await this.parquetService.fetchQuery(query)
        this.show_loader = false
        let time_elapsed = Date.now() - time_before

        this.newItemEvent.emit({ results, time_elapsed });

    }

}
