import { LevelCheckedPipe } from './level-checked.pipe';

describe('LevelCheckedPipe', () => {
  it('create an instance', () => {
    const pipe = new LevelCheckedPipe();
    expect(pipe).toBeTruthy();
  });
});
