import chalk from 'chalk';

export enum EError {
  OK = 'OK',
  CONFIG = 'CONFIG',
  IO = 'IO',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  PROXY = 'PROXY',
}

export const ErrorCode: { [key in EError]: number } = {
  OK: 0,
  CONFIG: 1,
  IO: 2,
  NOT_FOUND: 3,
  CONFLICT: 4,
  PROXY: 5,
};

export type ErrorName = keyof typeof EError;

export const exitWithCode = (errorCode: number) => (error: Error) => {
  console.log(chalk.red(error));
  process.exit(errorCode);
};
