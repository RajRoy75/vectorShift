import { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const StringUtilsNode = ({ id, data }) => {
  const inputValue = data.inputValue || '';
  const operation = data.operation || 'UPPERCASE'; // Default operation

  const [result, setResult] = useState('');

  useEffect(() => {
    let newResult = '';
    switch (operation) {
      case 'UPPERCASE':
        newResult = inputValue.toUpperCase();
        break;
      case 'lowercase':
        newResult = inputValue.toLowerCase();
        break;
      case 'Trim':
        newResult = inputValue.trim();
        break;
      case 'Length':
        newResult = inputValue.length;
        break;
      default:
        newResult = inputValue;
    }
    setResult(newResult);

    if (data.onChange) {
      data.onChange(id, { ...data, result: newResult });
    }
  }, [inputValue, operation, data.onChange, id]);

  const handleFieldChange = (field, value) => {
    if (data.onChange) {
      data.onChange(id, { ...data, [field]: value });
    }
  };

  const fields = [
    {
      name: 'operation',
      label: 'Operation',
      type: 'select',
      value: operation,
      options: ['UPPERCASE', 'lowercase', 'Trim', 'Length'],
      onChange: (e) => handleFieldChange('operation', e.target.value),
    },
  ];

  const handles = [
    { id: 'inputValue', type: 'target', position: Position.Left },
    { id: 'result', type: 'source', position: Position.Right },
  ];

  const body = (
    <div className="rounded-md p-2 text-green-700 text-center">
      <span className="font-mono text-xl">{String(result)}</span>
    </div>
  );

  return <BaseNode id={id} title="String Utilities" fields={fields} handles={handles} body={body} />;
};
