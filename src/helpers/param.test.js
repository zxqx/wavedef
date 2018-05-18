import param from './param';

describe('Param helper', () => {
  it('should select param', () => {
    const osc = {
      node: {
        frequency: {
          value: 640,
        },
      },
    };

    expect(osc::param('frequency')).toEqual(osc.node.frequency);
  });
});
