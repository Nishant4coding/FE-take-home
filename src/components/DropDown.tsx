import { Column } from "../types";

interface DropDownProps {
  fields: Column[];
  selectedFields: string[];
  setSelectedFields: React.Dispatch<React.SetStateAction<string[]>>;
}

export const DropDown: React.FC<DropDownProps> = ({
  fields,
  selectedFields,
  setSelectedFields,
}) => {
  const handleButtonClick = (key: string) => {
    setSelectedFields((prevSelectedFields) => {
      if (prevSelectedFields.includes(key)) {
        return prevSelectedFields.filter((field) => field !== key);
      } else {
        return [...prevSelectedFields, key];
      }
    });
  };

  return (
    <div className="">
      <div className="flex flex-wrap gap-2 py-2">
        {fields.map((field) => (
          <button
            key={field.key}
            onClick={() => handleButtonClick(field.key)}
            className={`px-2 lg:px-4 lg:py-2 py-1 rounded-lg text-sm font-semibold transition ${
              selectedFields.includes(field.key)
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {field.header}
          </button>
        ))}
      </div>
    </div>
  );
};
