export interface IRepositoryInterface {
  create(data: any): Promise<any>;

  list(): Promise<Array<any>>;

  findById?(id: string): Promise<any>;

  update?(id: string, data: any): Promise<any>;

  delete?(id: string): Promise<any>;
}
