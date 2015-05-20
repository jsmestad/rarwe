import Ember from 'ember';

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
    var bands = this.store.find('band');
    return wait(bands, 3 * 1000);
  },

  actions: {
    didTransition: function() {
      Ember.$(document).attr('title', 'Bands - Rock & Roll');
    },
    createBand: function() {
      var route = this,
        controller = this.get('controller');

      var band = this.store.createRecord('band',
                                         controller.getProperties('name'));

      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('band.songs', band);
      });
    }
  }
});
