import { get } from './get';
import { write } from './write';
import { addToIndex } from './addToIndex';
import { EError } from '../utils/error';
import { SesService } from '../services/ses.service';

export const pullOne = async (name: string, ses: SesService) => {
  const template = await get(name, ses);

  let error: Error | undefined;
  if (template) {
    await write({ name, template });
    await addToIndex(name);
  } else {
    error = new Error(EError.NOT_FOUND);
  }

  return { name, error };
};
