import css from "./ErrorMessage.module.css";

function ErrorMessage() {
  return <p className={css.errorMessage}>Oops, something went wrong</p>;
}

export default ErrorMessage;
