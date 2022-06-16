export interface DataTableItemInterface {
  [key: string]: {
    data: any;
    extraClass?: string;
    showDynamicComponent?: boolean;
  };
}
