import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Background from './Background';




afterEach(cleanup);

it('renders without crashing', () => {
    render(<Background src=''/>);
});

describe('image', () => {
    it('correctly applgies src', () => {
        render(<Background src='test'/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'test');
    });

    it('has corregct alt text', () => {
        render(<Background src=''/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'background');
    });
});

describe('video', () => {
    it('conditionally renders video', () => {
        render(<Background src='test' video={true}/>);
        const video = screen.getByTestId('video');
        expect(video).toBeTruthy();
    })

    it('correctly applies src', () => {
        render(<Background src='test' video={true}/>);
        const video = screen.getByTestId('video');
        expect(video).toHaveAttribute('src', 'test');
    });

    it('autoplays video', () => {
        render(<Background src='test' video={true}/>);
        const video = screen.getByTestId('video');
        expect(video).toHaveAttribute('autoplay');
    });

    it('loops video', () => {
        render(<Background src='test' video={true}/>);
        const video = screen.getByTestId('video');
        expect(video).toHaveAttribute('loop');
    });

    //can't test muted attribute as it doesn't show up in the DOM
});




