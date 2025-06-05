import toast from 'react-hot-toast';
export const notify = async (message, type) => {
  toast(`${message}`, {
    type: `${type}`,
    position: 'top-right',
    borderRadius: '2px',
    autoClose: 4000,
    fontSize: '10px',
  });
};
