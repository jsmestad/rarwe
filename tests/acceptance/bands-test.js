import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

var application, server;

module('Acceptance: Bands', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('List bands', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function(request) {
      var bands = JSON.stringify({
        bands: [
          {id: 1, name: 'Radiohead'},
          {id: 2, name: 'Long Distance Calling'}
        ]
      });

      return [200, {"Content-Type": "application/json"}, bands];
    });
  });

  visit('/bands');

  andThen(function() {
    // assert.equal(currentURL(), '/bands');
    assert.equal(find('.band-link').length, 2, "All band links are rendered");
    assert.equal(find('.band-link:contains("Radiohead")').length, 1, "First band link contains the band name");
    assert.equal(find('.band-link:contains("Long Distance Calling")').length, 1, "The other band link contains the band name");
  });
});

test('Creating a new band', function(assert) {
  server = new Pretender(function() {
    this.get('/bands', function(request) {
      var bands = JSON.stringify({
        bands: [{id: 1, name: 'Radiohead'}]
      });
      return [200, {"Content-Type": "application/json"}, bands];
    });

    httpStubs.stubCreateBand(this, {id: 1, name: 'Long Distance Calling'});
  });

  visit('/bands');
  fillIn('.new-band', 'Long Distance Calling');
  click('.new-band-button');

  andThen(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', "Created band appears at the end of the list");
    assertElement(assert, '.nav a.active:contains("Songs")', "The Songs tab is active");
  });
});

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [{id: 1, name: 'Radiohead'}]
    });

    httpStubs.stubCreateSong(this, {id: 1, title: 'Killer Cars'});
  });

  selectBand('Radiohead');
  click('a:contains("create one")');
  fillIn('.new-song', 'Killer Cars');
  triggerEvent('.new-song-form', 'submit');

  andThen(function() {
    assert.equal(find('.songs .song:contains("Killer Cars")').length, 1, "Creates the song and displays it in the list");
  });
});

test('Sort songs in various ways', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Them Crooked Vultures', songs: [1, 2, 3, 4] }
      ],
      songs: [
        { id: 1, title: 'Elephants', rating: 5 },
        { id: 2, title: 'New Fang', rating: 4 },
        { id: 3, title: 'Mind Eraser, No Chaser', rating: 4 },
        { id: 4, title: 'Spinning in Daffodils', rating: 5 }
      ]
    });
  });

  selectBand('Them Crooked Vultures');

  andThen(function() {
    assert.equal(currentURL(), '/bands/1/songs');
    assertTrimmedText(assert, '.song:first', 'Elephants', "The first song is the highest ranked, first in the alphabet");
    assertTrimmedText(assert, '.song:last', 'New Fang', "The last song is the lowest ranked, last in the alphabet");
  });

  click('button.sort-title-desc');

  andThen(function() {
    assert.equal(currentURL(), '/bands/1/songs?sort=titleDesc');
    assertTrimmedText(assert, '.song:first', 'Spinning in Daffodils', "The first song is the one that is the last in the alphabet");
    assertTrimmedText(assert, '.song:last', 'Elephants', "The last song is the one that is the first in the alphabet");
  });

  click('button.sort-rating-asc');

  andThen(function() {
    assertTrimmedText(assert, '.song:first', 'Mind Eraser, No Chaser', "The first song is the lowest ranked, first in the alphabet");
    assertTrimmedText(assert, '.song:last', 'Spinning in Daffodils', "The last song is the highest ranked, last in the alphabet");
  });
});

test('Search songs', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Them Crooked Vultures', songs: [1,2,3,4,5] }
      ],
      songs: [
        { id: 1, title: 'Elephants', rating: 5 },
        { id: 2, title: 'New Fang', rating: 4 },
        { id: 3, title: 'Mind Eraser, No Chaser', rating: 4 },
        { id: 4, title: 'Spinning in Daffodils', rating: 5 },
        { id: 5, title: 'No One Loves Me & Neither Do I', rating: 3}
      ]
    });
  });

  visit('/bands/1/songs');

  fillIn('.search-field', 'no');

  andThen(function() {
    assertLength(assert, '.song', 2, "The songs matching the search term are displayed");
  });

  click('button.sort-title-desc');

  andThen(function() {
    assertTrimmedText(assert, '.song:first', 'No One Loves Me & Neither Do I');
    assertTrimmedText(assert, '.song:last', 'Mind Eraser, No Chaser');
  });
});
