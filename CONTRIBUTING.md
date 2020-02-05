# Contributing

Thank you for your interest in contributing to an Intercom project.

## Table of contents

- [Development](#development)
  - [Installation](#installation)
  - [Project structure](#project-structure)
- [Code of Conduct](#code-of-conduct)
  - [Our pledge](#our-pledge)
  - [Our standards](#our-standards)
  - [Our responsibilities](#our-responsibilities)
  - [Scope](#scope)
  - [Enforcement](#enforcement)
  - [Attribution](#attribution)

## Development

### Installation

This project is a Rollup-based TypeScript NodeJS library. To get the source and make changes:

```bash
git clone git@github.com:intercom/contentful-typescript-codegen.git
cd contentful-typescript-codegen
yarn install
```

To ensure everything is set up correctly:

```bash
yarn test
```

### Project structure

This project consists of three main parts, and the `src/` folder mostly reflects this:

1. The **CLI entry point**, which is responsible for parsing command line arguments, loading the
   Contentful environment from the parent module's setup, and printing the generated TypeScript to
   the specified output location.
1. The **TypeScript code generators**, which are helpers that print out things like interfaces,
   union types, and other TypeScript type structures.
1. The **Contentful code generators**, which receive Contentful objects (like Content Types and
   Fields) and use the **TypeScript code generators** to turn them into interfaces.

The TypeScript code generators utilize one another to eventually resolve a giant string. This big,
ugly string is ultimately passed through Prettier and sent back to the CLI layer to print to a file.

All generators have roughly the following shape:

```ts
interface Generator {
  (thing: SomeParticularObject, options?: OptionsForGenerator): string
}
```

Testing mostly consists of snapshot testing. Tests use `prettier`, where applicable, to make the
snapshots easier to read and to make sure they parse as valid TypeScript. Note that using `prettier`
on too "narrow" of a test (i.e., _just_ a field) will cause a parser error. In such cases, just let
the snapshot be ugly and let "broader" tests handle regressions involving potentially unparseable
code.

## Code of Conduct

### Our pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.

### Our standards

Examples of behavior that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behavior by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

### Our responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behavior and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviors that they deem inappropriate,
threatening, offensive, or harmful.

### Scope

This Code of Conduct applies within all project spaces, and it also applies when
an individual is representing the project or its community in public spaces.
Examples of representing a project or community include using an official
project e-mail address, posting via an official social media account, or acting
as an appointed representative at an online or offline event. Representation of
a project may be further defined and clarified by project maintainers.

### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behavior may be
reported by contacting the project team at team-acquisition@intercom.io. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq
