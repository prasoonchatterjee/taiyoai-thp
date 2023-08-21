import { useSelector, useDispatch } from 'react-redux';
import {
  Contact,
  RootStateType,
  editContact,
  handlePageNo,
} from '../store/rootReducer';
import { FormEventHandler, useEffect, useState } from 'react';

const EditContactPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [status, setStatus] = useState('');
  const [selectedContact, setSelectedContact] = useState<Contact>();

  const rootState: RootStateType = useSelector((state: any) => state.rootState);
  const allContacts = rootState.allContacts;
  const editContactId = rootState.editContactId;
  const dispatch = useDispatch();
  useEffect(() => {
    const selectedContact = allContacts.find(
      (contact) => contact.id === editContactId
    );
    if (selectedContact) {
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setStatus(selectedContact.status);
      setSelectedContact(selectedContact);
    }
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (selectedContact) {
      dispatch(
        editContact({
          id: selectedContact.id,
          firstName: firstName,
          lastName: lastName,
          status: status,
        })
      );
      dispatch(handlePageNo(1));
    }
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
          <p className='m-auto my-4'>Edit Contact Screen</p>
          <div className='flex flex-col bg-white m-auto border border-black rounded p-2 w-3/5'>
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
                    name='status'
                    required
                    value='active'
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status === 'active'}
                  />{' '}
                  Active
                </label>
                <label className='p-1'>
                  <input
                    type='radio'
                    name='status'
                    required
                    value='inactive'
                    onChange={(e) => setStatus(e.target.value)}
                    checked={status === 'inactive'}
                  />{' '}
                  Inactive
                </label>
              </div>
            </div>
          </div>
          <button
            className='bg-neutral-400 border border-black rounded p-1 m-auto my-2 w-40'
            type='submit'
          >
            Save Edited Contact
          </button>
        </form>
      </main>
    </div>
  );
};

export default EditContactPage;
