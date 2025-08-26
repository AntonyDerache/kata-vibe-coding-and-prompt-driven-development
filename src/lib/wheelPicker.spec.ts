import { describe, expect, it } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import WheelPicker from './WheelPicker.svelte';

const setup = () => {
  const utils = render(WheelPicker);
  const input = utils.getByPlaceholderText('Enter a name...');
  const addButton = utils.getByText('Add Name');
  const spinButton = utils.getByText('Spin the Wheel!');
  
  return {
    input,
    addButton,
    spinButton,
    ...utils,
  };
};

describe('WheelPicker component', () => {
  it('should start with an empty message', () => {
    const { getByText } = render(WheelPicker);
    expect(() => getByText('Add names to start spinning!')).not.toThrow();
  });

  it('should add a name to the wheel', async () => {
    const { input, addButton, getByText } = setup();
    
    await fireEvent.input(input, { target: { value: 'John' } });
    await fireEvent.click(addButton);
    
    expect(() => getByText('John')).not.toThrow();
  });

  it('should start with a disabled spin button', () => {
    const { spinButton } = setup();
    expect(spinButton).toHaveAttribute('disabled');
  });

  it('should enable spin button after adding a name', async () => {
    const { input, addButton, spinButton } = setup();
    
    await fireEvent.input(input, { target: { value: 'John' } });
    await fireEvent.click(addButton);
    
    expect(spinButton).not.toHaveAttribute('disabled');
  });

  it('should clear input after adding a name', async () => {
    const { input, addButton } = setup();
    
    await fireEvent.input(input, { target: { value: 'John' } });
    await fireEvent.click(addButton);
    
    expect(input).toHaveValue('');
  });
});