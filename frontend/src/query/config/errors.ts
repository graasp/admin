export class UndefinedArgument extends Error {
  constructor(data?: object) {
    super();
    this.message = `UnexpectedInput ${JSON.stringify(data ?? {})}`;
    this.name = 'UnexpectedInput';
    this.stack = new Error().stack;
  }
}
