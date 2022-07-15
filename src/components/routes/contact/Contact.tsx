import React, { useState, useRef, FormEvent } from 'react';
import BackgroundAnimation from '../../background/animation/BackgroundAnimation';
import style from './contact.module.css';
import emailjs from 'emailjs-com'

function Contact() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');


    const form = useRef<HTMLFormElement|null>(null);

    const sendEmail = (e:FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (form.current) {
        emailjs.sendForm('service_szxchwk', 'template_ldjw82j', form.current, 'kavY_LmpokDn2OKmV')
        .then((result) => {
            alert('Email sent successfully')
        }, (error) => {
            alert(`Oops, something went wrong: ${error.text}`);
        });
      };

      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    };

    return (
        <>
            <BackgroundAnimation />
            <section className={style.container}>
                <form ref={form} onSubmit={e => sendEmail(e)}>
                    <label htmlFor='name'>Name</label>
                    <input 
                        type='text' 
                        name='name' 
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <label htmlFor='email'>Email </label>
                    <input 
                        type='email' 
                        name='email' 
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}/>
                    <label htmlFor='subject'>Subject</label>
                    <input 
                        type='text' 
                        name='subject' 
                        required
                        value={subject}
                        onChange={e => setSubject(e.target.value)}/>
                    <label htmlFor='message'>Message</label>
                    <textarea 
                        name='message' 
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}/>
                        <div>
                            <button type='submit' name='submit'>Submit</button>
                        </div>
                </form>
            </section>
        </>
    );
};

export default Contact;