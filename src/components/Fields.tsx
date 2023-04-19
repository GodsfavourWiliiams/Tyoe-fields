import { useCallback, useState } from "react";
import FormInput from "./FormInput";

interface Field {
  name: string;
  required: boolean;
  type: string;
  properties?: Field[];
}

const Types = [
  { value: "string", name: "String" },
  { value: "number", name: "Number" },
  { value: "boolean", name: "Boolean" },
  { value: "object", name: "Object" },
];

interface FieldsProps {
  data: Field[];
}

export default function Fields({ data=[] }: FieldsProps) {
  const [, updateState] = useState({});
  const Update = useCallback(() => updateState({}), []);
  const createField = (): Field => ({
    name: "fieldName",
    required: false,
    type: "string",
  });
  
  return (
    <>
      {data?.map((field, index) => (
        <div key={index}>
          <ul className="flex items-center justify-between p-2 rounded-md bg-indigo-50 gap-3 my-2">
            <FormInput
              initialData={field.name}
              onSave={(newKey) => (field.name = newKey)}
            />
            {field?.type === "object" && (
              <button
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (field?.properties?.length! > 0)
                    field.properties!.push(createField());
                  else field.properties = [createField()];
                  Update();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 10.5v6m3-3H9m4.06-7.19l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </button>
            )}
            <select
              name="type"
              className="rounded-md border-0 bg-white text-gray-500 p-2 h-10 focus:ring-0 focus:ring-white sm:text-sm"
              value={field.type}
              onChange={(e) => {
                if (field.type === "object" && e.target.value !== "object") {
                  delete field.properties;
                  field.type = e.target.value;
                } else if (
                  field.type !== "object" &&
                  e.target.value === "object"
                ) {
                  field.type = e.target.value;
                  field.properties = [];
                } else {
                  field.type = e.target.value;
                }
                Update();
              }}
            >
                  {Types.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </select>
                
            <div className="flex ">
              <div className="flex items-center">
                  <input
                  checked={field.required}
                  value={field.required.toString()}
                  onChange={() => {
                    field.required = !field.required;
                    Update();
                  }}
                  type="checkbox" name="required" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 " />
                  <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Required</label>
              </div>
              <button  
                onClick={() => {
                  data.splice(index, 1);
                  Update();
                }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
            
          </ul>
          {field?.type === "object" && field?.properties && (
            <ul className="w-full flex justify-between items-center ml-5">
              <Fields data={field?.properties} />
            </ul>
          )}
        </div>
      ))}
    </>
  );
}