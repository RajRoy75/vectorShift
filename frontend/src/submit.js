import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector);

  const handleSubmit = async () => {
    const payload = {
      nodes: nodes,
      edges: edges,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();

      const dagMessage = result.is_dag
        ? "The pipeline is a valid DAG (Directed Acyclic Graph)."
        : "Warning: The pipeline has a cycle and is NOT a valid DAG.";

      const alertMessage = `
        Pipeline Analysis Complete!
        ---------------------------------
        Number of Nodes: ${result.num_nodes}
        Number of Edges: ${result.num_edges}
        ---------------------------------
        ${dagMessage}
      `;

      alert(alertMessage);

    } catch (error) {
      console.error("Failed to submit pipeline:", error);
      alert(`An error occurred while submitting the pipeline: ${error.message}`);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <button
        onClick={handleSubmit}
        type="button"
        className="
          px-5 py-2 text-2xl font-bold text-white 
          bg-red-500 border-2 border-black rounded-lg 
          shadow-[5px_5px_0px_#000] cursor-pointer 
          transition-all duration-300 ease-in-out
          hover:bg-white hover:text-red-500 hover:border-red-500 hover:shadow-[5px_5px_0px_#ef4444]
          active:bg-yellow-300 active:shadow-none active:translate-y-1
        "
      >
        Submit
      </button>
    </div>
  );
};
