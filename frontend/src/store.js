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

    set({
      nodes: get().nodes.map((node) => {
        // First, check if this is the node that triggered the change.
        // We must update it with the newData.
        if (node.id === nodeId) {
          node.data = { ...node.data, ...newData };
        }

        // Second, check if this node is the TARGET of an edge
        // coming FROM the node that triggered the change.
        const connectedEdge = edges.find(
          (edge) => edge.source === nodeId && edge.target === node.id
        );

        if (connectedEdge) {
          // Find the specific value that needs to be propagated.
          // For example, if the source handle is 'result', get newData.result.
          const valueToPropagate = newData[connectedEdge.sourceHandle];

          // Update the target node's data at the correct input handle.
          node.data = {
            ...node.data,
            [connectedEdge.targetHandle]: valueToPropagate,
          };
        }

        return node;
      }),
    });
  },
  // DELETE your old `updateNodeField` action and REPLACE it with this:
  // updateNodeData: (nodeId, newData) => {
  //   const { edges } = get();
  //
  //   set({
  //     nodes: get().nodes.map((node) => {
  //       // 1. Update the node that triggered the change
  //       if (node.id === nodeId) {
  //         // Return a new node object with the new data
  //         return { ...node, data: newData };
  //       }
  //
  //       // 2. Check for connected nodes and propagate the change
  //       const connectedEdge = edges.find(
  //         (edge) => edge.target === node.id && edge.source === nodeId
  //       );
  //
  //       if (connectedEdge) {
  //         // Find the specific value to pass along from the source handle
  //         const valueToPropagate = newData[connectedEdge.sourceHandle];
  //
  //         // Return a new node object with updated data for the target
  //         return {
  //           ...node,
  //           data: { ...node.data, [connectedEdge.targetHandle]: valueToPropagate },
  //         };
  //       }
  //
  //       return node;
  //     }),
  //   });
  // },
  // updateNodeField: (nodeId, fieldName, fieldValue) => {
  //   set({
  //     nodes: get().nodes.map((node) => {
  //       if (node.id === nodeId) {
  //         node.data = { ...node.data, [fieldName]: fieldValue };
  //       }
  //
  //       return node;
  //     }),
  //   });
  // },
}));
