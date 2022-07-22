import {Dispatch, SetStateAction} from 'react';

interface Props {
    name: string,
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
    setFormFocused: Dispatch<SetStateAction<boolean>>
};

function Textarea(props: Props) {
    const {name, value, setValue, setFormFocused} = props;

    return (
        <div>
            <label htmlFor={name}>{name}</label>
            <textarea
                name={name}
                required
                value={value}
                onChange={e => setValue(e.target.value)}
                onFocus={() => setFormFocused(true)}
                onBlur={() => setFormFocused(false)}/>
        </div>
    );
};



export default Textarea;