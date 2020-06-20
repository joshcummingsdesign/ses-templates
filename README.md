# SES Templates

Amazon SES template management made easy.

## Requirements

- Node ^13.12.0

## Getting Started

1.  Install

        npm install -g ses-templates

2.  Make sure you have the following variables in your environment

        PORT=<number> # the local dev server port
        AWS_ACCESS_KEY_ID=<string>
        AWS_SECRET_ACCESS_KEY=<string>
        AWS_SES_REGION=<string>

3.  Start the local dev server

        ses-templates start

## Commands

To see a list of commands run

    ses-templates --help

## Contributing

1.  Install the project dependencies

        npm install

2.  Copy `.env.example` to `.env` and make sure to export the variables to your environment

        cp .env.example .env

3.  Start the project watcher

        npm start
