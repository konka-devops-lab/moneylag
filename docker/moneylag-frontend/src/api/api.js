// api.js

const API_BASE = process.env.REACT_APP_API_URL || '/api/entries';

export const addEntry = async (data) => {
  const res = await fetch(`${API_BASE}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getEntries = async () => {
  const res = await fetch(`${API_BASE}`);
  return res.json();
};

export const updateEntry = async (id, updatedData) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return res.json();
};

export const deleteEntry = async (id) => {
  const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
  return res.json();
};
