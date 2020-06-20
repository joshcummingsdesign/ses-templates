const get = require('./get');
const write = require('./write');
const addToIndex = require('./addToIndex');
const { ErrorType } = require('./error');

module.exports = async ({ name }) => {
  const template = await get(name);

  let error;
  if (template) {
    await write({ name, template });
    await addToIndex(name);
  } else {
    error = new Error(ErrorType.NOT_FOUND);
  }

  return { name, error };
};
