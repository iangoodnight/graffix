import { useState } from 'react';
import radioButtonsStyle from './RadioButtons.module.scss';

const RadioButtons = ({ options }) => {
  const [radio, setRadio] = useState({
    checked: 0,
  });

  const handleChange = (e) => {
    const index = parseInt(e.target.id.split('-')[1]);
    setRadio({...radio, checked: index});
  }

  const buttonOptions = options.map((option, index) => (
    <>
      <input
        type="radio"
        name="toggle"
        id={`toggle-${index}`}
        autocomplete="off"
        checked={radio.checked === index}
        onChange={handleChange}
      />
      <label htmlFor={`toggle-${index}`}>{option}</label>
    </>
  ));

  return (
    <div className={radioButtonsStyle.radio}>
      {buttonOptions}
    </div>
  );
}

export default RadioButtons;
