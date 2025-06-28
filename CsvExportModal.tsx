// src/components/CsvExportModal.tsx
import React, { useState } from "react";

interface CsvExportModalProps {
  open: boolean;
  onClose: () => void;
  onExport: (selectedFields: string[]) => void;
}

const fieldOptions = ["date", "amount", "category", "status", "user_id"];

const CsvExportModal: React.FC<CsvExportModalProps> = ({ open, onClose, onExport }) => {
  const [selectedFields, setSelectedFields] = useState<string[]>(fieldOptions);

  const toggleField = (field: string) => {
    setSelectedFields(prev =>
      prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
    );
  };

  if (!open) return null;

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
    }}>
      <div style={{ background: "#fff", padding: "20px", borderRadius: "8px", width: "300px" }}>
        <h3>Select Columns to Export</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {fieldOptions.map(field => (
            <li key={field}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => toggleField(field)}
                />{" "}
                {field}
              </label>
            </li>
          ))}
        </ul>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button onClick={() => onExport(selectedFields)}>Export</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CsvExportModal;
