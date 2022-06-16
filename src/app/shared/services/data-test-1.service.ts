import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TestDataInterface } from '../interfaces/test-data.interface';
import { StatusEnum } from '../enums/status.enum';
import { ColumnsToDisplayInterface } from '../modules/shared-table/interfaces/columns-to-display.interface';
import { DataTableItemInterface } from '../modules/shared-table/interfaces/data-table.interface';

@Injectable()
export class DataTest1Service {

  data: DataTableItemInterface[];
  columnsToDisplay: ColumnsToDisplayInterface[];

  private dataSource$: BehaviorSubject<TestDataInterface[]> = new BehaviorSubject<TestDataInterface[]>([
    {
      id: 1,
      version: 'v 1',
      createDate: '',
      status: StatusEnum.NOT_COMPLETED,
      statusChangedDate: 'Thu, 15 Jun 2022 08:13:46 GMT',
      action: 'Оновити статус',
    },

    {
      id: 2,
      version: 'v 2',
      createDate: 'Thu, 16 Jun 2022 08:13:46 GMT',
      status: StatusEnum.SUCCESS,
      statusChangedDate: 'Thu, 16 Jun 2022 08:13:46 GMT',
      action: 'Оновити статус',
    },

    {
      id: 3,
      version: 'v 3',
      createDate: 'Thu, 17 Jun 2022 08:13:46 GMT',
      status: StatusEnum.FAILED,
      statusChangedDate: 'Thu, 17 Jun 2022 08:13:46 GMT',
      action: 'Оновити статус',
    },

    {
      id: 4,
      version: 'v 4',
      createDate: 'Thu, 18 Jun 2022 08:13:46 GMT',
      status: StatusEnum.NOT_COMPLETED,
      statusChangedDate: 'Thu, 18 Jun 2022 08:13:46 GMT',
      action: 'Оновити статус',
    },

  ]);

  private columnsToDisplaySource$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'version',
    'createDate',
    'status',
    'statusChangedDate',
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
          };
          if (key === 'status' && dataSourceItem.status !== StatusEnum.NOT_COMPLETED) {
            Object.assign(dataTable[key], {
              extraClass: dataSourceItem.status === StatusEnum.SUCCESS ? 'success' : 'failed',
              showDynamicComponent: false,
            });
          }
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
          title: columnToDisplay === 'version' ? 'Версія' :
            columnToDisplay === 'createDate' ? 'Дата створення' :
              columnToDisplay === 'status' ? 'Статус' :
                columnToDisplay === 'action' ? '' :
                  'Дата зміни статусу',
          active: true,
        };
      })),
    );
  }


  updateStatus(item: DataTableItemInterface): void {
    item['status'].data = StatusEnum.SUCCESS;
    const sourceData = this.dataSource$.getValue();
    sourceData.find(sourceItem => sourceItem.id === item['id'].data).status = StatusEnum.SUCCESS;
    this.dataSource$.next(sourceData);
  }
}
