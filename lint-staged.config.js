module.exports = {
  '**/*.{js,jsx,json,css}': ['prettier --write', 'git add'],
  '*.emdaer.md': ['emdaer --yes', 'git add README.md', 'git add .emdaer']
};
