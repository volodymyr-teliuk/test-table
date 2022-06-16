import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { ColumnsToDisplayInterface } from './interfaces/columns-to-display.interface';
import { DataTableItemInterface } from './interfaces/data-table.interface';
import { DynamicComponent } from './components/dynamic/dynamic.component';

@Component({
  selector: 'app-shared-table',
  templateUrl: './shared-table.component.html',
  styleUrls: ['./shared-table.component.sass']
})
export class SharedTableComponent implements OnInit {
  @Input() set dataSource(values: DataTableItemInterface[]) {
    if (values) {
      console.log(values);
      this.data = values;
    }
  }

  @Input() set columnsToDisplay(values: ColumnsToDisplayInterface[]) {
    if (values) {
      this.columns = values;
      this.columnsName = values.map(column => column.name);
    }
  }

  @Output() public onAction = new EventEmitter<DataTableItemInterface>();

  @ViewChildren('cellContainer', { read: ViewContainerRef, emitDistinctChangesOnly: true }) public containers: QueryList<ViewContainerRef>;

  private componentRef: ComponentRef<any>;

  data: DataTableItemInterface[] | undefined;
  columns: ColumnsToDisplayInterface[] | undefined;

  columnsName: string[];

  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
  }

  action(item: DataTableItemInterface, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.onAction.emit(item);
  }

  replaceComponent(item: DataTableItemInterface, i: number, column: ColumnsToDisplayInterface): void {
    if (!item[column.name]) {
      Object.assign(item, {
        [column.name] : {
          data: '--',
          showDynamicComponent: false,
        }
      });
    }
    const index = this.data.length * column.position + i;
    item[column.name].showDynamicComponent = !item[column.name].showDynamicComponent;
    this.containers.get(index).clear();
    if (item[column.name].showDynamicComponent) {
      this.componentRef = this.containers.get(index).createComponent(DynamicComponent);
      this.componentRef.instance.dataSource = item[column.name]?.data || '-';
      this.cdr.detectChanges();
    }

  }

  hideColumn(column: ColumnsToDisplayInterface): void {
    column.active = !column.active;
    this.columnsName = this.columns.filter(column => column.active).map(column => column.name);
  }

}
