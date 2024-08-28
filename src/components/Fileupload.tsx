// import axios from 'axios';
// import { useState } from 'react';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [uploadStatus, setUploadStatus] = useState('');

//   // Handle file selection
//   const handleFileChange = (e ) => {
//     setSelectedFile(e.target.files[0]);
//   };

//   // Handle form submission
//   // ignore ts errors

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedFile) {
//       setUploadStatus('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);

//     try {
//       const response = await axios.post('YOUR_BACKEND_API_ENDPOINT', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'File-Type': selectedFile.type, // Include the file's MIME type
//         },
//       });

//       if (response.status === 200) {
//         setUploadStatus('File uploaded successfully!');
//       } else {
//         setUploadStatus('Failed to upload file.');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus('An error occurred while uploading the file.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Upload File
//           </label>
//           <input
//             type="file"
//             onChange={handleFileChange}
//             className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
//         >
//           Upload
//         </button>
//       </form>
//       {uploadStatus && (
//         <p className="mt-4 text-center text-red-500">{uploadStatus}</p>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


const Fileupload = () => {
  return (
    <div>Fileupload</div>
  )
}

export default Fileupload