import { useState, useRef, FormEvent, Dispatch, SetStateAction } from 'react';
import BackgroundImage from '../../background/image/BackgroundImage';
import style from './contact.module.css';
import sendEmail from '../../../services/emailJS';
import { background } from '../../../media/images/index';

function Contact(props: {setFormFocused: Dispatch<SetStateAction<boolean>>}) {
    const {setFormFocused} = props

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    
    const form = useRef<HTMLFormElement>(null);

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendEmail(form.current);

        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
    };

    return (
        <>
            <BackgroundImage src={background}/>
            <section className={style.container}>
                <form ref={form} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='Name'>Name</label>
                        <input 
                            type='text' 
                            name='Name'
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>
                    <div>
                        <label htmlFor='Email'>Email</label>
                        <input 
                            type='email' 
                            name='Email'
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>   
                    <div>
                        <label htmlFor='Subject'>Subject</label>
                        <input 
                            type='text' 
                            name='Subject'
                            required
                            value={subject}
                            onChange={e => setSubject(e.target.value)}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>                    
                    <div>
                        <label htmlFor='Message'>Message</label>
                        <textarea
                            name='Message'
                            required
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
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