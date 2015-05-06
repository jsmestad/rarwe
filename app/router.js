import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.resource('bands', function() {
    this.resource('band', {path: ':slug'}, function() {
      this.route('songs');
      this.route('details');
    });
  });
});
