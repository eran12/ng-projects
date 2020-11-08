import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-un-moduled',
  templateUrl: './table-un-moduled.component.html',
  styleUrls: ['./table-un-moduled.component.scss']
})
export class TableUnModuledComponent implements OnInit {

  public rows = [
    {
      firstName: 'Lionel',
      lastName: 'Richie',
      age: 71,
      dateOfBirth: new Date('June 20, 1949'),
      address: 'US',
      state: 'us',
      hobbies: {
        indoor: '',
        outdoor: ''
      }
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
