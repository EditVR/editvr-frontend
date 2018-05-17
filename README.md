<!--
  This file was generated by emdaer

  Its template can be found at /home/pcoffey/Projects/fourkitchens/vr/editvr-frontend/.emdaer/README.emdaer.md
-->

<!--
  emdaerHash:148e97864052177bbd728ae8afb46bbe
-->

<h1 id="editvr-frontend">editvr-frontend</h1>
<p><a href="https://circleci.com/gh/EditVR/editvr-frontend"><img src="https://img.shields.io/circleci/project/github/EditVR/editvr-frontend.svg?style=flat-square" alt="CircleCI"></a> <a href="https://github.com/emdaer/emdaer"><img src="https://img.shields.io/badge/📓-documented%20with%20emdaer-F06632.svg?style=flat-square" alt="Documented with emdaer"></a> <a href="http://commitizen.github.io/cz-cli/"><img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" alt="Commitizen friendly"></a></p>
<p>Editorial frontend, driven by EditVR’s API.</p>
<h2 id="requirements">Requirements</h2>
<ul>
<li>Node.js (See <code>package.json:engines</code> for correct version).</li>
<li>Yarn</li>
</ul>
<h2 id="setup">Setup</h2>
<ul>
<li>Clone this repository.</li>
<li>In this repository’s root folder, run: <code>yarn</code>.</li>
<li>To start the dev server, run: <code>yarn start</code>.</li>
</ul>
<h2 id="testing">Testing</h2>
<p>This project makes use of Jest and Enzyme. Test files should be located in the same directory as the component the test file is testing, or in the <code>__test__</code> directory.</p>
<ul>
<li>To watch files and run tests: <code>yarn test</code>.</li>
<li>To run tests and then exit: <code>yarn test:ci</code>.</li>
<li>To update snapshot files: <code>yarn test -u</code>.</li>
</ul>
<p>For more information about tests on this project, please read this documentation:</p>
<ul>
<li><a href="https://facebook.github.io/jest/">Jest Documentation</a>.</li>
<li><a href="https://github.com/airbnb/enzyme">Enzyme Documentation</a>.</li>
</ul>
<h2 id="deployment">Deployment</h2>
<p>This project is automatically deployed when changes are merged from the <code>develop</code> branch into the <code>master</code> branch.</p>
<ul>
<li>To generate a production build: <code>yarn build</code>.</li>
<li>To deploy EditVR: <code>yarn deploy</code>.</li>
</ul>
<h2 id="contributing">Contributing</h2>
<p>The process around contributing to this codebase and the workflow by which code changes are proposed and accepted into this project are documented <a href="./.github/CONTRIBUTING.md">here</a>.</p>
<h2 id="contributors">Contributors</h2>
<p>EditVR is brought to you with love by Four Kitchens.</p>
<details>
<summary><strong>Contributors</strong></summary><br>
<a title="I write software, mainly JS (Node), Go, and PHP." href="https://github.com/patrickocoffeyo">
  <img align="left" src="https://avatars0.githubusercontent.com/u/1107871?s=24">
</a>
<strong>Patrick Coffey</strong>
<br><br>
</details>

<h2 id="license">License</h2>
<p>editvr-frontend is <a href="./LICENSE">GPL-3.0 licensed</a>.</p>
