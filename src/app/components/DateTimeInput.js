const DateTimeInput = ({ label, value, onChange, min, disabled }) => (
  <div>
    <p className="mb-1 text-black">{label}: </p>
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      min={min}
      className="border px-3 py-2 rounded w-full text-black"
      disabled={disabled}
    />
  </div>
);

export default DateTimeInput; 