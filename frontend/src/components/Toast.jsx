const Toast = ({ message, show }) => {
  if (!show) return null;

  return (
    <div
      className="
        fixed z-50
        bottom-6
        left-1/2 -translate-x-1/2
        md:left-auto md:right-6 md:translate-x-0
        w-[90%] md:w-auto
      "
    >
      <div className="bg-slate-900 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 animate-slideUp">
        <span className="text-green-400 text-lg">✔</span>
        <span className="text-sm text-center">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
