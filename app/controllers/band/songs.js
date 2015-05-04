import Ember from 'ember';

export default Ember.Controller.extend({
  title: '',

  isAddButtonDisabled: function() {
    return Ember.isEmpty(this.get('title'));
  }.property('title')
});
