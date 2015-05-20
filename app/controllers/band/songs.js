import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: {
    sortBy: 'sort',
    searchTerm: 's'
  },

  title: '',
  songCreationStarted: false,

  sortBy: 'ratingDesc',
  sortProperties: function() {
    var options = {
      "ratingDesc": "rating:desc,title:asc",
      "ratingAsc": "rating:asc,title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc"
    };
    return options[this.get('sortBy')].split(',');
  }.property('sortBy'),
  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  searchTerm: '',
  matchingSongs: function() {
    var searchTerm = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(searchTerm) !== -1;
    });
  }.property('model.@each.title', 'searchTerm'),

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
    },
    setSorting: function(option) {
      this.set('sortBy', option);
    }
  }
});
