import { Bounce, toast } from 'react-toastify';

// export function showSuccess(message?: string) {
//   toast.success(message ?? 'Success !', {
//     position: 'top-right',
//     autoClose: 5000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: 'light',
//     transition: Bounce,
//   });
// }

export function showError(error: unknown) {
  toast.error((error as Error).message ?? 'Something went wrong !', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
}
