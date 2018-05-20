import 'web-audio-test-api';
import ComputerKeyboard from './ComputerKeyboard';

describe('ComputerKeyboard', () => {
  it('should set default octave on boot', () => {
    const kb = new ComputerKeyboard();

    expect(kb.octave).toEqual(3);
  });

  it('should set octave on boot', () => {
    const kb = new ComputerKeyboard(1);

    expect(kb.octave).toEqual(1);
  });

  it('should set octave', () => {
    const kb = new ComputerKeyboard();

    kb.setOctave(2);

    expect(kb.octave).toEqual(2);
  });

  it('should set on press callbacks', () => {
    const kb = new ComputerKeyboard();

    const callback1 = jest.fn();
    const callback2 = jest.fn();

    kb.triggerOnPress([
      callback1,
      callback2,
    ]);

    expect(kb.onPressCallbacks).toEqual([
      callback1,
      callback2,
    ]);
  });

  // TODO - Figure out how to trigger mousetrap bound events
  it('should set up key bindings', () => {
    const kb = new ComputerKeyboard();

    kb.setupKeyBindings();

    const spy = jest.spyOn(kb, 'triggerOnPressCallbacks');

    const key = new KeyboardEvent('keydown', { keyCode: 68 });
    document.dispatchEvent(key);
  });

  it('should trigger on press callbacks', () => {
    const kb = new ComputerKeyboard();

    const callback1 = jest.fn();
    const callback2 = jest.fn();

    kb.triggerOnPress([
      callback1,
      callback2,
    ]);

    kb.triggerOnPressCallbacks('d', 'E');
    kb.triggerOnPressCallbacks('d', 'E');

    expect(kb.keysBeingHeld).toEqual(['d']);

    kb.triggerOnPressCallbacks('a', 'C');

    expect(kb.keysBeingHeld).toEqual(['d', 'a']);
    expect(kb.holding).toEqual(false);
    expect(kb.keyIsBeingHeld).toEqual(false);

    kb.triggerOnPressCallbacks('a', 'C');
    expect(kb.holding).toEqual(true);
    expect(kb.keyIsBeingHeld).toEqual(true);

    expect(kb.lastKeyHeld).toEqual('a');

    expect(callback1.mock.calls.length).toEqual(2);
    expect(callback1).toHaveBeenCalledWith(130.81);
    expect(callback1).toHaveBeenCalledWith(164.81);

    expect(kb.justReleased).toEqual(false);
  });

  it('should trigger on release callbacks', () => {
    const kb = new ComputerKeyboard();

    const callback1 = jest.fn();
    const callback2 = jest.fn();

    kb.triggerOnRelease([
      callback1,
      callback2,
    ]);

    kb.triggerOnPressCallbacks('d', 'E');
    kb.triggerOnReleaseCallbacks('d', 'E');

    expect(kb.holding).toEqual(false);
    expect(kb.justReleased).toEqual(true);
    expect(kb.glidingBetweenKeys).toEqual(false);

    expect(callback1).toHaveBeenCalled();
    expect(callback2).toHaveBeenCalled();

    const spy = jest.spyOn(kb, 'triggerOnPressCallbacks');

    kb.triggerOnPressCallbacks('d', 'E');
    kb.triggerOnPressCallbacks('a', 'C');
    kb.triggerOnReleaseCallbacks('d', 'E');

    expect(kb.glidingBetweenKeys).toEqual(true);
    expect(kb.keysBeingHeld).toEqual(['a']);
    expect(spy.mock.calls.length).toEqual(3);
    expect(callback1.mock.calls.length).toEqual(1);
    expect(callback2.mock.calls.length).toEqual(1);
  });

  it('should trigger octave change', () => {
    const kb = new ComputerKeyboard();

    kb.triggerOctaveChange('octaveUp');

    expect(kb.octave).toEqual(4);

    kb.triggerOctaveChange('octaveDown');
    kb.triggerOctaveChange('octaveDown');

    expect(kb.octave).toEqual(2);

    kb.triggerOctaveChange('octaveDown');
    kb.triggerOctaveChange('octaveDown');
    kb.triggerOctaveChange('octaveDown');
    kb.triggerOctaveChange('octaveDown');

    expect(kb.octave).toEqual(1);

    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');
    kb.triggerOctaveChange('octaveUp');

    expect(kb.octave).toEqual(8);
 });

  it('should require octave direction to trigger octave change', () => {
    const kb = new ComputerKeyboard();

    kb.triggerOctaveChange();

    expect(kb.octave).toEqual(3);
 });
});
