import { findOne } from './findOne';
import { writeTemplateFiles } from './writeTemplateFiles';
import { addToIndex } from './addToIndex';
import { EError } from '../utils/error';
import { SesService } from '../services/ses.service';

/**
 * Pull a template from SES.
 */
export const pullOne = async (name: string, ses: SesService) => {
  const template = await findOne(name, ses);

  let error: Error | undefined;
  if (template) {
    await writeTemplateFiles({ name, template });
    await addToIndex(name);
  } else {
    error = new Error(EError.NOT_FOUND);
  }

  return { name, error };
};
