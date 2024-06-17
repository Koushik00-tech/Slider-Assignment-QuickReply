import React, { useState } from 'react';

import './App.css'; // Assuming you have some basic styles
import Slider, { SliderProps } from './components/Slider/slider';

const App: React.FC = () => {
  const [sliderValue, setSliderValue] = useState<number | [number, number]>(0);

  const handleSliderChange = (value: number | [number, number]) => {
    setSliderValue(value);
    console.log('Slider Value:', value);
  };

  const sliderProps: SliderProps = {
    type: 'Continuous',
    subtype: 'Single',
    handleSize: 'Size_24',
    onChange: handleSliderChange,
  };

  return (
    <div className="App">
      <h1>Slider Component</h1>
      <Slider {...sliderProps} />
      <div className="slider-output">
        <h2>Selected Value: {typeof sliderValue === 'number' ? sliderValue : `${sliderValue[0]} - ${sliderValue[1]}`}</h2>
      </div>
    </div>
  );
};

export default App;
