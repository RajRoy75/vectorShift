// toolbar.js
import { DraggableNode } from './draggableNode';

const toolNodes = [
  { type: 'customInput', label: 'Input' },
  { type: 'llm', label: 'LLM' },
  { type: 'customOutput', label: 'Output' },
  { type: 'text', label: 'Text' },
  { type: 'math', label: 'Math' },
  { type: 'condition', label: 'Condition' },
  { type: 'stringUtils', label: 'String' },
  { type: 'delay', label: 'Delay' },
  { type: 'dataSwitch', label: 'Switch' },
];

export const PipelineToolbar = () => {
  return (
    <div className="p-2">
      <div className="relative">
        <div className="absolute top-1 left-1 right-[-4px] bottom-[-4px] bg-comic-shadow-color z-0"></div>

        <div className="absolute -top-1.5 -left-1.5 -right-1.5 -bottom-1.5 bg-comic-accent border-2 border-comic-text z-10"></div>

        <div className="relative bg-comic-panel z-20 p-2">
          <div
            className="absolute inset-0 z-0 opacity-10 mix-blend-multiply"
            style={{
              backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.4) 0.1em, transparent 0.1em)',
              backgroundSize: '0.4em 0.4em',
            }}
          ></div>

          <div className="relative z-10">

            <div className="mb-4 flex justify-center">
              <div className="bg-comic-accent border-2 border-comic-text transform -rotate-2 w-fit">
                <h3
                  className="text-xl text-center font-black uppercase text-comic-text py-1 px-4"
                  style={{ textShadow: '2px 2px 0 #FFF' }}
                >
                  Toolbox
                </h3>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-2 gap-y-4 justify-center">
              {toolNodes.map((node) => (
                <DraggableNode key={node.type} type={node.type} label={node.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
