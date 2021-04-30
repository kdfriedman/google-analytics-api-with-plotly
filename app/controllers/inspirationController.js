const { readJSON } = require('../utility/utility');

/* ROUTE HANDLER */
exports.getInspirationTemplate = (req, res) => {
  (async () => {
    const json = await readJSON(`app/models/data/inspiration.json`);
    const minifiedJSON = JSON.stringify(JSON.parse(json));
    res.render('inspiration', {
      props: minifiedJSON,
    });
  })();
};
