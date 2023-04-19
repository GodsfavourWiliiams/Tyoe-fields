import { useState, ChangeEvent, ReactElement } from "react";

interface FormInputProps {
  initialData: string;
  onSave: (name: string) => void;
}

export default function FormInput({ initialData, onSave }: FormInputProps): ReactElement {
  const [name, setName] = useState(initialData);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleSave = (): void => {
    onSave(name);
  };

  return (
    <>
      <input
        type="text"
        className="w-36 bg-white rounded border-0 py-2 px-3 text-gray-900 placeholder:text-gray-400  sm:text-sm sm:leading-6 h-10"
        name="name"
        value={name}
        onChange={handleNameChange}
        onBlur={handleSave}
      />
    </>
  );
}
