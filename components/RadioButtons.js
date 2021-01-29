import { Fragment } from 'react';

import radioButtonsStyle from './RadioButtons.module.scss';

const RadioButtons = ({ options, radio, handleChange }) => {
  const buttonOptions = options.map((option, index) => (
    <Fragment key={index}>
      <input
        type="radio"
        name="toggle"
        id={`toggle-${index}`}
        autoComplete="off"
        checked={radio.checked === index}
        onChange={handleChange}
      />
      <label htmlFor={`toggle-${index}`}>{option}</label>
    </Fragment>
  ));

  return <div className={radioButtonsStyle.radio}>{buttonOptions}</div>;
};

export default RadioButtons;
