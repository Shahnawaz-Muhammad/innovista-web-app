import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfViewer = ({ filePath }) => {
    console.log(filePath)
  return (
    <div style={{ height: '500px' }}>
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@${window.pdfjs.version}/build/pdf.worker.min.js`}>
        <Viewer fileUrl={filePath} />
      </Worker>
    </div>
  )
};

export default PdfViewer;