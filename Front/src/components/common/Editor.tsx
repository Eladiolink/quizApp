import React, { useState } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default () => {
  const [editorContent, setEditorContent] = useState('');
  const { quill, quillRef } = useQuill();

  // Quando o conteúdo do editor mudar, atualizamos o estado
  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {
        const content = quill.root.innerHTML; // Pega o conteúdo HTML
        setEditorContent(content); // Atualiza o estado com o conteúdo
        console.log(content)
      });
    }
  }, [quill]);

  return (
    <div>
      <div ref={quillRef} style={{ height: 200 }} />
      <div>
        <h3>Conteúdo do editor:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }} />
      </div>
    </div>
  );
};
