import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import playButton from '../../assets/transport/play.png';
import './DragInput.css';

export default class DragInput extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    defaultValue: PropTypes.number.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    min: 0,
    max: 100,
  }

  state = {
    value: this.props.defaultValue,
    mouseYPosition: null,
    dragging: false,
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.updateInput);
    document.addEventListener('mouseup', this.stopInput);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.updateInput);
    document.removeEventListener('mouseup', this.stopInput);
  }

  stopInput = () => {
    this.setState({ dragging: false });
  }

  isInRange(value) {
    const { min, max } = this.props;
    return value >= min && value <= max;
  }

  computeNewValue(pageY) {
    const { mouseYPosition } = this.state;
    const { min, max } = this.props;

    const value = this.state.value + Math.floor((mouseYPosition - pageY) / 2);

    if (value > max) {
      return max;
    } else if (value < min) {
      return min;
    }

    return value;
  }

  updateInput = (e) => {
    const { dragging } = this.state;
    const { onChange } = this.props;
    const { pageY } = e;

    if (dragging) {
      const value = this.computeNewValue(pageY);

      if (this.isInRange(value) && this.state.value !== value) {
        this.setState({
          mouseYPosition: pageY,
          value,
        });

        onChange(value);
      }
    }
  }

  render() {
    const { dragging } = this.state;

    const {
      label,
      min,
      max,
      onChange,
    } = this.props;

    const { value } = this.state;

    return (
      <Fragment>
        {dragging &&
          <div className="drag-input-overlay" />
        }
        <div
          className="drag-input-container"
          onMouseDown={(e) => {
            const { tagName } = e.target;

            if (tagName === 'BUTTON') {
              return;
            }

            this.setState({
              dragging: true,
              mouseYPosition: e.pageY,
            });
          }}
          onMouseUp={() => this.setState({ dragging: false })}
        >
          <label
            htmlFor="drag-input"
            className="drag-input-label"
          >
            {label}
          </label>

          <span
            role="textbox"
            name="drag-input"
            className="drag-input"
          >
            {value}
          </span>

          <div className="drag-input-buttons">
            <button
              className="drag-input-button drag-input-up-button"
              disabled={value === max}
              onClick={() => {
                const newValue = value + 1;

                if (this.isInRange(newValue)) {
                  this.setState({ value: newValue });
                  onChange(newValue);
                }
              }}
            >
              <img src={playButton} alt="Up" />
            </button>

            <button
              className="drag-input-button drag-input-down-button"
              disabled={value === min}
              onClick={() => {
                const newValue = value - 1;

                if (this.isInRange(newValue)) {
                  this.setState({ value: newValue });
                  onChange(newValue);
                }
              }}
            >
              <img src={playButton} alt="Down" />
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
