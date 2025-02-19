import { parse, type GenericSchema } from 'valibot';

export interface ValibotDto<TOutput = any> {
  new(): TOutput
  isValibotDto: true
  schema: GenericSchema<TOutput>
  create(input: unknown): TOutput
};

export const createDto = <
  TInput = object
>(schema: GenericSchema<TInput>) =>
  class DtoGenerator {
    public static isValibotDto = true;
    public static schema = schema;
    public static create = (input: unknown) => parse(schema, input);
  } as ValibotDto<TInput>;
