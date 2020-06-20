import chalk from 'chalk';
import { ErrorCode } from './utils/error';

/**
 * The app's configuration registry.
 * This gets passed to the config function, which returns a config object.
 */
const registry = {
  port: 'PORT',
  awsAccessKeyId: 'AWS_ACCESS_KEY_ID',
  awsSecretAccessKey: 'AWS_SECRET_ACCESS_KEY',
  awsSesRegion: 'AWS_SES_REGION',
};

/**
 * Generate the app's configuration.
 *
 * Pass it a registry object and it will check to make sure the environment
 * variables exist, then return a config object to use in the application.
 */
export const initializeConfig = <T>(registryObject: T) => {
  const missing: string[] = [];

  const config = Object.entries(registryObject).reduce((acc, [key, value]) => {
    if (process.env[value] === undefined) {
      missing.push(value);
    }
    return Object.assign(acc, { [key]: process.env[value] });
  }, {} as T);

  if (missing.length) {
    console.log(chalk.red('Missing environment variables:'));
    console.log(missing.join('\n'));
    process.exit(ErrorCode.CONFIG);
  }

  return config;
};

export default initializeConfig(registry);
