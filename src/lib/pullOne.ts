import { get } from './get';
import { write } from './write';
import { addToIndex } from './addToIndex';
import { EError } from '../utils/error';

export const pullOne = async (name: string) => {
  const template = await get(name);

  let error: Error | undefined;
  if (template) {
    await write({ name, template });
    await addToIndex(name);
  } else {
    error = new Error(EError.NOT_FOUND);
  }

  return { name, error };
};
