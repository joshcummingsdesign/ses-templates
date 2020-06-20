# SES Templates

Amazon SES template management made easy.

## Requirements

- Node ^13.12.0

## Getting Started

### Globally (not recommended)

Although you can install ses-templates globally by running

    npm install -g ses-templates

and run commands like so,

    ses-templates <command>

we recommend setting up a local project to manage your templates.

### Locally (recommended)

You can run ses-templates locally with npx by doing the following:

1. Create a new project and run

        npm init

2. Install ses-templates

        npm install ses-templates

2.  Make sure you have the following variables in your environment

        PORT=<number> # the local dev server port
        AWS_ACCESS_KEY_ID=<string>
        AWS_SECRET_ACCESS_KEY=<string>
        AWS_SES_REGION=<string>

3.  Start the local dev server

        npx ses-templates start

Alternatively, you can add this to your `package.json` scripts:

```json
"scripts": {
  "start": "ses-templates start",
  ...
},
```

## Commands

To see a list of commands run

    npx ses-templates --help

## Contributing

1.  Install the project dependencies

        npm install

2.  Copy `.env.example` to `.env` and make sure to export the variables to your environment

        cp .env.example .env

3.  Start the project watcher

        npm start
