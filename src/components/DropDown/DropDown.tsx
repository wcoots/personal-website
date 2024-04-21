import { ChangeEvent, useState } from 'react';
import styles from './DropDown.module.css';

interface DropdownProps<T extends string> {
  title: string;
  initialValue: T;
  options: T[];
  handleChange(option: T): void;
}

function DropDown<T extends string>({ title, initialValue, options, handleChange }: DropdownProps<T>) {
  const [selectedItem, setSelectedItem] = useState<T>(initialValue);

  const onChange = ({ target: { value } }: ChangeEvent<HTMLSelectElement & { value: T }>) => {
    setSelectedItem(value);
    handleChange(value);
  };

  return (
    <div className={styles['dropdown-container']} style={{ margin: '20px' }}>
      <label htmlFor="dropdown" style={{ marginRight: '10px' }}>
        {title}:
      </label>
      <select
        id="dropdown"
        className={styles.dropdown}
        value={selectedItem}
        onChange={onChange}
        style={{ padding: '5px 10px', borderRadius: '4px' }}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
