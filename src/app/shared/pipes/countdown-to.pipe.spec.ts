import { CountdownToPipe } from './countdown-to.pipe';

describe('CountdownToPipe', () => {
  it('create an instance', () => {
    const pipe = new CountdownToPipe();
    expect(pipe).toBeTruthy();
  });
});
