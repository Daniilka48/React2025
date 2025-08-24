import { useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import SharedModal from '../components/modals/SharedModal';
import UncontrolledForm from '../components/forms/UncontrolledForm';
import HookFormForm from '../components/forms/HookFormForm';
import '../pagesCss/MainPage.css';

const MainPage = () => {
  const [openUncontrolled, setOpenUncontrolled] = useState(false);
  const [openHookForm, setOpenHookForm] = useState(false);

  const uncontrolledData = useSelector(
    (state: RootState) => state.forms.uncontrolled
  );
  const hookFormData = useSelector((state: RootState) => state.forms.hookForm);

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

      <h2>Uncontrolled Forms Data</h2>
      <div>
        {uncontrolledData.map((item) => (
          <div key={item.id} className="card">
            <p>
              {item.name} - {item.email}
            </p>
            {item.picture && <img src={item.picture} alt={item.name} />}
          </div>
        ))}
      </div>

      <h2>Hook Form Data</h2>
      <div>
        {hookFormData.map((item) => (
          <div key={item.id} className="card">
            <p>
              {item.name} - {item.email}
            </p>
            {item.picture && <img src={item.picture} alt={item.name} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
