import Ember from 'ember';
// import Song from '../../models/song';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('band').get('songs');
  },

  actions: {
    didTransition: function() {
      var band = this.modelFor('band');
      Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(band.get('name')));
    },
    createSong: function() {
      var controller = this.controller;
      var band = this.modelFor('band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function() {
        controller.set('title', '');
      });
    },
    updateRating: function(params) {
      var song = params.item,
        rating = params.rating;

      // TODO is this needed? GH issue #21
      // if (song.get('rating') === rating) {
        // rating = 0;
      // }
      song.set('rating', rating);
      song.save();
    }
  }
});
