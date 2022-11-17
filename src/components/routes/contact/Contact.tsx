import {
  useReducer,
  useRef,
  FormEvent,
  ChangeEvent,
} from "react";
import Background from "../../background/Background";
import style from "./contact.module.css";
import sendEmail from "../../../services/emailJS";
import { background } from "../../../media/images/index";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

type Form = typeof initialValues;

type ReducerAction =
  | { type: "reset" }
  | { type: "update"; key: string; value: string };

const reducer = (state: Form, action: ReducerAction) => {
  switch (action.type) {
    case "update":
      return {
        ...state,
        [action.key]: action.value,
      };
    case "reset":
      return initialValues;
    default:
      throw new Error("invalid action type");
  }
};

function Contact(props: { handleFormFocus: (value: boolean) => void}) {
  const { handleFormFocus } = props;
  const [state, dispatch] = useReducer(reducer, initialValues);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "update",
      key: e.target.name,
      value: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!state.name || !state.email || !state.subject || !state.message) {
      alert("all form fields must be filled");
      return;
    };
    if (!state.email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)) {
      alert("invalid email");
      return;
    };
    sendEmail(formRef.current);
    dispatch({ type: "reset" });
  };

  const handleFocus = () => {
    handleFormFocus(true);
  };

  const handleBlur = () => {
    handleFormFocus(false);
  };

  return (
    <>
      <Background src={background} />
      <section className={style.container}>
        <form ref={formRef} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              name="name"
              required
              value={state.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              value={state.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label htmlFor="subject">Subject</label>
            <input
              name="subject"
              required
              value={state.subject}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              required
              value={state.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>
          <div>
            <button type="submit" name="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Contact;
