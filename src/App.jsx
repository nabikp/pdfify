import { useState } from "react";
import {
  generatePdf,
  downloadPdf,
  previewPdf,
} from "./utils/generatePdf";

export default function App() {
  const [text, setText] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  // 📄 File reader logic
  const handleFile = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => setText(e.target.result);
    reader.readAsText(file);
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "40px auto",
        padding: 20,
        border: isDragging ? "2px dashed #4f46e5" : "2px dashed #ccc",
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
      }}
    >
      <h1>PDFify</h1>

      <p style={{ opacity: 0.7 }}>
        Drag & drop a <strong>.txt</strong> or <strong>.md</strong> file
        or upload below
      </p>

      <input
        type="file"
        accept=".txt,.md"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <br /><br />

      <textarea
        rows={15}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type, paste, or drop a file..."
        style={{ width: "100%", padding: 12 }}
      />

      <br /><br />

      <button
        onClick={() => {
          const doc = generatePdf(text);
          setPreviewUrl(previewPdf(doc));
        }}
      >
        Preview PDF
      </button>

      &nbsp;

      <button
        onClick={() => {
          const doc = generatePdf(text);
          downloadPdf(doc);
        }}
      >
        Download PDF
      </button>

      {previewUrl && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
          }}
        >
          <button onClick={() => setPreviewUrl(null)}>Close</button>

          <iframe
            src={previewUrl}
            width="100%"
            height="100%"
            title="PDF Preview"
          />
        </div>
      )}
    </div>
  );
}
