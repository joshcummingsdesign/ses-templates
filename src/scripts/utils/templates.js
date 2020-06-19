const subjectTemplate = 'Hello {{name}}';

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Template</title>
  </head>
  <body>
    <main>
      <p>Hello {{name}},</p>
      <p>This is a test message.</p>
      <p>Regards, Josh</p>
    </main>
  </body>
</html>`;

const textTemplate = 'Hello {{name}},\nThis is a test message.\nRegards, Josh\n';

const templatePart = '<!-- {{ templatePart }} // Do not remove this comment -->';

const listItem = (name) => `<li><a href="/${name}">${name}</a></li>`;

module.exports = { subjectTemplate, htmlTemplate, textTemplate, templatePart, listItem };
