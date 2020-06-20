import SES from '../ses';
import { exitWithCode, ErrorCode } from '../utils/error';

export const listAll = () =>
  SES.listTemplates()
    .promise()
    .then((res) => {
      if (res.TemplatesMetadata && res.TemplatesMetadata.length) {
        return res.TemplatesMetadata.map((t) => t.Name!);
      }
      return [];
    })
    .catch(exitWithCode(ErrorCode.PROXY));
