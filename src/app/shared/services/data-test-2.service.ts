import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { StatusEnum } from '../enums/status.enum';
import { ColumnsToDisplayInterface } from '../modules/shared-table/interfaces/columns-to-display.interface';
import { DataTableItemInterface } from '../modules/shared-table/interfaces/data-table.interface';
import { TestData2Interface } from '../interfaces/test-data-2.interface';

@Injectable()
export class DataTest2Service {

  data: DataTableItemInterface[];
  columnsToDisplay: ColumnsToDisplayInterface[];

  private dataSource$: BehaviorSubject<TestData2Interface[]> = new BehaviorSubject<TestData2Interface[]>([
    {
      id: 1,
      title: 'test title',
      name: 'name',
      phone: '09876',
      lastUpdateDate: 'Thu, 15 Jun 2022 08:13:46 GMT',
      action: '',
    },

    {
      id: 2,
      title: 'test1 title',
      name: 'name',
      phone: '09876',
      lastUpdateDate: 'Thu, 16 Jun 2022 08:13:46 GMT',
      action: '',
    },

    {
      id: 3,
      title: 'test3 title',
      name: 'name',
      phone: '09876',
      lastUpdateDate: 'Thu, 17 Jun 2022 08:13:46 GMT',
      action: '',
    },

    {
      id: 4,
      title: 'test4 title',
      name: 'name',
      phone: '09876',
      email: 'test@email.com',
      lastUpdateDate: 'Thu, 158Jun 2022 08:13:46 GMT',
      action: '',
    },

  ]);

  private columnsToDisplaySource$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'title',
    'name',
    'phone',
    'email',
    'lastUpdateDate',
    'action',
  ]);

  constructor() { }


  createTableData(): Observable<DataTableItemInterface[]> {
    return this.dataSource$.pipe(
      map(dataSource => dataSource.map(dataSourceItem => {
        let dataTable: DataTableItemInterface = {};
        Object.keys(dataSourceItem).forEach(key => {
          dataTable[key] = {
            data: dataSourceItem[key],
            showDynamicComponent: false,
          };
        });
        return dataTable;
      }))
    );
  }

  createDataColumn(): Observable<ColumnsToDisplayInterface[]> {
    return this.columnsToDisplaySource$.pipe(
      map(columnsToDisplay => <ColumnsToDisplayInterface[]>columnsToDisplay.map((columnToDisplay: string, index: number) => {
        return <ColumnsToDisplayInterface>{
          position: index,
          name: columnToDisplay,
          title: columnToDisplay === 'title' ? 'Назва' :
            columnToDisplay === 'name' ? `Ім'я` :
              columnToDisplay === 'phone' ? 'Телефон' :
                columnToDisplay === 'email' ? 'Пошта' :
                  columnToDisplay === 'lastUpdateDate' ? 'Останнє оновлення' :
                    '',
          active: true,
        };
      })),
    );
  }


  updateStatus(item: DataTableItemInterface): void {
    item['status'].data = StatusEnum.SUCCESS;
    const sourceData = this.dataSource$.getValue();
    this.dataSource$.next(sourceData);
  }
}
