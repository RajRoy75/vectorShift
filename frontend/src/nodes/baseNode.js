// baseNode.js
import { Handle } from 'reactflow';

export const BaseNode = ({ id, title, fields = [], handles = [], body }) => {
  return (
    <div className="w-56 min-h-24 rounded-2xl bg-gradient-to-r from-purple-800 to-purple-900 text-white shadow-lg p-3">
      {/* Title */}
      <div className="text-base font-semibold mb-3 border-b border-purple-600 pb-1">
        {title}
      </div>

      {/* Optional body */}
      {body && (
        <div className="mb-2 text-sm text-gray-200">{body}</div>
      )}

      {/* Render fields dynamically */}
      <div className="space-y-2">
        {fields.map((field) => (
          <div key={field.name}>
            {field.type === 'text' && (
              <textarea
                placeholder={field.label}
                value={field.value}
                onChange={field.onChange}
                rows={1}
                className="w-full resize-none overflow-hidden rounded-md bg-purple-700 text-white placeholder-gray-300 px-2 py-1 outline-none focus:ring-2 focus:ring-purple-400"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
              />
            )}
            {field.type === 'select' && (
              <select
                value={field.value}
                onChange={field.onChange}
                className="w-full rounded-md bg-purple-700 text-white px-2 py-1 outline-none focus:ring-2 focus:ring-purple-400"
              >
                {field.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-purple-800">
                    {opt}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Render handles dynamically */}
      {handles.map((h) => (
        <Handle
          key={h.id}
          type={h.type}
          position={h.position}
          id={h.id}
          style={{
            ...h.style,
            background: 'white',
            border: '2px solid #9333ea',
            width: 12,
            height: 12,
            left: h.position === 'left' ? -6 : undefined,
            right: h.position === 'right' ? -6 : undefined,
          }}
        />
      ))}
    </div>
  );
};


