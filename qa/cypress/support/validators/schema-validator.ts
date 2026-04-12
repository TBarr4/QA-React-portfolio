import Ajv, { type ValidateFunction, type ErrorObject } from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true, verbose: true });
addFormats(ajv);

export class SchemaValidator {
  private validate: ValidateFunction;

  constructor(schema: object) {
    this.validate = ajv.compile(schema);
  }

  isValid(data: unknown): boolean {
    return this.validate(data) as boolean;
  }

  getErrors(): ErrorObject[] | null | undefined {
    return this.validate.errors;
  }

  assertValid(data: unknown): void {
    const valid = this.isValid(data);
    if (!valid) {
      const errorMessages = this.validate.errors
        ?.map((err) => `${err.instancePath} ${err.message}`)
        .join('; ');
      throw new Error(`Schema validation failed: ${errorMessages}`);
    }
  }
}

export function validateSchema(schema: object, data: unknown): {
  valid: boolean;
  errors: ErrorObject[] | null | undefined;
} {
  const validator = new SchemaValidator(schema);
  const valid = validator.isValid(data);
  return { valid, errors: validator.getErrors() };
}
