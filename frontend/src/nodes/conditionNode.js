// ConditionNode.js (Corrected and Final)

import { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const ConditionNode = ({ id, data }) => {
  const inputValue = data.inputValue;
  const comparisonValue = data.comparisonValue ?? '10';
  const operator = data.operator || '>';

  useEffect(() => {
    let conditionMet = false;
    const numInput = Number(inputValue);
    const numCompare = Number(comparisonValue);

    switch (operator) {
      case '>': conditionMet = numInput > numCompare; break;
      case '<': conditionMet = numInput < numCompare; break;
      case '==': conditionMet = numInput == numCompare; break;
      default: break;
    }
    if (data.onChange) {
      data.onChange(id, {
        ...data,
        onTrue: conditionMet ? inputValue : undefined,
        onFalse: !conditionMet ? inputValue : undefined,
      });
    }
  }, [inputValue, comparisonValue, operator]);

  const handleFieldChange = (field, value) => {
    if (data.onChange) {
      data.onChange(id, { ...data, [field]: value });
    }
  };

  const fields = [
    {
      name: 'operator',
      label: 'Condition',
      type: 'select',
      value: operator,
      options: ['>', '<', '=='],
      onChange: (e) => handleFieldChange('operator', e.target.value),
    },
    {
      name: 'comparisonValue',
      label: 'Comparison Value',
      type: 'text',
      value: comparisonValue,
      onChange: (e) => handleFieldChange('comparisonValue', e.target.value),
    }
  ];

  const handles = [
    { id: 'inputValue', type: 'target', position: Position.Left },
    { id: 'onTrue', type: 'source', position: Position.Right, style: { top: '30%' } },
    { id: 'onFalse', type: 'source', position: Position.Right, style: { top: '70%' } },
  ];

  const body = (
    <div className="text-center text-xs text-gray-400 p-1">
      <span>If Input {operator} {comparisonValue}</span>
    </div>
  );

  return <BaseNode id={id} title="Condition (Gate)" fields={fields} handles={handles} body={body} />;
};
