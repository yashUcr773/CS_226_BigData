import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-display-listing',
    templateUrl: './display-listing.component.html',
    styleUrls: ['./display-listing.component.scss']
})
export class DisplayListingComponent implements OnInit{

    @Input('listing_data') listing_data: any;
    constructor() {
    }
    ngOnInit(): void {
        this.listing_data = JSON.parse(this.listing_data)
    }

}
