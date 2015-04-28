import Ember from 'ember';

export default Ember.Object.extend({
  name: '',

  setupSongs: function() {
    if (!this.get('songs')) {
      this.set('songs', []);
    }
  }.on('init'),

  slug: function() {
    return this.get('name').dasherize();
  }.property('name'),

  songs: function() {
    return songs.filterBy('band', this.get('name'));
  }.property('name', 'songs.@each.band')

});

