import { useState } from "react";
import {
  Button,
  Box,
  Typography,
  Input,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

export default function SqlUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage("");
    setError(false);
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.name.endsWith(".sql")) {
      setFile(selectedFile);
    } else {
      setFile(null);
      setError(true);
      setMessage("Por favor, selecione um arquivo .sql válido.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    setMessage("");
    setError(false);

    try {
      const response = await axios.post("http://localhost:3000/import/execute-sql", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data);
    } catch (err: any) {
      setError(true);
      setMessage(err.response?.data || "Erro ao enviar o arquivo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Enviar Arquivo .SQL
      </Typography>

      <Input type="file" onChange={handleFileChange} />

      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<CloudUploadIcon />}
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "Enviar"}
        </Button>
      </Box>

      {message && (
        <Box mt={2}>
          <Alert severity={error ? "error" : "success"}>{message}</Alert>
        </Box>
      )}
    </Box>
  );
}
