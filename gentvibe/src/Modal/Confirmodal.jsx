import React from 'react'

const Confirmodal = ({title,message,confirmText,cancelText,confirmDelete,cancelDelete}) => {
  return (
   
      <div className="fixed inset-0 bg-opacity-40 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 mb-6">
           {message}
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              {confirmText}
            </button>
            <button
              onClick={cancelDelete}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              {cancelText}
            </button>
          </div>
        </div>
      </div>
   
  )
}

export default Confirmodal