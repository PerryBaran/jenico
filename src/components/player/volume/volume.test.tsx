import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Volume from './Volume'
import { useState } from 'react';

afterEach(cleanup);

const RenderWithProps = ({vol = 0.5}) => {
    const [volume, setVolume] = useState(vol);
    return (<Volume volume={volume} setVolume={setVolume}/>)
};

it('renders without crashing', () => {
    render(<RenderWithProps/>);
});

describe('slider', () => {
    it('is rendered', () =>{
        render(<RenderWithProps/>);
        const slider = screen.getByRole('slider');
        expect(slider).toBeTruthy();
    });
    it('has correct name', () =>{
        render(<RenderWithProps/>);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('name', 'volume');
    });
    it('has correct min and max', () =>{
        render(<RenderWithProps/>);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveAttribute('min', '0');
        expect(slider).toHaveAttribute('max', '100');
    });
    it('changes value with volume', () => {
        render(<RenderWithProps vol={0.7}/>);
        const slider = screen.getByRole('slider');
        expect(slider).toHaveValue('70');
    });
});

describe('button', () => {
    it('renders button', () => {
        render(<RenderWithProps/>);
        const button = screen.getByRole('button');
        expect(button).toBeTruthy();
   });
    it('renders button img', () => {
        render(<RenderWithProps/>);
        const img = screen.getByRole('img');
        expect(img).toBeTruthy();
    });
    it('renders correct img when volume is muted', () => {
        render(<RenderWithProps vol={0}/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'volume-mute.png');
    });
    it('renders correct img when volume is less than 0.5', () => {
        render(<RenderWithProps vol={0.2}/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'low-volume.png');
    });
    it('renders correct img when volume is 0.5 or greater', () => {
        render(<RenderWithProps/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'medium-volume.png');
    });
});