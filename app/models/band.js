// import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr(),
  songs: DS.hasMany('song'),

  // setupSongs: function() {
    // if (!this.get('songs')) {
      // this.set('songs', []);
    // }
  // }.on('init'),

  // slug: function() {
    // return this.get('name').dasherize();
  // }.property('name')

});

