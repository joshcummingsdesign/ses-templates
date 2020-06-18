const AWS = require('aws-sdk');

AWS.config.update({ region: process.env.AWS_SES_REGION });

module.exports = new AWS.SES();
