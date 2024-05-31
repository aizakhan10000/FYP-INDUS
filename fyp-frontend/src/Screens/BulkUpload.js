import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImages } from '../actions/uploadActions';
import Sidebar from './Sidebar';
import '../css-files/Dashboard.css';

function UploadImages() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setSelectedFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  const handleRemoveFile = (fileName) => {
    setSelectedFiles(selectedFiles.filter(file => file.name !== fileName));
  };

  const handleReset = () => {
    setSelectedFiles([]);
    fileInputRef.current.value = "";  // Resetting the file input
  };

  const handleUpload = () => {
    dispatch(uploadImages(selectedFiles));
    setSelectedFiles([]);
    navigate("/result");
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 p-0">
          <Sidebar />
        </div>
        <div className="col-md-10">
          <div className="dashboard-container">
            <div className="bg-primary-soft-blue text-dark text-center py-3 fade-in">
              <h1>Bulk Image Upload</h1>
            </div>
            <div className="container-fluid pt-4 fade-in">
              <div className="row">
                <div className="col-md-6 offset-md-3">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Select Images to Upload</h5>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="form-control mb-3"
                        multiple
                        onChange={handleFileChange}
                      />
                      {selectedFiles.length > 0 ? (
                        <div>
                          <div>Total files selected: {selectedFiles.length}</div>
                          {selectedFiles.map(file => (
                            <div key={file.name} className="file-item">
                              {file.name}
                              <button className="btn button-danger remove-btn" onClick={() => handleRemoveFile(file.name)}>Remove</button>
                            </div>
                          ))}
                          <div className="mt-3">
                            <button className="btn button-danger" onClick={handleUpload}>Upload Images</button>
                            <button className="btn button-danger ml-2" onClick={handleReset}>Reset</button>
                          </div>
                        </div>
                      ) : (
                        <p>No file chosen</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImages;
