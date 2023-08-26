import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import App from './App';

vi.mock('@react-pdf/renderer', () => ({
  Document: () => <span>Document</span>,
  Page: () => <span>Page</span>,
  PDFViewer: () => <span>PDFViewer</span>,
  Text: () => <span>Text</span>
}));

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Überschrift/i);
  expect(linkElement).toBeInTheDocument();
});
