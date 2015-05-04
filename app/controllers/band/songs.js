import Ember from 'ember';

export default Ember.Controller.extend({
  title: '',
  songCreationStarted: false,

  isAddButtonDisabled: function() {
    return Ember.isEmpty(this.get('title'));
  }.property('title'),

  noSongs: function() {
    return this.get('model.length') === 0;
  }.property('model.length'),

  canCreateSong: function() {
    return this.get('songCreationStarted') || this.get('model.length');
  }.property('songCreationStarted', 'mode.length'),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }
});
