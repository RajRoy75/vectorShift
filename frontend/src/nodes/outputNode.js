
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const OutputNode = ({ id, data }) => {
  const receivedValue = data.value;

  let displayValue = '...';
  if (receivedValue !== undefined) {
    if (typeof receivedValue === 'object' && receivedValue !== null) {
      displayValue = JSON.stringify(receivedValue, null, 2);
    } else {
      displayValue = String(receivedValue);
    }
  }

  const handles = [
    { id: 'value', type: 'target', position: Position.Left },
  ];

  const body = (
    <div className="nodrag nowheel w-full rounded-md p-2 text-black">
      <pre className="text-lg whitespace-pre-wrap break-all">
        {displayValue}
      </pre>
    </div>
  );

  return (
    <BaseNode
      id={id}
      title="Output"
      handles={handles}
      body={body}
    />
  );
};
