import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

  describe('App component', () => {
    test('renders type fields', () => {
      render(<App />);
      const header = screen.getByText(/Type Fields/i);
      expect(header).toBeInTheDocument();
    });
  
    test('renders a button to add a new field', () => {
      render(<App />);
      const addButton = screen.getByTestId('add field');
      expect(addButton).toBeInTheDocument();
    });
  
  });