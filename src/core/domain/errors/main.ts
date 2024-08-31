export abstract class ErrorBase extends Error {
    constructor(message: string, options?: ErrorOptions) {
        super(message, options);
      }
}
export class SetEnvError extends ErrorBase {}
export class VerificationOperationError extends ErrorBase {}
export class StorageOperationError extends ErrorBase {}
export class DatabaseOperationError extends ErrorBase {}
export class DatabaseFindError extends ErrorBase {}
export class NotFoundError extends ErrorBase {}
export class InputParseError extends ErrorBase {}