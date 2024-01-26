# haagshistorischmuseum

[![Built with Cookiecutter Plone Starter](https://img.shields.io/badge/built%20with-Cookiecutter%20Plone%20Starter-0083be.svg?logo=cookiecutter)](https://github.com/collective/cookiecutter-plone-starter/)
[![Black code style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/ambv/black)
[![Backend Tests](https://github.com/intk/haagshistorischmuseum/actions/workflows/backend.yml/badge.svg)](https://github.com/intk/haagshistorischmuseum/actions/workflows/backend.yml)
[![Frontend Tests](https://github.com/intk/haagshistorischmuseum/actions/workflows/frontend.yml/badge.svg)](https://github.com/intk/haagshistorischmuseum/actions/workflows/frontend.yml)

A new project using Plone 6.

## Documentation

Original doc from https://docs.google.com/document/d/13f_Yb57wUrWnzj9ChBhmaTRKr4M4YCgpwM07N2P7Ocw/edit

### The briefing

The idea is that you will re-create the haagshistorischmuseum.nl website using Plone/Volto.
The parts that need to be implemented are:

- Setup work environment (we use AWS)
- Single content page (implement acid test) (updated to a Volto website I think it is more useful) code here
  Plone admin (Login: admin Password 20intk22)
- Menu
- Footer (editable)
- Multiple content page
- Homepage
- Search page
- 404 page
- Forms

### Performance

One of the features we try to have to differentiate ourselves from other agencies is having a perfect score on https://web.dev.

Our goal is the result of 90% of the following areas:

- Performance
- Accessibility
- Best Practices
- SEO

### Backend

NICOLA: The other missing part is about the Plone backend: will the current Plone installment continue to work as it is now? Is restapi already in place or installable?
If there are content types or other integrations in the backend, please let me know and I'll expect sharing the code so I can start from that.

RUI: Let me start with the backend question. The projects is intended that you create a Plone 6 / Volto website. We will give you access to a AWS instance and expect you to create the entire website yourself. Can you do that? The idea is that the content will be migrated from the old website (Plone 5) to the website you created. Ideally using Plone migration.

### Old code

RUI: The old code is available here:
https://github.com/intk/plonetheme.haagshistorischmuseum

you can also login to the old website as an admin here:
https://www.haagshistorischmuseum.nl/en/login
Login: admin
Password: 20intk20

### Content Types

I;m not sure we are using custom content types. As far as I know we are not.

### Multiple contents page / listings

NICOLA: Multiple contents page: are you referring to listing blocks? could you provide a list of links where all those kind of blocks (or future blocks) are shown?

RUI: They are used across the entire website:
https://www.haagshistorischmuseum.nl/en/visit/see-and-do
https://www.haagshistorischmuseum.nl/en/museum
etc

### Forms

NICOLA: forms: i didn't find forms on the live website: could you link those pages too? or, at least, define what those forms should do and how? Otherwise, I'll take it as style personalizations for the form block (https://github.com/collective/volto-form-block/)

RUI: I could not find a form indeed. Maybe you could use the backend and see if there is any form created. I have the feeling that we have not.

## Roadmap

### Phase I

- [x] 10-03-23 Setup work environment (we use AWS)
- [x] 17-03-23 Single content page (implement acid test) Login: admin Password 20intk22

After phase I is completed we pay you and decide whether we continue with phase 2.

### Phase II

- [x] 31-03-23 Menu
- [x] 31-03-23 Footer (editable)
- [ ] 07-04-23 PageSpeed improvements
- [x] 14-04-23 Multiple content page

### Phase III

- [ ] 21-04-23 Events and News Items views
- [ ] 21-04-23 Homepage
- [ ] 28-04-23 Search page
- [ ] 28-04-23 404 page
- [ ] 05-05-23 Forms

### Phase IV

- [ ] 19-05-23 Plone migration

## Quick start

### Development Setup

- Python 3.9, 3.10, 3.11
- Node 16
- yarn
- Docker

### Install

```shell
git clone git@github.com:intk/haagshistorischmuseum.git
cd haagshistorischmuseum
make install
```

### Start

Start the Backend (http://localhost:8080/)

```shell
make start-backend
```

Start the Frontend (http://localhost:3000/)

```shell
make start-frontend
```

## Structure

This monorepo is composed by two distinct codebases: api and frontend.

- **backend**: API (Backend) Plone installation using pip (not buildout). Includes a policy package named haagshistorischmuseum
- **frontend**: React (Volto) package named frontend

### Reasoning

- Repo contains all codebase needed to run the site (excluding existing addons for Plone and React).
- Github Workflows are triggered based on changes on each codebase (see .github/workflows)
- Easier to create Docker images for each codebase
- Showcase Plone installation/setup without buildout

## Linters and Formatting

There are some hooks to run lint checks on the code. If you want to automatically format them, you can run

`make format`

in the root folder or especifically in each backend or frontend folders.

Linters commands are available in each backend and frontend folder.

## Acceptance tests

There are `Makefile` commands in place:

`build-test-acceptance-server`: Build Acceptance Backend Server Docker image that it's being used afterwards. Must be run before running the tests, if the backend code has changed.

`start-test-acceptance-server`: Start server fixture in docker (previous build required)

`start-test-acceptance-frontend`: Start the Core Acceptance Frontend Fixture in dev mode

`test-acceptance`: Start Core Cypress Acceptance Tests in dev mode

## Credits

**This was generated by [cookiecutter-plone-starter](https://github.com/collective/cookiecutter-plone-starter) on 2023-03-10 14:12:21**
