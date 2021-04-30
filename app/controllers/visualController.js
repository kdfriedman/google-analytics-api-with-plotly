const { readJSON } = require('../utility/utility');

/* ROUTE HANDLER */
exports.getVisualTemplate = (req, res) => {
  (async () => {
    const json = await readJSON(`app/models/data/content.json`);
    const minifiedJSON = JSON.stringify(JSON.parse(json));
    res.render('visual', { props: minifiedJSON });
  })();
};
