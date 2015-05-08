import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.find('band', params.id);
    // var bands = this.modelFor('bands');
    // return bands.findBy('slug', params.slug);
  }

  // NOTE moved to routes/band/index.js
  // afterModel: function(band) {
    // var description = band.get('description');
    // if (Ember.isEmpty(description)) {
      // this.transitionTo('band.songs');
    // } else {
      // this.transitionTo('band.details');
    // }
  // }
});
