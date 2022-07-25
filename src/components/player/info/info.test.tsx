import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import Info from './Info';

afterEach(cleanup);

const testData = [{
    title: 'title',
    art: 'art',
    songs: [{
        name: 'song',
        ref:'ref',
        src: 'src'
    }],
    hyperlink: 'hyperlink'
}]

it('renders without crashing', () => {
    render(<Info data={testData} albumIndex={0} songIndex={0}/>);
});

describe('img', () => {
    it('applies correct img src', () => {
        render(<Info data={testData} albumIndex={0} songIndex={0}/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'art');
    });
    it('has correct alt text', () => {
        render(<Info data={testData} albumIndex={0} songIndex={0}/>);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('alt', 'title cover art');
    });
});

describe('text', () => {
    it('applies correct h3 text', () => {
        render(<Info data={testData} albumIndex={0} songIndex={0}/>);
        const h3 = screen.getByRole('heading');
        expect(h3).toHaveTextContent('title')
    });
    it('applies correct [] text', () => {
        render(<Info data={testData} albumIndex={0} songIndex={0}/>);
        const p = screen.getByText('song');
        expect(p).toBeTruthy();
    });
})