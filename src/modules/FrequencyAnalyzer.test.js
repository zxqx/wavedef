import 'web-audio-test-api';
import FrequencyAnalyzer from './FrequencyAnalyzer';

describe('FrequencyAnalyzer', () => {
  it('should create analyzer node', () => {
    const frequencyAnalyzer = new FrequencyAnalyzer();

    expect(frequencyAnalyzer.node.constructor.name).toEqual('AnalyserNode');
  });

  it('should create analyzer element', () => {
    const frequencyAnalyzer = new FrequencyAnalyzer();

    expect(frequencyAnalyzer.elem.constructor.name).toEqual('HTMLDivElement');
  });

  it('should accept attributes', () => {
    const frequencyAnalyzer = new FrequencyAnalyzer();
    const target = document.createElement('div');

    frequencyAnalyzer.draw(target, {
      fftSize: 1024,
      height: 500,
      lineThickness: 17,
      lineColor: 'pink',
    });

    expect(frequencyAnalyzer.node.fftSize).toEqual(1024);
    expect(frequencyAnalyzer.node.height).toEqual(500);
    expect(frequencyAnalyzer.node.lineThickness).toEqual(17);
    expect(frequencyAnalyzer.node.lineColor).toEqual('pink');
  });

  it('should inject analyzer into target', () => {
    const frequencyAnalyzer = new FrequencyAnalyzer();
    const target = document.createElement('div');
    const spy = jest.spyOn(target, 'appendChild');

    frequencyAnalyzer.draw(target, {
      fftSize: 1024,
      height: 500,
      lineThickness: 17,
      lineColor: 'pink',
    });

    expect(spy).toHaveBeenCalledWith(frequencyAnalyzer.elem);
  });

  it('should draw', () => {
    const frequencyAnalyzer = new FrequencyAnalyzer();
    const target = document.createElement('div');
    const spy = jest.spyOn(frequencyAnalyzer, 'drawLine');

    frequencyAnalyzer.draw(target, {
      fftSize: 1024,
      height: 500,
      lineThickness: 17,
      lineColor: 'pink',
    });

    expect(spy).toHaveBeenCalled();
  });

  it('should draw line every 100ms', () => {
    jest.useFakeTimers();

    const frequencyAnalyzer = new FrequencyAnalyzer();
    const target = document.createElement('div');
    const spy = jest.spyOn(frequencyAnalyzer, 'drawLine');

    frequencyAnalyzer.draw(target, {
      fftSize: 1024,
      height: 500,
      lineThickness: 17,
      lineColor: 'pink',
    });

    jest.advanceTimersByTime(500);

    expect(spy.mock.calls.length).toEqual(6);
  });
});
