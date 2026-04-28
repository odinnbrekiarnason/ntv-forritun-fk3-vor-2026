import { add } from "./math";

describe('add', () => {
  it('Should return sum of the two numbers', () => {
    const result = add(1,3)

    expect(result).toBe(4)
  })
});
