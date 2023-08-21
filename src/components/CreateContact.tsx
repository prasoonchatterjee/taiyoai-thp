import { nanoid } from 'nanoid';
import { FormEventHandler, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handlePageNo, setNewContact } from '../store/rootReducer';

const CreateContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');

  const dispatch = useDispatch();
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const id = nanoid();
    const contact = {
      firstName,
      lastName,
      status,
      id,
    };
    dispatch(setNewContact(contact));
    dispatch(handlePageNo(1));
  };
  return (
    <div className='flex flex-col max-w-7xl border-4 border-blue-700 flex flex-col max-w-3xl m-auto'>
      <header className='bg-blue-700 text-white text-center p-2 font-bold'>
        Contact Page
      </header>
      <main className='flex flex-col lg:flex-row'>
        <aside className='border-2 border-black flex flex-col basis-1/5'>
          <a
            className='border border-black border-x-0 border-y-0 p-1 hover:cursor-pointer'
            onClick={() => dispatch(handlePageNo(1))}
          >
            Contact
          </a>
          <a
            className='border border-y-2 border-black border-x-0 p-1 hover:cursor-pointer'
            onClick={() => dispatch(handlePageNo(4))}
          >
            Charts and map
          </a>
        </aside>
        <form
          className='bg-neutral-100 basis-4/5 flex flex-col'
          onSubmit={handleSubmit}
        >
          <p className='m-auto my-4'>Create Contact Screen</p>
          <div className='flex flex-col bg-white m-auto border border-black rounded p-2 lg:w-3/5'>
            <label className='p-1 m-auto'>
              First Name:{' '}
              <input
                className='border border-black'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </label>
            <label className='p-1 m-auto'>
              Last Name:{'  '}
              <input
                className='border border-black'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
            <div className='flex m-auto'>
              <div className='p-1'>Status: </div>
              <div className='flex flex-col ml-8'>
                <label className='p-1'>
                  <input
                    type='radio'
                    value='active'
                    name='status'
                    required
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status === 'active'}
                  />{' '}
                  Active
                </label>
                <label className='p-1'>
                  <input
                    type='radio'
                    name='status'
                    value='inactive'
                    required
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status === 'inactive'}
                  />{' '}
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <button
            className='bg-neutral-400 border border-black rounded p-1 m-auto my-2 w-32'
            type='submit'
          >
            Save Contact
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateContactPage;
