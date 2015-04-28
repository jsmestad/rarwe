import Ember from 'ember';
import Band from '../models/band';
import Song from '../models/song';

var blackDog = Song.create({
  title: 'Black Dog',
  band: 'Led Zeppelin',
  rating: 3
});

var ledbetter = Song.create({
  title: 'Yellow Ledbetter',
  band: 'Pearl Jam',
  rating: 4
});

var daughter = Song.create({
  title: 'Daughter',
  band: 'Pearl Jam',
  rating: 5
});

var pretender = Song.create({
  title: 'The Pretender',
  band: 'Foo Fighters',
  rating: 2
});

var BandsCollection = Ember.ArrayProxy.extend(Ember.SortableMixin, {
  sortProperties: ['name'],
  sortAscending: false,
  content: []
});

var bands = BandsCollection.create();

var ledZeppelin = Band.create({name: 'Led Zepplin', songs: [blackDog]});
var pearlJam = Band.create({name: 'Pearl Jam', songs: [daughter, ledbetter]});
var fooFighters = Band.create({name: 'Foo Fighters', songs: [pretender]});

bands.pushObjects([ledZeppelin, pearlJam, fooFighters]);

export default Ember.Route.extend({
  model: function() {
    return bands;
  },

  actions: {
    createBand: function() {
      var name = this.get('controller').get('name');
      var band = Band.create({name: name});
      bands.pushObject(band);
      this.get('controller').set('name', '');
    }
  }
});
