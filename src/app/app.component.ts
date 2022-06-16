import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { DataTableItemInterface } from './shared/modules/shared-table/interfaces/data-table.interface';
import { DataTest1Service } from './shared/services/data-test-1.service';
import { DataTest2Service } from './shared/services/data-test-2.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<boolean>();

  constructor(public dataService1: DataTest1Service,
              public dataService2: DataTest2Service,
  ) {}

  ngOnInit() {
    this.dataService1.createTableData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.dataService1.data = data);

    this.dataService1.createDataColumn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(columns => this.dataService1.columnsToDisplay = columns);

    this.dataService2.createTableData().pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => this.dataService2.data = data);

    this.dataService2.createDataColumn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(columns => this.dataService2.columnsToDisplay = columns);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }

  updateStatus(item: DataTableItemInterface): void {
    this.dataService1.updateStatus(item);
  }

}
