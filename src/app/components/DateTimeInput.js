import { useState } from 'react';

const DateTimeInput = ({ label, value, onChange, min, disabled }) => {
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const inputValue = e.target.value;
    
    try {
      // Check if the input is a valid date
      const date = new Date(inputValue);
      if (isNaN(date.getTime())) {
        setError('Invalid date/time');
        return;
      }

      // Check if date is before minimum date
      if (min && new Date(inputValue) < new Date(min)) {
        setError('Cannot select past date/time');
        return;
      }

      setError('');
      onChange(e);
    } catch (err) {
      setError('Invalid date/time format');
    }
  };

  return (
    <div>
      <p className="mb-1 text-black">{label}: </p>
      <div className="relative">
        <input
          type="datetime-local"
          value={value}
          onChange={handleChange}
          min={min}
          className={`border px-3 py-2 rounded w-full text-black ${error ? 'border-red-500' : ''}`}
          disabled={disabled}
        />
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
      </div>
    </div>
  );
};

export default DateTimeInput; 