var utils = require('utilities')
  , common = require('./postgres_common')
  , adapter
  , currentId
  , tests
  , model = require('../../../../lib');

tests = {
  'before': function (next) {
    model.setAutoIncrementId(true);
    adapter = common.connect(next);
  }

, 'after': function (next) {
    common.disconnect(adapter, function () {
      model.setAutoIncrementId(true);
      next(); 
    });
  }

};

for (var p in common.tests) {
  if (p == 'beforeEach' || p == 'afterEach') {
    tests[p] = common.tests[p];
  }
  else {
    tests[p + ' (auto-increment ID)'] = common.tests[p];
  }
}


module.exports = tests;
