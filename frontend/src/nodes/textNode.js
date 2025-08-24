// textNode.js

import { useMemo, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

const VARIABLE_REGEX = /{{(\w+)}}/g;

export const TextNode = ({ id, data }) => {
  const { onChange, ...restOfData } = data;
  const text = restOfData.text ?? 'Hello, {{name}}!';

  const dynamicHandles = useMemo(() => {
    const matches = new Set(Array.from(text.matchAll(VARIABLE_REGEX), m => m[1]));

    return Array.from(matches).sort().map((variableName, index) => ({
      id: variableName,
      type: 'target',
      position: Position.Left,
      style: { top: `${50 + index * 25}%` },
      label: variableName,
    }));
  }, [text]);

  const relevantDataString = useMemo(() => {
    const relevantData = {};
    dynamicHandles.forEach(h => {
      if (restOfData[h.id] !== undefined) {
        relevantData[h.id] = restOfData[h.id];
      }
    });
    return JSON.stringify(relevantData);
  }, [restOfData, dynamicHandles]);

  useEffect(() => {
    let newResult = text;

    dynamicHandles.forEach(handle => {
      const variableName = handle.id;
      const value = restOfData[variableName];
      if (value !== undefined) {
        const regex = new RegExp(`{{${variableName}}}`, 'g');
        newResult = newResult.replace(regex, String(value));
      };
    });
    if (onChange) {
      if (restOfData.output !== newResult) {
        onChange(id, { ...restOfData, output: newResult });
      }
    }
  }, [text, relevantDataString, onChange, restOfData, dynamicHandles]);

  const handleTextChange = (e) => {
    if (onChange) {
      onChange(id, { ...restOfData, text: e.target.value });
    }
  };

  const fields = [
    { name: 'text', label: 'Text', type: 'text', value: text, onChange: handleTextChange },
  ];

  const handles = [
    { id: 'output', type: 'source', position: Position.Right },
    ...dynamicHandles,
  ];

  return (
    <BaseNode
      id={id}
      title="Text"
      fields={fields}
      handles={handles}
    />
  );
};
