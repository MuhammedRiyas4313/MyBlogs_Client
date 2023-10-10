const Button = ({ title, onClick }) => (
    <button onClick={onClick} className="cursor-pointer items-end px-4 py-2 rounded-md bg-cyan-600 text-white">{title}</button>
);

export default Button;
