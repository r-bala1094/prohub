/**
 * check Mime - Tyoe of Upload file for security of file
 */

/** use for mime type checker */
const requiredMetadataKey = Symbol('MimeTypeCheckUploadFile');

export function MimeOutput(
  target: { [key: string]: string },
  propertyKey: string,
  parameterNumber: number
) {
  const existingParameters =
    ((Reflect as unknown) as {
      getOwnMetadata: (
        arg0: typeof requiredMetadataKey,
        arg1: { [key: string]: string },
        arg2: string
      ) => [];
    }).getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingParameters.push({ type: 'output', value: parameterNumber } as never);
  ((Reflect as unknown) as {
    defineMetadata: (
      arg0: typeof requiredMetadataKey,
      arg1: Array<{ [key: string]: string }>,
      arg2: { [key: string]: string },
      arg3: string
    ) => [];
  }).defineMetadata(
    requiredMetadataKey,
    existingParameters,
    target,
    propertyKey
  );
}

export function MimeInput(
  target: { [key: string]: string },
  propertyKey: string,
  parameterNumber: number
) {
  const existingParameters =
    ((Reflect as unknown) as {
      getOwnMetadata: (
        arg0: typeof requiredMetadataKey,
        arg1: { [key: string]: string },
        arg2: string
      ) => [];
    }).getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingParameters.push({ type: 'input', value: parameterNumber } as never);
  ((Reflect as unknown) as {
    defineMetadata: (
      arg0: typeof requiredMetadataKey,
      arg1: Array<{ [key: string]: string }>,
      arg2: { [key: string]: string },
      arg3: string
    ) => [];
  }).defineMetadata(
    requiredMetadataKey,
    existingParameters,
    target,
    propertyKey
  );
}

export function MimeTypeCheckOfUploadFile(
  mimeTypes: Array<string> | { [key: string]: string },
  sizeLimit: number
): any {
  return function (
    target: { [key: string]: string },
    propertyKey: string,
    descriptor: { value: (...args: { [key: string]: string }[]) => void }
  ) {
    const method = descriptor.value;

    descriptor.value = function (...args: Array<{ [key: string]: string }>) {
      const requiredParameters = ((Reflect as unknown) as {
        getOwnMetadata: (
          arg0: typeof requiredMetadataKey,
          arg1: { [key: string]: string },
          arg2: string
        ) => [];
      }).getOwnMetadata(requiredMetadataKey, target, propertyKey);

      const input: { [key: string]: string | number } =
        findOutputAndInputParameterIndex(requiredParameters, 'input') || {};
      const output: { [key: string]: string | number } =
        findOutputAndInputParameterIndex(requiredParameters, 'output') || {};

      /**
       * checking the file mime type
       */

      const { mimetype, size } = args[input.value as number] || {};

      const resultObject = {
        fileExists: true,
        isSize: false,
        isMimeType: false,
      };

      /** check mime type */

      if (!mimetype && !size) {
        resultObject.fileExists = false;
        /** */
      } else {
        if ((mimeTypes as string[]).indexOf(mimetype) >= 0) {
          resultObject.isMimeType = true;
        }
        /** check size limit */
        if (((size as unknown) as number) <= sizeLimit) {
          resultObject.isSize = true;
        }
      }

      /** set this to arguments output */

      (args as unknown[])[output.value as number] = resultObject;

      /** call existing function definition */
      return method.call(this, ...args);
    };
  };
}

function findOutputAndInputParameterIndex(
  parameterIndexArray: Array<{ [key: string]: string }>,
  parameterType: string
) {
  return parameterIndexArray.find(
    ({ type }: { [key: string]: string }) => type === parameterType
  );
}
