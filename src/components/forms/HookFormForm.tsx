import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { formSchema } from '../../validation/formSchema';
import type { FormSchemaType } from '../../validation/formSchema';
import { v4 as uuidv4 } from 'uuid';
import type { FormData as ReduxFormData } from '../../store/formsSlice';
import { addHookForm } from '../../store/formsSlice';

interface Props {
  onClose: () => void;
}

const HookFormForm = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormSchemaType>({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormSchemaType) => {
    const newData: ReduxFormData = {
      id: uuidv4(),
      ...data,
    };
    dispatch(addHookForm(newData));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Hook Form + Yup</h2>

      <label>
        Name:
        <input {...register('name')} />
        <p>{errors.name?.message}</p>
      </label>

      <label>
        Age:
        <input type="number" {...register('age')} />
        <p>{errors.age?.message}</p>
      </label>

      <label>
        Email:
        <input type="email" {...register('email')} />
        <p>{errors.email?.message}</p>
      </label>

      <label>
        Password:
        <input type="password" {...register('password')} />
        <p>{errors.password?.message}</p>
      </label>

      <label>
        Confirm Password:
        <input type="password" {...register('confirmPassword')} />
        <p>{errors.confirmPassword?.message}</p>
      </label>

      <label>
        Gender:
        <select {...register('gender')}>
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <p>{errors.gender?.message}</p>
      </label>

      <label>
        Country:
        <input type="text" {...register('country')} />
        <p>{errors.country?.message}</p>
      </label>

      <label>
        <input type="checkbox" {...register('acceptedTnC')} /> Accept T&C
        <p>{errors.acceptedTnC?.message}</p>
      </label>

      <label>
        Picture:
        <input type="file" accept="image/*" {...register('image')} />
        <p>{errors.image?.message as string}</p>
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default HookFormForm;
