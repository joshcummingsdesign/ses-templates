# SES Templates

[![joshcummingsdesign](https://circleci.com/gh/joshcummingsdesign/ses-templates.svg?style=svg)](https://circleci.com/gh/joshcummingsdesign/ses-templates)

Amazon SES template management made easy.

## Requirements

- Node ^13.12.0
- npm ^6.14.4

## Getting Started

SES Templates allows you to easily manage your AWS SES templates by giving you a local development server with live reloading to test out your changes, as well as some helpful commands to push and pull your changes to and from SES.

To get started, simply make a new project to manage your templates.

1. Create a new directory and run

        npm init

2. Install ses-templates

        npm install ses-templates

2.  Set the following environment variables

        PORT=<number> # the local dev server port
        AWS_ACCESS_KEY_ID=<string>
        AWS_SECRET_ACCESS_KEY=<string>
        AWS_SES_REGION=<string>

3.  Start the local dev server

        npx ses-templates start

You can add this to your `package.json` scripts if you prefer:

```json
"scripts": {
  "start": "ses-templates start"
}
```

## Commands

```
Options:
  -V, --version   output the version number
  -h, --help      display help for command

Commands:
  start           start the local development server
  list            list all templates in SES
  create <name>   create a new template
  push [name]     push templates to SES
  pull [name]     pull templates from SES
  delete <name>   delete a template from SES
  help [command]  display help for command
```

## Examples

Take a look at our [example project](https://github.com/joshcummingsdesign/jcd-ses-templates) for more details.

## Contributing

### Starting the local development environment

1.  Install the project dependencies

        npm install

2.  Copy `.env.example` to `.env` and make sure to export the variables to your environment

        cp .env.example .env

3.  Start the project watcher

        npm start
