/* eslint-disable no-unused-vars */
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Reminder from '../src/Reminder'

describe('Reminder', () => {
  it('renders the Reminder component', () => {
    render(<Reminder />);
    screen.debug();
  })})
describe('Reminder text', () => {
  it('Text is correct', () => {
    render(<Reminder />);
    let test1 = true;
    try{
      const text = screen.getByText('Reminder');
    } catch {
      test1 = false;
    }
    let test2 = true;
    try{
      const text2 = screen.getByText('Blank Reminder for testing');
    } catch {
      test2 = false;
    }
    console.log(test1);
    console.log(test2);
    expect(test1).toEqual(true);
    expect(test2).toEqual(true);
  })
})