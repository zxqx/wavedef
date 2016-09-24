import ctx from 'audio-context';

export default class FrequencyAnalyzer {
  constructor() {
    this.node = ctx.createAnalyser();
    this.elem = document.createElement('div');

    const analyzer = this.node;
    const elem = this.elem;

    elem.className += 'frequency-analyzer';
    document.body.insertBefore(elem, document.querySelector('#main'));

    analyzer.width = elem.offsetWidth;
    analyzer.height = elem.offsetHeight;
    analyzer.lineColor = '#191919';
    analyzer.lineThickness = 5;

    const svgNamespace = 'http://www.w3.org/2000/svg';
    const paper = document.createElementNS(svgNamespace, 'svg');
    paper.setAttribute('width', analyzer.width);
    paper.setAttribute('height', analyzer.height);
    paper.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    elem.appendChild(paper);

    const oscLine = document.createElementNS(svgNamespace, 'path');
    oscLine.setAttribute('stroke', analyzer.lineColor);
    oscLine.setAttribute('stroke-width', analyzer.lineThickness);
    oscLine.setAttribute('fill', 'none');
    paper.appendChild(oscLine);

    const noDataPoints = 10;
    const freqData = new Uint8Array(analyzer.frequencyBinCount);

    const drawLine = () => {
      analyzer.getByteTimeDomainData(freqData);

      const graphPoints = [];
      let graphStr = '';

      graphPoints.push(`M0, ${analyzer.height / 2}`);

      for (let i = 0; i < freqData.length; i++) {
        if (i % noDataPoints) {
          const point = (freqData[i] / 128) * (analyzer.height / 2);
          graphPoints.push(`L${i}, ${point}`);
        }
      }

      for (let i = 0; i < graphPoints.length; i++) {
        graphStr += graphPoints[i];
      }

      oscLine.setAttribute('stroke', analyzer.lineColor);
      oscLine.setAttribute('stroke-width', analyzer.lineThickness);

      oscLine.setAttribute('d', graphStr);

      setTimeout(drawLine, 100);
    };

    drawLine();
  }
}
