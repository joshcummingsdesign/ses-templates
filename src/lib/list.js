const listAll = require('./utils/listAll');

module.exports = async () => {
  const templates = await listAll();
  templates.forEach((template) => console.log(template.name));
};
