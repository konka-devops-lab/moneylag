let entries = [];

export const addEntry = (data) => {
  entries.push({ ...data, id: Date.now() });
  return entries;
};

export const getEntries = () => {
  return entries;
};

export const updateEntry = (id, updatedData) => {
  entries = entries.map((item) =>
    item.id === id ? { ...item, ...updatedData } : item
  );
  return entries;
};

export const deleteEntry = (id) => {
  entries = entries.filter((item) => item.id !== id);
  return entries;
};
