import { Money } from './money';

describe('Money', () => {
  it('should create an instance', () => {
    expect(new Money(1.0, "EUR")).toBeTruthy();
  });
});
