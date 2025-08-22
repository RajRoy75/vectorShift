// InputNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const InputNode = ({ id, data }) => {
  const name = data.name || '';
  const inputType = data.inputType || 'Text';

  const handleFieldChange = (field, value) => {
    if (data.onChange) {
      data.onChange(id, { ...data, [field]: value });
    }
  };

  const fields = [
    {
      name: 'name',
      label: 'Input Value',
      type: 'text',
      value: name,
      onChange: (e) => handleFieldChange('name', e.target.value),
    },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      value: inputType,
      onChange: (e) => handleFieldChange('inputType', e.target.value),
      options: ['Number', 'Text', 'File'],
    },
  ]

  const handles = [
    { id: 'name', type: 'source', position: Position.Right },
  ]

  return (
    <BaseNode
      id={id}
      title="Input"
      fields={fields}
      handles={handles}
    />
  );
};
