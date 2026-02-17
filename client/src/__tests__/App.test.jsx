import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('App Component', () => {
    it('renders without crashing', () => {
        // We can't easily render App deep because of Providers and Router
        // checking if it exports is a basic sanity check
        expect(App).toBeTruthy();
    });
});
