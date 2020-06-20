const SES = require('./ses');
const { ErrorCode, exitWithCode } = require('./error');

module.exports = () =>
  SES.listTemplates()
    .promise()
    .then((res) => {
      if (res.TemplatesMetadata.length) {
        return res.TemplatesMetadata.map((t) => ({ name: t.Name }));
      }
      return [];
    })
    .catch(exitWithCode(ErrorCode.PROXY));
