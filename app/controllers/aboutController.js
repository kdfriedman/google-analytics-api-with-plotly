const { readJSON } = require('../utility/utility');

/* ROUTE HANDLER */
exports.getAboutTemplate = (req, res) => {
  (async () => {
    const json = await readJSON(`app/models/data/about.json`);
    const minifiedJSON = JSON.stringify(JSON.parse(json));
    res.render('about', {
      props: minifiedJSON,
    });
  })();
};
