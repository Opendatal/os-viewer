'use strict';

var paramParser = require('../front/scripts/components/url-param-parser');

module.exports.main = function(req, res) {
  var config = req.app.get('config');

  res.render('pages/main.html', {
    title: 'Open Spending Viewer',
    basePath: config.get('basePath')
  });
};

module.exports.embedded = function(req, res) {
  var config = req.app.get('config');
  req.isEmbedded = req.isEmbedded || false;
  req.cube = req.cube || '';
  req.view = req.view || 'treemap';

  var params = paramParser.parse(req.query);

  res.render('pages/embedded.html', {
    basePath: config.get('basePath'),
    cube: req.cube,
    view: req.view,
    apiUrl: config.get('api').url,
    cosmoUrl: config.get('api').cosmoUrl,
    params: JSON.stringify({
      aggregates: params.measure,
      group: params.groups,
      filters: params.filters
    })
  });
};
