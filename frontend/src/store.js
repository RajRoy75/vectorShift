// store.js

import { create } from "zustand";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from 'reactflow';

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  getNodeID: (type) => {
    const newIDs = { ...get().nodeIDs };
    if (newIDs[type] === undefined) {
      newIDs[type] = 0;
    }
    newIDs[type] += 1;
    set({ nodeIDs: newIDs });
    return `${type}-${newIDs[type]}`;
  },
  addNode: (node) => {
    set({
      nodes: [...get().nodes, node]
    });
  },
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep', animated: true, markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' } }, get().edges),
    });
    console.log("a connection was made", connection);
  },

  updateNodeData: (nodeId, newData) => {
    const { edges } = get();

    set((state) => ({
      nodes: state.nodes.map((node) => {
        if (node.id === nodeId) {
          node.data = { ...node.data, ...newData };
        }

        const connectedEdge = edges.find(
          (edge) => edge.source === nodeId && edge.target === node.id
        );

        if (connectedEdge) {
          const valueToPropagate = newData[connectedEdge.sourceHandle];

          node.data = {
            ...node.data,
            [connectedEdge.targetHandle]: valueToPropagate,
          };
        }

        return node;
      }),
    }));
  },
}));
