import React from 'react';
import { TextField } from '@mui/material';

interface TextAreaEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function Editor({ value, onChange }: TextAreaEditorProps) {
  return (
    <TextField
      label="Texto da questão"
      fullWidth
      multiline
      minRows={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
