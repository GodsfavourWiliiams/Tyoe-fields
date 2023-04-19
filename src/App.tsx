import React, { useState } from 'react';
import Fields from './components/Fields';


interface Field {
  name: string;
  type: string;
  required: boolean;
  properties?: Field[];
}

const defaultFields: Field[] = [
  {
    name: "person",
    type: "object",
    required: true,
    properties: [
      {
        name: "age",
        type: "integer",
        required: true,
      },
    ],
  },
  {
    name: "order",
    type: "string",
    required: true,
  },
  {
    name: "class",
    type: "object",
    required: false,
  },
];

function App(): JSX.Element {
  const [fields, setFields] = useState<Field[]>(defaultFields);
  
  const createField = (): Field => ({
    name: "fieldName",
    required: false,
    type: "string",
  });

  const handleAddField = () => {
    setFields(prevFields => [...prevFields, createField()]);
  };
 
  return (
    <div className="w-full max-w-lg text-center mx-auto">
      <div className="flex my-3 items-center justify-between">
        <h1 className='font-bold text-lg'>Type Fields</h1>
        <button 
          onClick={handleAddField}
          className="text-center p-2  rounded-md shadow hover:bg-indigo-50 transform duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </button>
      </div>
      <div>
      {fields.length > 0 ? <Fields fields={fields} /> : <>No data Found</>}
        <button
          onClick={() => console.log({ fields })}
          className="my-3 w-full text-base font-medium text-white text-center p-4 bg-indigo-700 rounded-md hover:bg-indigo-600 transform duration-300 ease-in-out">
            <span className='flex items-center justify-center gap-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m-6 3.75l3 3m0 0l3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
              </svg>
              Save
            </span>
          </button>
      </div>
    </div>
  );
}

export default App;
