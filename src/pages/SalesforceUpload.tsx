import React, { useState } from 'react';
import { BACKEND_URL } from '../config';

import axios from 'axios';
import { useVerifyToken } from '../hooks';


// interface FileUploadProps {
//   backendUrl: string; // The base URL for the backend API
// }

interface FileUploadState {
  selectedFile: File | null;
  isUploading: boolean;
  uploadProgress: number;
  uploadError: string | null;
}

const FileUpload = ( ) => {
  useVerifyToken()
  const [state, setState] = useState<FileUploadState>({
    selectedFile: null,
    isUploading: false,
    uploadProgress: 0,
    uploadError: null,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setState({
        ...state,
        selectedFile: event.target.files[0],
        uploadError: null,
      });
    }
  };

  const handleUpload = async () => {
    if (!state.selectedFile) {
      setState({ ...state, uploadError: 'Please select a file to upload.' });
      return;
    }

    const formData = new FormData();
    formData.append('file', state.selectedFile);

    try {
      setState({ ...state, isUploading: true, uploadProgress: 0, uploadError: null });

      const token = localStorage.getItem('token');

      const response = await axios.post(`${BACKEND_URL}/api/v1/salesforce/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'File-Type': state.selectedFile.type, // Include the file's MIME type
          Authorization: `Bearer ${token}`, // Authorization header with Bearer token
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setState({ ...state, uploadProgress: progress });
          } else {
            // Handle the case where `total` is undefined, if needed
            console.warn('Total size is unknown');
          }
        },
      });

      console.log('File uploaded successfully:', response.data);
      setState({ ...state, isUploading: false, selectedFile: null, uploadProgress: 0 });
    } catch (error) {
      console.error('Error uploading file:', error);
      setState({ ...state, isUploading: false, uploadError: 'File upload failed.' });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {state.selectedFile && (
        <div className="mb-4">
          <p className="text-gray-700">Selected file: {state.selectedFile.name}</p>
          <p className="text-gray-500 text-sm">Size: {(state.selectedFile.size / 1024).toFixed(2)} KB</p>
        </div>
      )}

      {state.uploadError && (
        <div className="mb-4 text-red-500">
          <p>{state.uploadError}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={state.isUploading}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-300"
      >
        {state.isUploading ? `Uploading (${state.uploadProgress}%)...` : 'Upload File'}
      </button>

      {state.isUploading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${state.uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;