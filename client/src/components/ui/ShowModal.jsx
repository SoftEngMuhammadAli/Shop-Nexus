export const Modal = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[400px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <img
          src={product.image || product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md my-3"
        />
        <p className="text-gray-600">{product.description}</p>
        <p className="text-lg font-semibold mt-3">${product.price}</p>
      </div>
    </div>
  );
};
