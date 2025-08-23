// SubmitButton.js
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
    <div className="flex items-center justify-center p-4">
      <button
        onClick={handleSubmit}
        type="button"
        className="
          relative p-0 font-sans bg-none border-none cursor-pointer group
          transition-transform duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          transform -rotate-2 origin-center 
          hover:rotate-[-1deg] hover:scale-105 
          active:rotate-0 active:scale-95
        "
      >
        <div
          className="
            relative flex items-center justify-center z-[3] overflow-hidden
            bg-comic-secondary text-comic-text py-3 px-8 
            transition-transform duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
            transform-[skew(-3deg,1deg)] 
            group-hover:bg-comic-primary group-hover:transform-[skew(-5deg,2deg)]
            group-active:transform-[skew(0,0)]
          "
          style={{ clipPath: 'polygon(0% 10%, 3% 0%, 97% 0%, 100% 10%, 100% 90%, 97% 100%, 3% 100%, 0% 90%)' }}
        >
          <div
            className="absolute inset-0 z-[2] opacity-30 mix-blend-multiply"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.2) 0.1em, transparent 0.1em)',
              backgroundSize: '0.5em 0.5em',
            }}
          ></div>

          <span
            className="
              relative z-[5] text-xl font-black tracking-wider uppercase rotate-2
              text-comic-panel group-active:animate-burst
            "
            style={{ textShadow: '2px 2px 0 #000' }}
          >
            Submit!
          </span>
        </div>

        <div
          className="
            absolute top-[0.4em] left-[0.4em] right-[-0.4em] bottom-[-0.4em] z-0
            bg-comic-shadow-color transition-all duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
            group-hover:translate-x-[0.2em] group-hover:translate-y-[0.2em]
            group-active:translate-x-[0.1em] group-active:translate-y-[0.1em]
          "
        ></div>

        <div
          className="
            absolute top-[-0.3em] left-[-0.3em] right-[-0.3em] bottom-[-0.3em] z-[1]
            bg-comic-accent border-[0.15em] border-comic-text 
            transition-transform duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          "
        ></div>
      </button>
    </div>
  );
};
