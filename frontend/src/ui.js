// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap, BackgroundVariant } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { MathNode } from './nodes/mathNode';
import { ConditionNode } from './nodes/conditionNode';
import { StringUtilsNode } from './nodes/stringUtilsNode';
import { DelayNode } from './nodes/delayNode';
import { DataSwitchNode } from './nodes/dataSwitchNode';

import 'reactflow/dist/style.css';
import './index.css';

const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  math: MathNode,
  condition: ConditionNode,
  stringUtils: StringUtilsNode,
  delay: DelayNode,
  dataSwitch: DataSwitchNode,
};

const defaultEdgeOptions = {
  style: { strokeWidth: 3, stroke: '#000000' },
  type: 'smoothstep',
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  updateNodeData: state.updateNodeData,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect,
    updateNodeData
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;

        if (typeof type === 'undefined' || !type) {
          return;
        }

        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };

        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const nodesWithDataHandlers = nodes.map((node) => {
    if (node.type === 'customInput' || node.type === 'math' || node.type === 'condition' || node.type === 'stringUtils' || node.type === 'delay' || node.type === 'dataSwitch' || node.type === 'text') {
      return {
        ...node,
        data: {
          ...node.data,
          onChange: updateNodeData,
        },
      };
    }
    return node;
  });

  return (
    <div className="p-4 bg-comic-primary">
      <div className="relative border-2 border-comic-text shadow-[4px_4px_0px_rgba(0,0,0,0.75)]">
        <div ref={reactFlowWrapper} style={{ height: '75vh' }}>
          <ReactFlow
            nodes={nodesWithDataHandlers}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            nodeTypes={nodeTypes}
            proOptions={proOptions}
            defaultEdgeOptions={defaultEdgeOptions}
            className="comic-flow-canvas"
          >
            <Controls className="comic-controls" />
            <MiniMap
              className="comic-minimap"
              nodeColor="#ff3d3d"
              pannable
              zoomable
            />
          </ReactFlow>
        </div>
      </div>
    </div>
  )
}
