import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundImage from './BackgroundImage';

afterEach(cleanup);

it('renders without crashing', () => {
    render(<BackgroundImage src=''/>);
});

it('correctly applies src', () => {
    render(<BackgroundImage src='image'/>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'image');
});

it('has correct alt text', () => {
    render(<BackgroundImage src=''/>);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('alt', 'background');
});