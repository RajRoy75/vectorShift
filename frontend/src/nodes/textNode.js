// textNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');

  const fields = [
    { name: 'text', label: 'Text', type: 'text', value: currText, onChange: (e) => setCurrText(e.target.value) },
  ]
  const handles = [
    { id: 'output', type: 'source', position: Position.Right },
  ]
  return (
    <BaseNode
      id={id}
      title="Text"
      fields={fields}
      handles={handles}
    />
  );
}
