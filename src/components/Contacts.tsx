import { useDispatch, useSelector } from 'react-redux';
import {
  Contact,
  RootStateType,
  deleteContact,
  handleEditContactId,
  handlePageNo,
} from '../store/rootReducer';

const Contacts = () => {
  const rootState: RootStateType = useSelector((state: any) => state.rootState);
  const allContacts = rootState.allContacts;
  const dispatch = useDispatch();
  const handleEdit = (contact: Contact) => {
    dispatch(handleEditContactId(contact.id));
    dispatch(handlePageNo(3));
  };
  const handleDelete = (contact: Contact) => {
    dispatch(deleteContact(contact.id));
  };
  const renderAllContacts = () => {
    if (!allContacts.length)
      return (
        <p className='m-auto bg-neutral-200 p-2 m-2'>
          No contact found. Please add contact from create contact button
        </p>
      );
    return allContacts.map((contact: Contact) => (
      <div
        className='bg-neutral-200 flex flex-col basis-1/4 p-4 m-1 rounded'
        key={contact.id}
      >
        <p>First Name: {contact.firstName}</p>
        <p>Last Name: {contact.lastName}</p>
        <p>Status: {contact.status}</p>
        <div className='flex justify-around'>
          <button
            className='bg-green-500 rounded p-1 w-16'
            onClick={() => handleEdit(contact)}
          >
            Edit
          </button>
          <button
            className='bg-red-400 p-1 rounded w-16'
            onClick={() => handleDelete(contact)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };
  return (
    <div className='flex flex-col max-w-7xl m-auto border-4 border-blue-700'>
      <header className='bg-blue-700 text-white text-center p-2 font-bold'>
        Contact Page
      </header>
      <main className='flex flex-col lg:flex-row lg:flex-row sm:flex-row'>
        <aside className='border-2 border-black flex flex-col basis-1/5'>
          <a
            onClick={() => dispatch(handlePageNo(1))}
            className='border border-black border-x-0 border-y-0 p-1 hover:cursor-pointer'
          >
            Contact
          </a>
          <a
            onClick={() => dispatch(handlePageNo(4))}
            className='border border-y-2 border-black border-x-0 p-1 hover:cursor-pointer'
          >
            Charts and map
          </a>
        </aside>
        <div className='basis-4/5 flex flex-col '>
          <button
            className='bg-neutral-300 border border-black rounded p-1 m-auto mt-4'
            onClick={() => dispatch(handlePageNo(2))}
          >
            Create Contact
          </button>
          <div className='flex flex-wrap flex-col justify-around lg:flex-row mt-4'>{renderAllContacts()}</div>
        </div>
      </main>
    </div>
  );
};

export default Contacts;
