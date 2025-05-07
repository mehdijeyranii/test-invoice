interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

export const Input: React.FC<InputProps> = ({ id, ...props }) => {
  return (
    <input
      id={id}
      className="w-full px-4 py-2 border border-neutral-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      {...props}
    />
  );
};
