import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen flex flex-col bg-[#f2e8c9]">

      <PipelineToolbar />
      <div className="flex-1 min-h-0">
        <PipelineUI />
      </div>

      <SubmitButton />

    </div>
  );
}

export default App;
