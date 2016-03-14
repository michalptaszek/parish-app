import Mirage, {faker} from 'ember-cli-mirage';

export default Mirage.Factory.extend({
  value: faker.finance.amount(),
  date: faker.date.past()
});
