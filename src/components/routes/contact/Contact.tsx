import React, { useState, useRef, FormEvent } from 'react';
import BackgroundImage from '../../background/animation/BackgroundImage';
import style from './contact.module.css';
import sendEmail from '../../../services/emailJS';
import { background } from '../../../media/images/index';

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendEmail(form.current)

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <>
            <BackgroundImage src={background}/>
            <section className={style.container}>
                <form ref={form} onSubmit={e => handleSubmit(e)}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input 
                            type='text' 
                            name='name' 
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email </label>
                        <input 
                            type='email' 
                            name='email' 
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='subject'>Subject</label>
                        <input 
                            type='text' 
                            name='subject' 
                            required
                            value={subject}
                            onChange={e => setSubject(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor='message'>Message</label>
                        <textarea 
                            name='message' 
                            required
                            value={message}
                            onChange={e => setMessage(e.target.value)}/>
                    </div>
                    <div>
                        <button type='submit' name='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Contact;