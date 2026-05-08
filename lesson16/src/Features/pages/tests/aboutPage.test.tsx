import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AboutPage } from '../AboutPage';

describe('About Page', () => {
  it('sýnir fyrirsögn', () => {
    render(<AboutPage />);
    expect(
      screen.getByRole('heading', { name: /about the app/i }),
    ).toBeInTheDocument();
  });
});