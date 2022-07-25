import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import BackgroundVideo from './BackgroundVideo';

afterEach(cleanup);

it('renders without crashing', () => {
    render(<BackgroundVideo src=''/>);
});

it('correctly applies src', () => {
    render(<BackgroundVideo src='video'/>);
    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('src', 'video');
});

it('autoplays video', () => {
    render(<BackgroundVideo src=''/>);
    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('autoplay');
});

it('loops video', () => {
    render(<BackgroundVideo src=''/>);
    const video = screen.getByTestId('video');
    expect(video).toHaveAttribute('loop');
});

//can't test muted attribute as it doesn't show up in the DOM