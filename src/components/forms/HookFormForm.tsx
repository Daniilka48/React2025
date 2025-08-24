import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addHookForm } from '../../store/formsSlice';
import type { AppDispatch } from '../../store/store';

interface Props {
  onClose: () => void;
}

interface HookFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptedTnC: boolean;
  country: string;
}

const HookFormForm = ({ onClose }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HookFormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: HookFormData) => {
    dispatch(addHookForm({ ...data, id: Date.now().toString() }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>React Hook Form</h2>

      <label>
        Name:
        <input {...register('name')} />
      </label>

      <label>
        Age:
        <input type="number" {...register('age')} />
      </label>

      <label>
        Email:
        <input type="email" {...register('email')} />
      </label>

      <label>
        Password:
        <input type="password" {...register('password')} />
      </label>

      <label>
        Confirm Password:
        <input type="password" {...register('confirmPassword')} />
      </label>

      <label>
        Gender:
        <select {...register('gender')}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Country:
        <input {...register('country')} />
      </label>

      <label>
        <input type="checkbox" {...register('acceptedTnC')} /> Accept Terms &
        Conditions
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default HookFormForm;
