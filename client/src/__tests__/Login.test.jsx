import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import AdminLogin from '../pages/AdminLogin';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

// Mock the API service
vi.mock('../services/api', () => ({
    default: {
        post: vi.fn(() => Promise.resolve({ data: { token: 'fake-token' } }))
    }
}));

const MockLogin = () => (
    <AuthProvider>
        <BrowserRouter>
            <AdminLogin />
        </BrowserRouter>
    </AuthProvider>
);

describe('AdminLogin Page', () => {
    it('renders login form', async () => {
        render(<MockLogin />);
        expect(screen.getByRole('textbox', { name: /username/i })).toBeInTheDocument();
        // Password is not a textbox, usually needs logic or getByLabelText
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    it('updates input fields', () => {
        render(<MockLogin />);
        const usernameInput = screen.getByLabelText(/username/i);
        fireEvent.change(usernameInput, { target: { value: 'admin' } });
        expect(usernameInput.value).toBe('admin');
    });
});
