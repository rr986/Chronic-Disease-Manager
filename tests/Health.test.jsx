import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import ChronicConditions from '../src/ChronicConditions'

describe('ChronicConditions', () => {
    it('renders the Chronic component', () => {
      render(<ChronicConditions />);
      screen.debug();
    })})
  describe('ChronicConditions text', () => {
    it('Text is correct', () => {
      render(<ChronicConditions />);
      let test1 = true;
      try{
        const text = screen.getByText('Chronic Condition List');
      } catch {
        test1 = false;
      }
      let test2 = true;
      try{
        const text2 = screen.getByText('No Chronic Conditions');
      } catch {
        test2 = false;
      }
      console.log(test1);
      console.log(test2);
      expect(test1).toEqual(true);
      expect(test2).toEqual(true);
    })
  })