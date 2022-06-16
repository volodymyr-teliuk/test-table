import { StatusEnum } from '../enums/status.enum';

export interface TestDataInterface {
  id: number;
  version: string;
  createDate: string;
  status: StatusEnum;
  statusChangedDate: string;
  action: string;
}
