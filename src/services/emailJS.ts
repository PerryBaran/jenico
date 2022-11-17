import emailjs from "emailjs-com";

const sendEmail = async (content: HTMLFormElement | null) => {
  if (content) {
    try {
      await emailjs.sendForm(
        "service_szxchwk",
        "template_ldjw82j",
        content,
        "kavY_LmpokDn2OKmV"
      );
      alert("Email sent successfully");
    } catch (err) {
      alert(`Oops, something went wrong`);
      console.error(err);
    }
  }
};

export default sendEmail;
