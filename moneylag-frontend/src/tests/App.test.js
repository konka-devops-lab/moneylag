import "@testing-library/jest-dom";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import App from "../components/App";
import * as api from "../api/api";
import { renderWithAct } from "./utils/renderWithAct";

jest.mock("../api/api");

const testIf = (condition) => (condition ? test : test.skip);

// ❌ REMOVE THESE LINES - they override your .env settings
// process.env.REACT_APP_ENABLE_UPDATE = "true";
// process.env.REACT_APP_ENABLE_DELETE_ALL = "true";

describe("MoneyLag App - Working Test Suite", () => {

  beforeEach(() => {
    jest.clearAllMocks();
    api.getEntries.mockResolvedValue([]);
    api.addEntry.mockResolvedValue({});
    api.updateEntry.mockResolvedValue({});
    api.deleteEntry = jest.fn(() => Promise.resolve({}));
  });

  // -------------------------------------------------------
  // 1️⃣ ADD ENTRY
  // -------------------------------------------------------
  test("should add an entry successfully", async () => {
    await renderWithAct(<App />);

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "200" },
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Food" },
    });

    const dateInput = screen.getByDisplayValue("");
    fireEvent.change(dateInput, { target: { value: "2025-01-01" } });

    fireEvent.click(screen.getByText("Add"));

    expect(api.addEntry).toHaveBeenCalled();

    expect(
      await screen.findByText("✅ Entry Added Successfully")
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // 2️⃣ UPDATE BUTTON (toggle)
  // -------------------------------------------------------
  testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
    "Update button appears when update toggle = true",
    async () => {
      api.getEntries.mockResolvedValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      await renderWithAct(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      expect(await screen.findByText("Update")).toBeInTheDocument();
    }
  );

  // -------------------------------------------------------
  // 3️⃣ UPDATE FUNCTIONALITY
  // -------------------------------------------------------
  testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
    "Update → Save triggers API correctly",
    async () => {
      api.getEntries.mockResolvedValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      await renderWithAct(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      const updateButton = await screen.findByText("Update");
      fireEvent.click(updateButton);

      expect(await screen.findByText("Save")).toBeInTheDocument();

      fireEvent.click(screen.getByText("Save"));

      await waitFor(() => {
        expect(api.updateEntry).toHaveBeenCalled();
      });
    }
  );

  // -------------------------------------------------------
  // 4️⃣ DELETE ALL BUTTON
  // -------------------------------------------------------
  testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
    "Delete All button appears when toggle = true",
    async () => {
      api.getEntries.mockResolvedValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      await renderWithAct(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      expect(await screen.findByText("Delete All")).toBeInTheDocument();
    }
  );

  // -------------------------------------------------------
  // 5️⃣ DELETE ALL FUNCTIONALITY
  // -------------------------------------------------------
  testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
    "Delete All deletes all entries",
    async () => {
      const mockEntries = [
        { id: 1, amount: 100, description: "A", date: "2025-01-01" },
        { id: 2, amount: 200, description: "B", date: "2025-01-02" },
        { id: 3, amount: 300, description: "C", date: "2025-01-03" },
      ];

      api.getEntries
        .mockResolvedValueOnce(mockEntries)
        .mockResolvedValueOnce([]);

      window.confirm = jest.fn(() => true);
      api.deleteEntry = jest.fn(() => Promise.resolve({}));

      await renderWithAct(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      fireEvent.click(await screen.findByText("Delete All"));

      await waitFor(() => {
        expect(api.deleteEntry).toHaveBeenCalledTimes(3);
      });

      expect(api.deleteEntry).toHaveBeenCalledWith(1);
      expect(api.deleteEntry).toHaveBeenCalledWith(2);
      expect(api.deleteEntry).toHaveBeenCalledWith(3);

      expect(
        await screen.findByText("✅ All Entries Deleted Successfully")
      ).toBeInTheDocument();
    }
  );

  // -------------------------------------------------------
  // 6️⃣ DELETE ONE ENTRY
  // -------------------------------------------------------
  test("should delete one entry", async () => {
    api.getEntries.mockResolvedValue([
      { id: 1, amount: 100, description: "Coffee", date: "2025-01-01" },
    ]);

    await renderWithAct(<App />);

    fireEvent.click(screen.getByText(">> Records"));

    fireEvent.click(await screen.findByText("Delete"));

    await waitFor(() => {
      expect(api.deleteEntry).toHaveBeenCalledWith(1);
    });

    // Wait for the success message to appear
    expect(
      await screen.findByText("✅ Entry Deleted Successfully")
    ).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // 7️⃣ PAGINATION
  // -------------------------------------------------------
  test("pagination shows correct number of pages", async () => {
    const mockEntries = Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      amount: 100,
      description: `Item-${i + 1}`,
      date: "2025-01-01",
    }));

    api.getEntries.mockResolvedValue(mockEntries);

    await renderWithAct(<App />);

    fireEvent.click(screen.getByText(">> Records"));

    expect(await screen.findByText("3")).toBeInTheDocument();
  });

  // -------------------------------------------------------
  // 8️⃣ PAGE NAVIGATION
  // -------------------------------------------------------
  test("should navigate between pages", async () => {
    await renderWithAct(<App />);

    fireEvent.click(screen.getByText(">> Records"));
    expect(await screen.findByText("MoneyLag Records")).toBeInTheDocument();

    fireEvent.click(screen.getByText(">> Insights"));
    expect(
      await screen.findByText("Insights - Spending Chart")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("<< Records"));
    expect(await screen.findByText("MoneyLag Records")).toBeInTheDocument();
  });
});