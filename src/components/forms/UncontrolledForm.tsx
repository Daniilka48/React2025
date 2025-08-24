import { useRef } from 'react';
import type { FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addUncontrolledForm } from '../../store/formsSlice';
import type { AppDispatch } from '../../store/store';

interface Props {
  onClose: () => void;
}

const UncontrolledForm = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const tncRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    dispatch(
      addUncontrolledForm({
        id: Date.now().toString(),
        name: nameRef.current?.value || '',
        age: Number(ageRef.current?.value) || 0,
        email: emailRef.current?.value || '',
        password: passwordRef.current?.value || '',
        gender: genderRef.current?.value || '',
        acceptedTnC: tncRef.current?.checked || false,
        country: countryRef.current?.value || '',
      })
    );

    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Uncontrolled Form</h2>
      <label>
        Name:
        <input ref={nameRef} type="text" />
      </label>
      <label>
        Age:
        <input ref={ageRef} type="number" />
      </label>
      <label>
        Email:
        <input ref={emailRef} type="email" />
      </label>
      <label>
        Password:
        <input ref={passwordRef} type="password" />
      </label>
      <label>
        Confirm Password:
        <input ref={confirmPasswordRef} type="password" />
      </label>
      <label>
        Gender:
        <select ref={genderRef}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
      <label>
        Country:
        <input ref={countryRef} type="text" />
      </label>
      <label>
        <input ref={tncRef} type="checkbox" /> Accept Terms & Conditions
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UncontrolledForm;
