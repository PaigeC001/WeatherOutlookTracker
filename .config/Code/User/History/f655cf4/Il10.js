const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter a description of your project:',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Enter installation instructions:',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Enter usage information:',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'Enter contribution guidelines:',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'Enter test instructions:',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license for your project:',
      choices: ['MIT', 'GNU GPLv3', 'Apache 2.0', 'ISC', 'None'],
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address:',
    },
  ]).then(answers => {
    const readmeContent = generateReadme(answers);
    fs.writeFile('README.md', readmeContent, (err) =>
      err ? console.log(err) : console.log('Successfully created README.md!')
    );
  });

  function generateReadme(answers) {
    const licenseBadge = getLicenseBadge(answers.license);
    return `# ${answers.title}

    ${licenseBadge}

## Description
${answers.description}

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${answers.installation}

## Usage
${answers.usage}

## License
This project is licensed under the ${answers.license} license.

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
If you have any questions, please contact me through my [GitHub profile](https://github.com/${answers.github}) or via email at ${answers.email}.
`;
}

function getLicenseBadge(license) {
    switch (license) {
      case 'MIT':
        return '![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg)';
      case 'GNU GPLv3':
        return '![GPLv3 License](https://img.shields.io/badge/License-GPLv3-blue.svg)';
      case 'Apache 2.0':
        return '![Apache License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)';
      case 'ISC':
        return '![ISC License](https://img.shields.io/badge/License-ISC-blue.svg)';
      case 'None':
        return '';
      default:
        return '';
    }
  }