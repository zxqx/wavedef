import ctx from 'audio-context';

export default class FrequencyAnalyzer {
  constructor() {
    this.node = ctx().createAnalyser();
    this.elem = document.createElement('div');
  }

  draw(target, {
    fftSize,
    height,
    lineThickness,
    lineColor,
  }) {
    const { node, elem } = this;

    this.target = target;

    node.fftSize = fftSize;
    node.height = height;
    node.lineThickness = lineThickness;
    node.lineColor = lineColor;

    target.appendChild(elem);

    const svgNamespace = 'http://www.w3.org/2000/svg';
    const paper = document.createElementNS(svgNamespace, 'svg');
    paper.setAttribute('viewBox', `0 0 2450 ${height}`);
    paper.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
    elem.appendChild(paper);

    const oscLine = document.createElementNS(svgNamespace, 'path');
    oscLine.setAttribute('stroke', lineColor);
    oscLine.setAttribute('stroke-width', lineThickness);
    oscLine.setAttribute('fill', 'none');
    paper.appendChild(oscLine);

    const freqData = new Uint8Array(node.frequencyBinCount);

    this.drawLine(freqData, oscLine);
  }

  drawLine(freqData, oscLine) {
    const { height, lineThickness, lineColor } = this.node;

    this.node.getByteTimeDomainData(freqData);

    const graphPoints = [];
    const svgDValue = [];

    graphPoints.push(`M0, ${height / 2}`);

    for (let i = 0; i < freqData.length; i++) {
      if (i % 10) {
        const point = (freqData[i] / 128) * (height / 2);
        graphPoints.push(`L${i}, ${point}`);
      }
    }

    for (let i = 0; i < graphPoints.length; i++) {
      svgDValue.push(graphPoints[i]);
    }

    oscLine.setAttribute('stroke', lineColor);
    oscLine.setAttribute('stroke-width', lineThickness);
    oscLine.setAttribute('d', svgDValue.join(''));

    setTimeout(() => this.drawLine(freqData, oscLine), 100);
  }

  destroy() {
    this.elem.innerHTML = '';
  }
}
