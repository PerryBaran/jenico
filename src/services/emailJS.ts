import emailjs from "emailjs-com";

const sendEmail = async (content: HTMLFormElement | null) => {
  if (content) {
    await emailjs
      .sendForm(
        "service_szxchwk",
        "template_ldjw82j",
        content,
        "kavY_LmpokDn2OKmV"
      )
      .then(
        () => {
          alert("Email sent successfully");
        },
        (error) => {
          alert(`Oops, something went wrong: ${error.text}`);
        }
      );
  }
};

export default sendEmail;
