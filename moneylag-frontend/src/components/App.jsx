import React, { useState, useEffect } from "react";
import { FEATURE_FLAGS } from "../config/featureFlags";
import {
  addEntry,
  getEntries,
  updateEntry,
  deleteEntry
} from "../api/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const { ENABLE_UPDATE, ENABLE_DELETE_ALL } = FEATURE_FLAGS;

function App() {
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  const [entries, setEntries] = useState([]);
  const [editId, setEditId] = useState(null);

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const rowsPerPage = 5;

  /* INITIAL LOAD */
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    const list = await getEntries();

    // ⭐ FIX: ALWAYS convert API response into an array
    let cleaned;

    if (Array.isArray(list)) {
      cleaned = list;
    } else if (list && Array.isArray(list.data)) {
      cleaned = list.data;
    } else if (list && Array.isArray(list.entries)) {
      cleaned = list.entries;
    } else if (list && typeof list === "object") {
      cleaned = [list];
    } else {
      cleaned = [];
    }

    setEntries(cleaned);
  };

  // ADD ENTRY
  const handleAdd = async () => {
    if (!amount || !description || !date) {
      setStatus("error");
      setMessage("❌ All fields required");
      return;
    }

    await addEntry({ amount, description, date });
    await loadEntries();

    setAmount("");
    setDescription("");
    setDate("");

    setStatus("success");
    setMessage("✅ Entry Added Successfully");
  };

  // ENABLE EDIT (TOGGLE SAFE)
  const handleEdit = (id) => {
    if (!ENABLE_UPDATE) return;
    setEditId(id);
  };

  // SAVE UPDATE (TOGGLE SAFE)
  const handleSave = async (id, item) => {
    if (!ENABLE_UPDATE) return;

    await updateEntry(id, item);
    await loadEntries();
    setEditId(null);

    setStatus("success");
    setMessage("✅ Entry Updated Successfully");
  };

  // DELETE ONE
  const handleDelete = async (id) => {
    await deleteEntry(id);
    await loadEntries();

    setStatus("success");
    setMessage("✅ Entry Deleted Successfully");
  };

  // DELETE ALL (TOGGLE SAFE)
  const handleDeleteAll = async () => {
    if (!ENABLE_DELETE_ALL) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete ALL records?"
    );
    if (!confirmDelete) return;

    for (const item of entries) {
      await deleteEntry(item.id);
    }

    await loadEntries();

    setStatus("success");
    setMessage("✅ All Entries Deleted Successfully");
  };

  // PAGINATION
  const totalPages = Math.ceil(entries.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = entries.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div className="container">

      {/* PAGE 1: ENTRY PAGE */}
      {page === 1 && (
        <>
          <h2>MoneyLag Entry</h2>

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button onClick={handleAdd}>Add</button>

          <div
            className="bottom-right"
            onClick={() => {
              setCurrentPage(1);
              setPage(2);
            }}
          >
            {">> Records"}
          </div>
        </>
      )}

      {/* PAGE 2: RECORDS PAGE */}
      {page === 2 && (
        <>
          <h2>MoneyLag Records</h2>

          {ENABLE_DELETE_ALL && entries.length > 0 && (
            <div style={{ marginBottom: "10px" }}>
              <button onClick={handleDeleteAll}>Delete All</button>
            </div>
          )}

          <div className="row header">
            <span>Amount</span>
            <span>Description</span>
            <span>Date</span>
            <span>Action</span>
          </div>

          {currentRows.map((item) => (
            <div key={item.id} className="row">
              {editId === item.id ? (
                <>
                  <input
                    type="number"
                    defaultValue={item.amount}
                    onChange={(e) => (item.amount = e.target.value)}
                  />

                  <input
                    type="text"
                    defaultValue={item.description}
                    onChange={(e) => (item.description = e.target.value)}
                  />

                  <input
                    type="date"
                    defaultValue={item.date}
                    onChange={(e) => (item.date = e.target.value)}
                  />

                  {ENABLE_UPDATE && (
                    <button onClick={() => handleSave(item.id, item)}>
                      Save
                    </button>
                  )}
                </>
              ) : (
                <>
                  <span>{item.amount}</span>
                  <span>{item.description}</span>
                  <span>{item.date}</span>

                  <div>
                    {ENABLE_UPDATE && (
                      <button onClick={() => handleEdit(item.id)}>
                        Update
                      </button>
                    )}

                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}

          {/* PAGINATION */}
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <span
                key={num}
                className={currentPage === num ? "active-page" : ""}
                onClick={() => setCurrentPage(num)}
              >
                {num}
              </span>
            ))}
          </div>

          <div className="bottom-left" onClick={() => setPage(1)}>
            {"<< Entry"}
          </div>

          <div className="bottom-right" onClick={() => setPage(3)}>
            {">> Insights"}
          </div>
        </>
      )}

      {/* PAGE 3: INSIGHTS PAGE */}
      {page === 3 && (
        <>
          <h2>Insights - Spending Chart</h2>

          {entries.length > 0 ? (
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={entries}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="description" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No data available for chart</p>
          )}

          <div className="bottom-left" onClick={() => setPage(2)}>
            {"<< Records"}
          </div>
        </>
      )}

      {/* STATUS MESSAGE */}
      {message && (
        <p className={status === "success" ? "success" : "error"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default App;
