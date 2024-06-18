import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Slider, {SliderProps} from '../components/Slider/slider';

type SliderValue = number | [number, number];

export default {
  title: 'Components/Slider',
  component: Slider,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['Continuous', 'Discreet'],
      },
    },
    subtype: {
      control: {
        type: 'select',
        options: ['Single', 'Range'],
      },
    },
    numberOfSteps: {
      control: {
        type: 'number',
      },
    },
    handleSize: {
      control: {
        type: 'select',
        options: ['Size_24', 'Size_32'],
      },
    },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<SliderProps> = (args) => <Slider {...args} />;

export const ContinuousSingle = Template.bind({});
ContinuousSingle.args = {
  type: 'Continuous',
  subtype: 'Single',
  handleSize: 'Size_24',
  onChange: (value: SliderValue) => {
    if (typeof value === 'number') {
      console.log('Slider value:', value);
    }
  },
};

export const ContinuousRange = Template.bind({});
ContinuousRange.args = {
  type: 'Continuous',
  subtype: 'Range',
  handleSize: 'Size_24',
  onChange: (value: SliderValue) => {
    if (Array.isArray(value)) {
      console.log('Slider values:', value);
    }
  },
};

export const DiscreetSingle = Template.bind({});
DiscreetSingle.args = {
  type: 'Discreet',
  subtype: 'Single',
  numberOfSteps: 10,
  handleSize: 'Size_32',
  onChange: (value: SliderValue) => {
    if (typeof value === 'number') {
      console.log('Slider value:', value);
    }
  },
};

export const DiscreetRange = Template.bind({});
DiscreetRange.args = {
  type: 'Discreet',
  subtype: 'Range',
  numberOfSteps: 10,
  handleSize: 'Size_32',
  onChange: (value: SliderValue) => {
    if (Array.isArray(value)) {
      console.log('Slider values:', value);
    }
  },
};

// Developer - Koushik Koppolu!