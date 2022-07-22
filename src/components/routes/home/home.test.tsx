import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from "./Home";

afterEach(cleanup);

it('renders without crashing', () => {
    render(<Home/>);
});

it('renders h1 correctly', () => {
    render(<Home/>);
    const h1 = screen.getByText(('Jenico'));
    expect(h1).toBeTruthy();
})