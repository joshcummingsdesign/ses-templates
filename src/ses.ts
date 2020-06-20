import AWS from 'aws-sdk';
import config from './config';

AWS.config.update({
  credentials: new AWS.Credentials({
    accessKeyId: config.awsAccessKeyId,
    secretAccessKey: config.awsSecretAccessKey,
  }),
  region: config.awsSesRegion,
});

export default new AWS.SES();
