import { useState, useRef, FormEvent, Dispatch, SetStateAction, ChangeEvent } from 'react';
import BackgroundImage from '../../background/image/BackgroundImage';
import style from './contact.module.css';
import sendEmail from '../../../services/emailJS';
import { background } from '../../../media/images/index';

function Contact(props: {setFormFocused: Dispatch<SetStateAction<boolean>>}) {
    const {setFormFocused} = props;

    const [form, setForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    
    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const name = e.target.name;
        const value = e.target.value;
        const formCopy = {...form};

        formCopy[name as keyof typeof form] = value;

        setForm(formCopy);
    };

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        sendEmail(formRef.current);

        setForm({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    };

    return (
        <>
            <BackgroundImage src={background}/>
            <section className={style.container}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input
                            name='name'
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input 
                            type='email' 
                            name='email'
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>   
                    <div>
                        <label htmlFor='subject'>Subject</label>
                        <input
                            name='subject'
                            required
                            value={form.subject}
                            onChange={handleChange}
                            onFocus={() => setFormFocused(true)}
                            onBlur={() => setFormFocused(false)}/>
                    </div>                    
                    <div>
                        <label htmlFor='message'>Message</label>
                        <textarea
                            name='message'
                            required
                            value={form.message}
                            onChange={handleChange}
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