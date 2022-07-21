import { useState, useRef, FormEvent, Dispatch, SetStateAction } from 'react';
import BackgroundImage from '../../background/image/BackgroundImage';
import style from './contact.module.css';
import sendEmail from '../../../services/emailJS';
import { background } from '../../../media/images/index';
import Input from './input/Input';
import Textarea from './textarea/Textarea';

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
                <form ref={form} onSubmit={e => handleSubmit(e)}>
                    <Input name='Name' type='text' value={name} setValue={setName} setFormFocused={setFormFocused}/>
                    <Input name='Email' type='email' value={email} setValue={setEmail} setFormFocused={setFormFocused}/>
                    <Input name='Subject' type='text' value={subject} setValue={setSubject} setFormFocused={setFormFocused}/>
                    <Textarea name='Message' value={message} setValue={setMessage} setFormFocused={setFormFocused}/>
                    <div>
                        <button type='submit' name='submit'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Contact;