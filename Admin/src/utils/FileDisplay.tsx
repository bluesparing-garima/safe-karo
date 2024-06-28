import React from 'react';

interface FileDisplayProps {
  base64: string;
}

const FileDisplay: React.FC<FileDisplayProps> = ({ base64 }) => {
  const mimeType = getMimeType(base64);

  return (
    <div>
      {mimeType?.includes('image') && (
        <img src={base64} alt="Uploaded content" style={{ maxWidth: '100%', height: 'auto' }} />
      )}
      {mimeType === 'application/pdf' && (
        <embed src={base64} type="application/pdf" width="100%" height="500px" />
      )}
      {!mimeType && <p>Unsupported file type</p>}
    </div>
  );
};

const getMimeType = (base64: string): string | null => {
  const match = base64.match(/^data:(.*);base64,/);
  return match ? match[1] : null;
};

export default FileDisplay;
