import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.sass']
})
export class DateComponent implements OnInit {
  @Input() set dateSource(value: string) {
    if (value) {
      this.date = new Date(value);
    }
  }

  date: Date;

  constructor() { }

  ngOnInit(): void {
  }

}
