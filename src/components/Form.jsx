import "./Form.scss";

const Form = ({ change, submit, value }) => {
  const className = "active";

  return (
    <form className={value ? className : null} onSubmit={submit}>
      <input
        className={value ? className : null}
        type="text"
        value={value}
        onChange={change}
        placeholder="Search for a city"
      />
    </form>
  );
};

export default Form;
