import MIDIController from './MIDIController';

describe('MIDIController', () => {
  it('should request midi access', () => {
    global.navigator.requestMIDIAccess = jest.fn();

    new MIDIController();
    const spy = jest.spyOn(global.navigator, 'requestMIDIAccess');

    expect(spy).toHaveBeenCalled();
  });

  it('should handle midi success', () => {
    jest.useFakeTimers();

    const midiController = new MIDIController();
    const spy = jest.spyOn(midiController, 'testOutputs');

    const inputs = [{
      input: 'input',
    }];

    const outputs = [{
      open: jest.fn(),
      send: jest.fn(),
    }];

    midiController.onMIDISuccess({
      inputs,
      outputs,
    });

    jest.advanceTimersByTime(500);
    expect(spy).toHaveBeenCalled();
  });

  it('should set on press callbacks', () => {
    const midiController = new MIDIController();

    const callbacks = [
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ];

    midiController.triggerOnPress(callbacks);

    expect(midiController.onPressCallbacks).toEqual(callbacks);
  });

  it('should set on release callbacks', () => {
    const midiController = new MIDIController();

    const callbacks = [
      jest.fn(),
      jest.fn(),
      jest.fn(),
    ];

    midiController.triggerOnRelease(callbacks);

    expect(midiController.onReleaseCallbacks).toEqual(callbacks);
  });

  it('should test inputs', () => {
    jest.useFakeTimers();

    const midiController = new MIDIController();
    const spy = jest.spyOn(midiController, 'stopInputs');

    midiController.inputs = [{
      input: 'input',
    }];

    midiController.outputs = [{
      open: jest.fn(),
      send: jest.fn(),
    }];

    midiController.testInputs();

    expect(midiController.inputs[0].onmidimessage).toBeTruthy();

    jest.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalled();
  });

  it('should test outputs', () => {
    jest.useFakeTimers();

    const midiController = new MIDIController();

    const inputs = [{
      input: 'input',
    }];

    const outputs = [{
      open: jest.fn(),
      send: jest.fn(),
    }];

    const openSpy = jest.spyOn(outputs[0], 'open');
    const sendSpy = jest.spyOn(outputs[0], 'send');
    const stopOutputsSpy = jest.spyOn(midiController, 'stopOutputs');

    midiController.onMIDISuccess({
      inputs,
      outputs,
    });

    jest.advanceTimersByTime(500);
    expect(openSpy).toHaveBeenCalled();
    expect(sendSpy).toHaveBeenCalledWith([0x90, 60, 0x7f]);

    jest.advanceTimersByTime(1000);
    expect(stopOutputsSpy).toHaveBeenCalled();
  });

  it('should handle on midi in note on', () => {
    const midiController = new MIDIController();

    const callbacks = [
      jest.fn(),
      jest.fn(),
    ];

    const midiData = {
      data: [144, 56, 127],
    };

    midiController.onMidiIn(midiData);
    expect(callbacks[0].mock.calls).toHaveLength(0);
    expect(callbacks[1].mock.calls).toHaveLength(0);

    midiController.triggerOnPress(callbacks);
    midiController.onMidiIn(midiData);

    expect(callbacks[0]).toHaveBeenCalledWith(415.3);
    expect(callbacks[1]).toHaveBeenCalledWith(415.3);
  });

  it('should handle on midi in note off', () => {
    const midiController = new MIDIController();

    const callbacks = [
      jest.fn(),
      jest.fn(),
    ];

    const midiData = {
      data: [162, 40, 127],
    };

    midiController.onMidiIn(midiData);
    expect(callbacks[0].mock.calls).toHaveLength(0);
    expect(callbacks[1].mock.calls).toHaveLength(0);

    midiController.triggerOnRelease(callbacks);
    midiController.onMidiIn(midiData);

    expect(callbacks[0]).toHaveBeenCalledWith(164.81);
    expect(callbacks[1]).toHaveBeenCalledWith(164.81);
  });


  it('should stop outputs', () => {
    const midiController = new MIDIController();

    midiController.inputs = [{
      input: 'input',
    }];

    midiController.outputs = [{
      open: jest.fn(),
      send: jest.fn(),
    }];

    const sendSpy = jest.spyOn(midiController.outputs[0], 'send');
    const testInputsSpy = jest.spyOn(midiController, 'testInputs');

    midiController.stopOutputs();

    expect(sendSpy).toHaveBeenCalledWith([0x80, 60, 0]);
    expect(testInputsSpy).toHaveBeenCalled();
  });
});
