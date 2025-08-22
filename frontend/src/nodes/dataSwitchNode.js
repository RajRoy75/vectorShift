import { useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

const INPUT_OPTIONS = ['input0', 'input1', 'input2'];

export const DataSwitchNode = ({ id, data }) => {
  const { selector, input0, input1, input2, onChange } = data;

  const currentSelector = selector ?? 0;

  useEffect(() => {
    const inputs = [input0, input1, input2];
    const result = inputs[currentSelector];

    if (onChange) {
      onChange(id, { ...data, result: result });
    }
  }, [currentSelector, input0, input1, input2, onChange]);

  const handles = [
    { id: 'selector', type: 'target', position: Position.Left, style: { top: '20%' } },
    ...INPUT_OPTIONS.map((key, index) => ({
      id: key,
      type: 'target',
      position: Position.Left,
      style: { top: `${45 + index * 15}%` },
    })),
    { id: 'result', type: 'source', position: Position.Right },
  ];

  const body = (
    <div className="p-2 space-y-1 text-xs">
      <div className="text-gray-300">
        Selecting input: <span className="font-mono text-white">{currentSelector}</span>
      </div>
      <div className="border-t border-purple-600 my-1"></div>
      {INPUT_OPTIONS.map((key, index) => (
        <div
          key={key}
          className={`flex justify-between items-center ${Number(currentSelector) === index ? 'text-green-300 font-bold' : 'text-gray-400'}`}
        >
          <span>Input {index}</span>
          <span>&rarr;</span>
        </div>
      ))}
    </div>
  );

  return <BaseNode id={id} title="Data Switch" handles={handles} body={body} />;
};
