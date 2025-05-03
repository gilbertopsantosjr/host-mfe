import React from 'react';
import ReactDOM from 'react-dom/client';

import('knowledgeManagment/App').then(({ default: RemoteApp }) => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <RemoteApp />
    </React.StrictMode>
  );
});
