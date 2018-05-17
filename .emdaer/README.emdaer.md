# <!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: name
-->

<!--emdaer-p
  - '@emdaer/plugin-shields'
  - shields:
      - alt: 'CircleCI'
        image: 'circleci/project/github/EditVR/editvr-frontend.svg'
        link: 'https://circleci.com/gh/EditVR/editvr-frontend'
        style: 'flat-square'
      - alt: 'Documented with emdaer'
        image: 'badge/📓-documented%20with%20emdaer-F06632.svg'
        link: 'https://github.com/emdaer/emdaer'
        style: 'flat-square'
      - alt: 'Commitizen friendly'
        image: 'badge/commitizen-friendly-brightgreen.svg'
        link: 'http://commitizen.github.io/cz-cli/'
        style: 'flat-square'
-->

<!--emdaer-p
  - '@emdaer/plugin-value-from-package'
  - value: description
-->

## Requirements

 - Node.js (See `package.json:engines` for correct version).
 - Yarn

## Setup

 - Clone this repository.
 - In this repository's root folder, run: `yarn`.
 - To start the dev server, run: `yarn start`.

## Testing
This project makes use of Jest and Enzyme. Test files should be located in the same directory as the component the test file is testing, or in the `__test__` directory.

 - To watch files and run tests: `yarn test`.
 - To see test coverage reports: `yarn coverage`.

For more information about tests on this project, please read this documentation:
 - [Jest Documentation](https://facebook.github.io/jest/).
 - [Enzyme Documentation](https://github.com/airbnb/enzyme).

## Deployment
This project is automatically deployed when changes are merged from the `develop` branch into the `master` branch.

 - To generate a production build: `yarn build`.
 - To deploy EditVR: `yarn deploy`.

## Contributing
The process around contributing to this codebase and the workflow by which code changes are proposed and accepted into this project are documented [here](./.github/CONTRIBUTING.md).

## Contributors
EditVR is brought to you with love by Four Kitchens.
<!--emdaer-p
  - '@emdaer/plugin-contributors-details-github'
-->

## License

<!--emdaer-p
  - '@emdaer/plugin-license-reference'
-->

<!--emdaer-t
  - '@emdaer/transform-prettier'
  - options:
      config: ./prettier.config.js
-->
