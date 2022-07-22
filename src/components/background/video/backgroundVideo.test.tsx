import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundVideo from './BackgroundVideo';

afterEach(cleanup);

it('renders without crashing', () => {
    render(<BackgroundVideo src=''/>);
});

it('correctly applies src', () => {
    render(<BackgroundVideo src='video'/>);
    const img = screen.getByTestId('video');
    expect(img).toHaveAttribute('src', 'video');
});

it('autoplays video', () => {
    render(<BackgroundVideo src=''/>);
    const img = screen.getByTestId('video');
    expect(img).toHaveAttribute('autoplay');
});

it('loops video', () => {
    render(<BackgroundVideo src=''/>);
    const img = screen.getByTestId('video');
    expect(img).toHaveAttribute('loop');
});

//can't test muted attribute as it doesn't show up in the DOM