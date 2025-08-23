// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className="flex items-center justify-center p-4 group"
      draggable
      onDragStart={(event) => onDragStart(event, type)}
    >
      <div
        className="
          relative font-sans border-none bg-none p-0 cursor-grab
          transition-transform duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
          -rotate-2 origin-center 
          hover:rotate-[-1deg] hover:scale-105 
          active:rotate-0 active:scale-95 active:cursor-grabbing
        "
      >
        <div
          className="
            relative flex items-center justify-center z-[3] overflow-hidden
            bg-comic-primary text-comic-text py-3 px-6 
            transition-transform duration-150 ease-[cubic-bezier(0.22,0.61,0.36,1)]
            transform-[skew(-3deg,1deg)] 
            group-hover:bg-comic-secondary group-hover:transform-[skew(-5deg,2deg)]
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

          <div
            className="absolute inset-0 z-[1] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 20%, transparent 50%), radial-gradient(circle at 70% 65%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.08) 25%, transparent 50%)',
            }}
          ></div>

          <span
            className="
              relative z-[5] text-lg font-black tracking-wider uppercase rotate-2
              text-comic-text group-hover:text-comic-panel group-active:animate-burst
            "
            style={{
              textShadow: '0.05em 0.05em 0 var(--panel-color), -0.05em -0.05em 0 var(--panel-color), 0.05em -0.05em 0 var(--panel-color), -0.05em 0.05em 0 var(--panel-color)'.replace(/var\(--panel-color\)/g, '#ffffff'),
            }}
          >
            {label}
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

        <div
          className="
            absolute -inset-4 z-[6] mix-blend-overlay pointer-events-none 
            opacity-0 group-active:animate-action-lines
          "
          style={{
            backgroundImage: 'radial-gradient(#000 0%, transparent 70%), repeating-conic-gradient(transparent 0%, transparent 5%, #000 5%, #000 6%)'
          }}
        ></div>
      </div>
    </div>
  );
};
