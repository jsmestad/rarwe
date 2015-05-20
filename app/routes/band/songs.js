import Ember from 'ember';
import { capitalizeWords as capitalize } from '../../helpers/capitalize-words';

function wait(promise, delay) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}

export default Ember.Route.extend({
  model: function() {
    var songs = Ember.RSVP.resolve(this.modelFor('band').get('songs'));
    return wait(songs, 3000);
  },

  actions: {
    didTransition: function() {
      var band = this.modelFor('band');
      var name = capitalize(band.get('name'));
      Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(name));
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
