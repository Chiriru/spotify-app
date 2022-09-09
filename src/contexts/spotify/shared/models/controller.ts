export interface ControllerRequest<BodyType = any, ParamType = Record<string, string>> {
  token: string,
  body: BodyType,
  path: string,
  ip: string,
  method: string,
  params: ParamType,
  query: Record<string, string>,
  headers: Record<string, string>
}
export interface ControllerResponse<T = any> {
  statusCode: number,
  message: string,
  data?: T
}
export type Controller<T = any> = (request: ControllerRequest) => ControllerResponse<T> | Promise<ControllerResponse<T>>;

export const createResponse = <T>(statusCode: number, message: string, data?: T): ControllerResponse => ({ statusCode, message, data });