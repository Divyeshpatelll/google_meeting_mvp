const DateTimeInput = ({ label, value, onChange, min, disabled }) => (
  <div>
    <p className="mb-1">{label}: </p>
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      min={min}
      className="border px-3 py-2 rounded w-full"
      disabled={disabled}
    />
  </div>
);

export default DateTimeInput; 