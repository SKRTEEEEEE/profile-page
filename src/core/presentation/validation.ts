import { z } from "zod";
import { IntlKey } from "../domain/entities/intl.type";
interface SchemaOptions {
  minLength?: number;
  maxLength?: number;
  minMessage?: string;
  maxMessage?: string;
  isRequired?: boolean;
  defaultValue?: string;
}
export function createIntlZodInput(options: SchemaOptions = {}) {
  const defaultOptions: Required<SchemaOptions> = {
    minLength: 0,
    maxLength: Infinity,
    minMessage: "El texto es demasiado corto",
    maxMessage: "El texto es demasiado largo",
    isRequired: true,
    defaultValue: ""
  };

  const fieldOptions: Required<SchemaOptions> = {
    ...defaultOptions,
    ...options
  };

  // Crear el schema base
  let fieldSchema: z.ZodString = z.string();

  // Aplicar validaciones según las opciones
  if (fieldOptions.minLength > 0) {
    fieldSchema = fieldSchema.min(
      fieldOptions.minLength,
      fieldOptions.minMessage
    );
  }

  if (fieldOptions.maxLength !== Infinity) {
    fieldSchema = fieldSchema.max(
      fieldOptions.maxLength,
      fieldOptions.maxMessage
    );
  }

  // Determinar si es opcional
  let finalSchema: z.ZodString | z.ZodOptional<z.ZodString> = fieldSchema;
  if (!fieldOptions.isRequired) {
    finalSchema = fieldSchema.optional();
  }

  // Crear el objeto con el mismo schema para todos los idiomas
  const languageKeys: IntlKey[] = [IntlKey.es, IntlKey.en, IntlKey.ca, IntlKey.de];
  const schemaObject = Object.fromEntries(
    languageKeys.map(lang => [lang, finalSchema])
  );

  return z.object(schemaObject);
}