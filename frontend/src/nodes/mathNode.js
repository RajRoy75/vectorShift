// MathNode.js
import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const MathNode = ({ id, data }) => {
  const num1 = data.num1 || 0;
  const num2 = data.num2 || 0;
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const result = Number(num1) + Number(num2);
    setSum(result);
    if (data.onChange) {
      data.onChange(id, { ...data, sum: result });
    }
  }, [num1, num2]);

  const handles = [
    { id: 'num1', type: 'target', position: Position.Left, style: { top: 80 } },
    { id: 'num2', type: 'target', position: Position.Left, style: { top: 130 } },
    { id: 'sum', type: 'source', position: Position.Right, style: { top: 105 } },
  ];

  const body = (
    <div className="text-right font-mono text-lg pr-2 space-y-2">
      <div className="text-black text-sm">Input A: {num1}</div>
      <div className="text-black text-sm">Input B: {num2}</div>
      <div className="text-green-700 font-bold border-t border-purple-600 pt-1">
        Sum: {sum}
      </div>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Math Adder"
      fields={[]}
      handles={handles}
      body={body}
    />
  );
};
