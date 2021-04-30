const fs = require('fs').promises;

// async/await read json
exports.readJSON = async (file) => {
  const json = await fs.readFile(file, 'utf8');
  return json;
};
