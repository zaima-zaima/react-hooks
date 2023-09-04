export interface ResponseDataType<T> {
  code: number;
  msg: string;
  data: T;
}

type Count<T> = {
  datas: T;
  count: number;
};

export type ResponseDataTypeWidthCount<T> = ResponseDataType<Count<T>>;
