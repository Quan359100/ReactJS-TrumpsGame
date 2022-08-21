export default class Card {
  constructor({ name, categories }) {
    this.name = name;
    this.categories = categories;
  }

  compareWith(card, category) {
    const c1 = this.categories.find((c) => c.label === category);
    const c2 = card.categories.find((c) => c.label === category);
    if (
      Card.invalidValue(c1.value) ||
      Card.invalidValue(c2.value) ||
      c1.value === c2.value
    )
      return 0;
    if (typeof c1.value == 'number') {
      return c1.value === c2.value ? 0 : c1.value > c2.value ? 1 : -1;
    }
    return Card.compareTwoBigIntStr(c1.value, c2.value);
  }

  static invalidValue(value) {
    return ['n/a', 'unknown'].includes(value);
  }

  static compareTwoBigIntStr(v1, v2) {
    const s1 = Card.normaliseValue(v1);
    const s2 = Card.normaliseValue(v2);
    if (s1.length === s2.length) {
      return s1.localeCompare(s2);
    } else {
      return s1.length > s2.length ? 1 : -1;
    }
  }

  static normaliseValue(v) {
    return v.replace(',', '').replace('km', '000');
  }

  static buildFromStarshipData(data) {
    return new Card({
      name: data.name,
      categories: [
        {
          label: 'Max Speed',
          value: data.max_atmosphering_speed,
        },
        {
          label: 'Credit Cost',
          value: data.cost_in_credits,
        },
        {
          label: 'Passengers',
          value: data.passengers,
        },
        {
          label: 'Film Appearances',
          value: data.films?.length || 0,
        },
      ],
    });
  }
}
