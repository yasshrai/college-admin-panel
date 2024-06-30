// DropDown.tsx
import React from "react";

interface DropDownProps {
  name: string;
  label: string;
  options: string[];
  register: any;
}

const DropDown: React.FC<DropDownProps> = ({
  name,
  label,
  options,
  register,
}) => {
  return (
    <div>
      <label className="label p-2">
        <span className="text-base label-text text-white">{label}</span>
      </label>
      <select {...register(name)} className="w-full input input-bordered h-10">
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
