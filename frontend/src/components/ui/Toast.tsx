type ToastProps = {
  message: string;
};

function Toast({ message }: ToastProps) {
  return (
    <div className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
      ✅ {message}
    </div>
  );
}

export default Toast;