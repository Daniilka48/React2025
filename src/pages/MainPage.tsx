import { useState } from 'react';
import SharedModal from '../components/modals/SharedModal';
import UncontrolledForm from '../components/forms/UncontrolledForm';
import HookFormForm from '../components/forms/HookFormForm';

const MainPage = () => {
  const [openUncontrolled, setOpenUncontrolled] = useState(false);
  const [openHookForm, setOpenHookForm] = useState(false);

  return (
    <div>
      <h1>React Forms App</h1>
      <button onClick={() => setOpenUncontrolled(true)}>
        Open Uncontrolled Form
      </button>
      <button onClick={() => setOpenHookForm(true)}>
        Open React Hook Form
      </button>

      <SharedModal
        isOpen={openUncontrolled}
        onClose={() => setOpenUncontrolled(false)}
      >
        <UncontrolledForm onClose={() => setOpenUncontrolled(false)} />
      </SharedModal>

      <SharedModal isOpen={openHookForm} onClose={() => setOpenHookForm(false)}>
        <HookFormForm onClose={() => setOpenHookForm(false)} />
      </SharedModal>
    </div>
  );
};

export default MainPage;
