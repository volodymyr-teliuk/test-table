import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dynamic',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.sass']
})
export class DynamicComponent implements OnInit {

  @Input() set dataSource(value: string) {
    if (value) {
      this.data = value;
    }
  }

  data: string;

  constructor() { }

  ngOnInit(): void {
  }

}
