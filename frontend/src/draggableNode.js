// draggableNode.js

// export const DraggableNode = ({ type, label }) => {
//     const onDragStart = (event, nodeType) => {
//       const appData = { nodeType }
//       event.target.style.cursor = 'grabbing';
//       event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
//       event.dataTransfer.effectAllowed = 'move';
//     };
//
//     return (
//       <div
//         className={type}
//         onDragStart={(event) => onDragStart(event, type)}
//         onDragEnd={(event) => (event.target.style.cursor = 'grab')}
//         style={{ 
//           cursor: 'grab', 
//           minWidth: '80px', 
//           height: '60px',
//           display: 'flex', 
//           alignItems: 'center', 
//           borderRadius: '8px',
//           backgroundColor: '#1C2536',
//           justifyContent: 'center', 
//           flexDirection: 'column'
//         }} 
//         draggable
//       >
//           <span style={{ color: '#fff' }}>{label}</span>
//       </div>
//     );
//   };
//


// draggableNode.js

export const DraggableNode = ({ type, label }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.currentTarget.style.cursor = "grabbing";
    event.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(appData)
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div
      className={`group ${type} 
        min-w-[120px] min-h-[70px] px-4 py-3 
        flex flex-col items-center justify-center 
        rounded-xl font-semibold text-sm text-white 
        bg-gradient-to-br from-purple-600 to-purple-800 
        shadow-md shadow-purple-500/30 cursor-grab 
        transition-transform duration-200 ease-in-out`}
      draggable
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.currentTarget.style.cursor = "grab")}
    >
      <span className="group-hover:scale-105 group-hover:drop-shadow-lg transition-transform duration-200">
        {label}
      </span>
    </div>
  );
};

