// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const LLMNode = ({ id, data }) => {
  const handles = [
    { id: 'system', type: 'target', position: Position.Left, style: { top: '33%' } },
    { id: 'prompt', type: 'target', position: Position.Left, style: { top: '66%' } },
    { id: 'response', type: 'source', position: Position.Right },
  ]

  return (
    <BaseNode
      id={id}
      title="LLM"
      fields={[
      ]}
      handles={handles}
      body="This is a LLM model"
    />
  );
}
