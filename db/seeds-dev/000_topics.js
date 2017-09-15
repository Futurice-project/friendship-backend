const simpleFixtures = require('simple-fixtures');
const faker = require('faker/locale/en');

exports.seed = knex =>{
  var names = [];
  for(var i=0; i<10; i++){
    names.push(
      {
        name: "Topic" + i
      }
    )
  }
  knex.batchInsert(
    'topics',
    names
  );
}
