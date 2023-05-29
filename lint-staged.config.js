module.exports = {
  '{packages,tools}/**/*.{js,jsx,ts,tsx}': [
    'nx affected --target lint --uncommitted --fix true',
    'nx affected --target test --uncommitted',
    'nx format:write --uncommitted',
  ],
};
