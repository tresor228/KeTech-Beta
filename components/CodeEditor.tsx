,'use client';

import { useState } from 'react';
import Editor from '@monaco-editor/react';

// Ce type définit les fonctions que le composant parent peut appeler
export interface CodeEditorRef {
  getCode: () => string;
}

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  editorRef?: React.MutableRefObject<CodeEditorRef | null>;
}

export default function CodeEditor({ 
  initialCode = '', 
  language = 'javascript', 
  editorRef 
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);

  // Gérer la liaison avec le parent
  if (editorRef) {
    editorRef.current = {
      getCode: () => code,
    };
  }

  return (
    <Editor
      height="40vh"
      language={language}
      value={code}
      onChange={(value) => setCode(value || '')}
      theme="vs-dark"
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
}
