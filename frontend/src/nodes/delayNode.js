import { useEffect, useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const DelayNode = ({ id, data }) => {
  const inputValue = data.inputValue;
  const delay = data.delay ?? 1000;

  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer;
    if (inputValue !== undefined) {
      setCountdown(delay / 1000);

      timer = setTimeout(() => {
        setCountdown(0);
        if (data.onChange) {
          data.onChange(id, { ...data, result: inputValue });
        }
      }, delay);
    }

    return () => clearTimeout(timer);

  }, [inputValue, delay, data.onChange, id]);

  const handleFieldChange = (field, value) => {
    if (data.onChange) {
      data.onChange(id, { ...data, [field]: value });
    }
  };

  const fields = [
    {
      name: 'delay',
      label: 'Delay (ms)',
      type: 'text',
      value: delay,
      onChange: (e) => handleFieldChange('delay', e.target.value),
    },
  ];

  const handles = [
    { id: 'inputValue', type: 'target', position: Position.Left },
    { id: 'result', type: 'source', position: Position.Right },
  ];

  const body = (
    <div className="text-center p-2">
      {countdown > 0
        ? <span className="text-green-700 font-mono">Waiting ({countdown.toFixed(1)}s)...</span>
        : <span className="text-black">Ready</span>
      }
    </div>
  );

  return <BaseNode id={id} title="Delay" fields={fields} handles={handles} body={body} />;
};
