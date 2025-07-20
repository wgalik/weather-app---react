const Form = ({ value, change, submit }) => {
  return (
    <form onSubmit={submit}>
      <input
        type="text"
        value={value}
        onChange={change}
        placeholder="Wpisz nazwę miasta"
      />
      <button>Wyszukaj miasta</button>
    </form>
  );
};

export default Form;
