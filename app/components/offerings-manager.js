import Ember from 'ember';

export default Ember.Component.extend({
  sortParams: ['date:desc'],
  sortedModel: Ember.computed.sort('model', 'sortParams'),
  searchableOfferings: Ember.computed('sortedModel', 'quickSearch', function() {
    let offerings = this.get('sortedModel');
    let filter = this.get('quickSearch');
    if (filter) {
      offerings = offerings.filter(function(offering) {
        return offering.get('parishioner.name').toLowerCase().includes(filter.toLowerCase()) ||
          offering.get('parishioner.address').toLowerCase().includes(filter.toLowerCase()) ||
          offering.get('date').toLowerCase().includes(filter.toLowerCase());
      });
    }
    return offerings;
  }),
  sumOfOfferings: Ember.computed('searchableOfferings.@each', function() {
    let sum = 0;
    this.get('searchableOfferings').forEach(function(offering) {
      sum += Number(offering.get('value'));
    });
    return sum;
  }),
  offeringMapData: Ember.computed('searchableOfferings.@each', function() {
    let data = Ember.A();
    this.get('searchableOfferings').forEach(function(offering){
      data.pushObject({
        address: offering.get('parishioner.address'),
        name: offering.get('parishioner.name'),
        total: offering.get('parishioner.offeringsTotal')
      });
    });
    return data;
  }),
  showOnMap: false,
  actions: {
    toggleShowOnMap() {
      this.toggleProperty('showOnMap');
    }
  }
});
