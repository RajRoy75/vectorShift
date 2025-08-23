// baseNode.js
import { Handle } from 'reactflow';

export const BaseNode = ({ id: nodeId, title, fields = [], handles = [], body }) => {
  return (
    <div className="relative min-w-[16rem] max-w-xs transform -rotate-1">
      <div className="absolute top-1 left-1 right-[-4px] bottom-[-4px] bg-comic-shadow-color z-0"></div>

      <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-comic-accent border-2 border-comic-text z-10"></div>

      <div
        className="relative bg-comic-primary z-20 p-3"
        style={{
          clipPath: 'polygon(0% 5%, 2% 0%, 98% 0%, 100% 5%, 100% 95%, 98% 100%, 2% 100%, 0% 95%)',
        }}
      >
        <div
          className="absolute inset-0 z-0 opacity-20 mix-blend-multiply"
          style={{
            backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.4) 0.1em, transparent 0.1em)',
            backgroundSize: '0.4em 0.4em',
          }}
        ></div>

        <div className="relative z-10">
          <div
            className="text-lg font-black uppercase text-comic-text mb-3 border-b-2 border-comic-text pb-1"
            style={{ textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff' }}
          >
            {title}
          </div>

          {body && (
            <div className="mb-3 text-sm bg-comic-panel/80 text-comic-text p-2 font-semibold">
              {body}
            </div>
          )}

          {/* Render fields dynamically */}
          <div className="space-y-3">
            {fields.map((field) => (
              <div key={field.name}>
                {field.type === 'text' && (
                  <textarea
                    placeholder={field.label}
                    value={field.value}
                    onChange={field.onChange}
                    rows={1}
                    className="w-full resize-none overflow-hidden rounded-none border-2 border-comic-text bg-comic-panel text-comic-text placeholder-gray-600 p-2 outline-none focus:border-comic-secondary"
                    onInput={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                )}
                {field.type === 'select' && (
                  <div className="relative">
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className="w-full appearance-none rounded-none border-2 border-comic-text bg-comic-panel text-comic-text p-2 outline-none focus:border-comic-secondary"
                    >
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-comic-panel font-semibold text-comic-text">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-comic-text">
                      <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render handles dynamically with comic styling */}
      {handles.map((h, index) => (
        <Handle
          key={`${nodeId}-${h.id}-${index}`}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            ...h.style,
            background: '#ffef00',
            border: '2px solid #000000',
            width: 14,
            height: 14,
            zIndex: 30,
          }}
        />
      ))}
    </div>
  );
};
