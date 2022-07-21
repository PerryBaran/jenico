import {Dispatch, SetStateAction} from 'react';

interface Props {
    name: string,
    type: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    setFormFocused: Dispatch<SetStateAction<boolean>>
}

function Input(props: Props) {
    const {name, type, value, setValue, setFormFocused} = props

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <input 
                type={type} 
                name={name}
                required
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setFormFocused(true)}
                onBlur={() => setFormFocused(false)}/>
        </div>
    );
}

export default Input;