import "./Form.scss";

const Form = ({ value, change }) => {
  const className = "active";

  return (
    <form className={value ? className : null}>
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
