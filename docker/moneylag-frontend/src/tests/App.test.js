// // 👇 Enables .toBeInTheDocument(), .not.toBeInTheDocument(), etc.
// import "@testing-library/jest-dom";

// import { render, screen, fireEvent } from "@testing-library/react";
// import App from "../components/App";
// import * as api from "../api/api";

// jest.mock("../api/api");

// // Conditional test helper (run only when feature is enabled)
// const testIf = (condition) => (condition ? test : test.skip);

// describe("MoneyLag App Tests", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   // 1️⃣ ADD ENTRY  (Always runs)
//   test("should add an entry successfully", () => {
//   api.getEntries.mockReturnValue([]);
//   api.addEntry.mockImplementation(() => {});

//   const { container } = render(<App />);

//   fireEvent.change(screen.getByPlaceholderText("Amount"), {
//     target: { value: "200" }
//   });

//   fireEvent.change(screen.getByPlaceholderText("Description"), {
//     target: { value: "Food" }
//   });

//   // Select the <input type="date"> using querySelector
//   const dateInput = container.querySelector('input[type="date"]');
//   fireEvent.change(dateInput, {
//     target: { value: "2025-01-01" }
//   });

//   fireEvent.click(screen.getByText("Add"));

//   expect(api.addEntry).toHaveBeenCalled();
//   expect(
//     screen.getByText("✅ Entry Added Successfully")
//   ).toBeInTheDocument();
// });

//   // ============================
//   // 2️⃣ UPDATE FEATURE TESTS
//   // Runs ONLY if REACT_APP_ENABLE_UPDATE=true
//   // ============================

//   testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
//     "Update button appears when REACT_APP_ENABLE_UPDATE=true",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//       ]);

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));

//       expect(screen.getByText("Update")).toBeInTheDocument();
//     }
//   );

//   // This one should ALWAYS RUN (even if disabled)
//   test("Update button does NOT appear when REACT_APP_ENABLE_UPDATE=false", () => {
//     api.getEntries.mockReturnValue([
//       { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//     ]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));

//     expect(screen.queryByText("Update")).not.toBeInTheDocument();
//   });

//   // ============================
//   // 3️⃣ DELETE ALL FEATURE TESTS
//   // Runs ONLY if REACT_APP_ENABLE_DELETE_ALL=true
//   // ============================

//   testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
//     "Delete All appears when ENABLE_DELETE_ALL=true",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//       ]);

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));

//       expect(screen.getByText("Delete All")).toBeInTheDocument();
//     }
//   );

//   // This one ALWAYS runs
//   test("Delete All does NOT appear when ENABLE_DELETE_ALL=false", () => {
//     api.getEntries.mockReturnValue([
//       { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//     ]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));

//     expect(screen.queryByText("Delete All")).not.toBeInTheDocument();
//   });

//   // 4️⃣ DELETE ONE — always runs
//   test("should delete an entry", () => {
//     api.getEntries.mockReturnValue([
//       { id: 1, amount: 100, description: "Coffee", date: "2025-01-01" },
//     ]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));
//     fireEvent.click(screen.getByText("Delete"));

//     expect(api.deleteEntry).toHaveBeenCalledWith(1);
//   });

//   // 5️⃣ PAGINATION — always runs
//   test("pagination shows correct number of pages", () => {
//     const mockEntries = Array.from({ length: 12 }).map((_, i) => ({
//       id: i + 1,
//       amount: (i + 1) * 10,
//       description: `Item-${i + 1}`,
//       date: "2025-01-01",
//     }));

//     api.getEntries.mockReturnValue(mockEntries);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));

//     expect(screen.getByText("3")).toBeInTheDocument();
//   });

//   // 6️⃣ PAGE NAVIGATION — always runs
//   test("should navigate between pages", () => {
//     api.getEntries.mockReturnValue([]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));
//     expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();

//     fireEvent.click(screen.getByText(">> Insights"));
//     expect(
//       screen.getByText("Insights - Spending Chart")
//     ).toBeInTheDocument();

//     fireEvent.click(screen.getByText("<< Records"));
//     expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();
//   });
// });

//👇 Enables .toBeInTheDocument(), .not.toBeInTheDocument(), etc.
// import "@testing-library/jest-dom";

// import { render, screen, fireEvent } from "@testing-library/react";
// import App from "../components/App";
// import * as api from "../api/api";

// jest.mock("../api/api");

// // Conditional test helper (run only when feature is enabled)
// const testIf = (condition) => (condition ? test : test.skip);

// describe("MoneyLag App Tests", () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   // ============================
//   // 1️⃣ ADD ENTRY (Always runs)
//   // ============================
//   test("should add an entry successfully", () => {
//     api.getEntries.mockReturnValue([]);
//     api.addEntry.mockImplementation(() => {});

//     const { container } = render(<App />);

//     fireEvent.change(screen.getByPlaceholderText("Amount"), {
//       target: { value: "200" }
//     });

//     fireEvent.change(screen.getByPlaceholderText("Description"), {
//       target: { value: "Food" }
//     });

//     // Select the <input type="date"> using querySelector
//     const dateInput = container.querySelector('input[type="date"]');
//     fireEvent.change(dateInput, {
//       target: { value: "2025-01-01" }
//     });

//     fireEvent.click(screen.getByText("Add"));

//     expect(api.addEntry).toHaveBeenCalled();
//     expect(
//       screen.getByText("✅ Entry Added Successfully")
//     ).toBeInTheDocument();
//   });

//   // ============================
//   // 2️⃣ UPDATE FEATURE TESTS
//   // Both tests run ONLY if REACT_APP_ENABLE_UPDATE=true
//   // ============================

//   testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
//     "Update button appears when REACT_APP_ENABLE_UPDATE=true",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//       ]);

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));

//       expect(screen.getByText("Update")).toBeInTheDocument();
//     }
//   );

//   testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
//     "Update button functionality works correctly",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//       ]);
//       api.updateEntry.mockImplementation(() => {});

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));
      
//       // Click Update button to enter edit mode
//       fireEvent.click(screen.getByText("Update"));

//       // After clicking Update, the button should change to "Save"
//       expect(screen.getByText("Save")).toBeInTheDocument();
//       expect(screen.queryByText("Update")).not.toBeInTheDocument();

//       // Click Save to complete the update
//       fireEvent.click(screen.getByText("Save"));

//       expect(api.updateEntry).toHaveBeenCalled();
//     }
//   );

//   // ============================
//   // 3️⃣ DELETE ALL FEATURE TESTS
//   // Both tests run ONLY if REACT_APP_ENABLE_DELETE_ALL=true
//   // ============================

//   testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
//     "Delete All appears when ENABLE_DELETE_ALL=true",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
//       ]);

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));

//       expect(screen.getByText("Delete All")).toBeInTheDocument();
//     }
//   );

//   testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
//     "Delete All functionality works correctly",
//     () => {
//       api.getEntries.mockReturnValue([
//         { id: 1, amount: 100, description: "Test1", date: "2025-01-01" },
//         { id: 2, amount: 200, description: "Test2", date: "2025-01-02" },
//       ]);
//       api.deleteAllEntries.mockImplementation(() => {});

//       render(<App />);

//       fireEvent.click(screen.getByText(">> Records"));
//       fireEvent.click(screen.getByText("Delete All"));

//       expect(api.deleteAllEntries).toHaveBeenCalled();
//     }
//   );

//   // ============================
//   // 4️⃣ DELETE ONE — always runs
//   // ============================
//   test("should delete an entry", () => {
//     api.getEntries.mockReturnValue([
//       { id: 1, amount: 100, description: "Coffee", date: "2025-01-01" },
//     ]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));
//     fireEvent.click(screen.getByText("Delete"));

//     expect(api.deleteEntry).toHaveBeenCalledWith(1);
//   });

//   // ============================
//   // 5️⃣ PAGINATION — always runs
//   // ============================
//   test("pagination shows correct number of pages", () => {
//     const mockEntries = Array.from({ length: 12 }).map((_, i) => ({
//       id: i + 1,
//       amount: (i + 1) * 10,
//       description: `Item-${i + 1}`,
//       date: "2025-01-01",
//     }));

//     api.getEntries.mockReturnValue(mockEntries);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));

//     expect(screen.getByText("3")).toBeInTheDocument();
//   });

//   // ============================
//   // 6️⃣ PAGE NAVIGATION — always runs
//   // ============================
//   test("should navigate between pages", () => {
//     api.getEntries.mockReturnValue([]);

//     render(<App />);

//     fireEvent.click(screen.getByText(">> Records"));
//     expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();

//     fireEvent.click(screen.getByText(">> Insights"));
//     expect(
//       screen.getByText("Insights - Spending Chart")
//     ).toBeInTheDocument();

//     fireEvent.click(screen.getByText("<< Records"));
//     expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();
//   });
// });

import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import App from "../components/App";
import * as api from "../api/api";

jest.mock("../api/api");

// Conditional test helper (run only when feature is enabled)
const testIf = (condition) => (condition ? test : test.skip);

describe("MoneyLag App Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock all API functions
    api.getEntries = jest.fn().mockReturnValue([]);
    api.addEntry = jest.fn().mockImplementation(() => {});
    api.updateEntry = jest.fn().mockImplementation(() => {});
    api.deleteEntry = jest.fn().mockImplementation(() => {});
    api.deleteAllEntries = jest.fn().mockImplementation(() => {});
  });

  // ============================
  // 1️⃣ ADD ENTRY (Always runs)
  // ============================
  test("should add an entry successfully", () => {
    api.getEntries.mockReturnValue([]);
    api.addEntry.mockImplementation(() => {});

    const { container } = render(<App />);

    fireEvent.change(screen.getByPlaceholderText("Amount"), {
      target: { value: "200" }
    });

    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Food" }
    });

    // Select the <input type="date"> using querySelector
    const dateInput = container.querySelector('input[type="date"]');
    fireEvent.change(dateInput, {
      target: { value: "2025-01-01" }
    });

    fireEvent.click(screen.getByText("Add"));

    expect(api.addEntry).toHaveBeenCalled();
    expect(
      screen.getByText("✅ Entry Added Successfully")
    ).toBeInTheDocument();
  });

  // ============================
  // 2️⃣ UPDATE FEATURE TESTS
  // Both tests run ONLY if REACT_APP_ENABLE_UPDATE=true
  // ============================

  testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
    "Update button appears when REACT_APP_ENABLE_UPDATE=true",
    () => {
      api.getEntries.mockReturnValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      render(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      expect(screen.getByText("Update")).toBeInTheDocument();
    }
  );

  testIf(process.env.REACT_APP_ENABLE_UPDATE === "true")(
    "Update button functionality works correctly",
    () => {
      api.getEntries.mockReturnValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      render(<App />);

      fireEvent.click(screen.getByText(">> Records"));
      
      // Click Update button to enter edit mode
      fireEvent.click(screen.getByText("Update"));

      // After clicking Update, the button should change to "Save"
      expect(screen.getByText("Save")).toBeInTheDocument();
      expect(screen.queryByText("Update")).not.toBeInTheDocument();

      // Click Save to complete the update
      fireEvent.click(screen.getByText("Save"));

      expect(api.updateEntry).toHaveBeenCalled();
    }
  );

  // ============================
  // 3️⃣ DELETE ALL FEATURE TESTS
  // Both tests run ONLY if REACT_APP_ENABLE_DELETE_ALL=true
  // ============================

  testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
    "Delete All appears when ENABLE_DELETE_ALL=true",
    () => {
      api.getEntries.mockReturnValue([
        { id: 1, amount: 100, description: "Test", date: "2025-01-01" },
      ]);

      render(<App />);

      fireEvent.click(screen.getByText(">> Records"));

      expect(screen.getByText("Delete All")).toBeInTheDocument();
    }
  );

  // Delete All functionality tests with conditional execution
describe("Delete All functionality", () => {
  testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
    "Delete All calls deleteEntry for each entry when confirmed",
    () => {
      // Mock entries
      const mockEntries = [
        { id: 1, amount: 100, description: "Test1", date: "2025-01-01" },
        { id: 2, amount: 200, description: "Test2", date: "2025-01-02" },
        { id: 3, amount: 300, description: "Test3", date: "2025-01-03" },
      ];
      
      // Mock API
      api.getEntries.mockReturnValue(mockEntries);
      window.confirm = jest.fn(() => true);

      render(<App />);

      // Navigate to records page
      fireEvent.click(screen.getByText(">> Records"));
      
      // Click Delete All
      fireEvent.click(screen.getByText("Delete All"));

      // Verify confirm was shown
      expect(window.confirm).toHaveBeenCalledWith(
        "Are you sure you want to delete ALL records?"
      );
      
      // Verify deleteEntry called for each entry
      expect(api.deleteEntry).toHaveBeenCalledTimes(3);
      expect(api.deleteEntry).toHaveBeenCalledWith(1);
      expect(api.deleteEntry).toHaveBeenCalledWith(2);
      expect(api.deleteEntry).toHaveBeenCalledWith(3);
      
      // Verify success message
      expect(screen.getByText("✅ All Entries Deleted Successfully")).toBeInTheDocument();
    }
  );

  testIf(process.env.REACT_APP_ENABLE_DELETE_ALL === "true")(
    "Delete All does nothing when user cancels confirmation",
    () => {
      const mockEntries = [
        { id: 1, amount: 100, description: "Test1", date: "2025-01-01" },
      ];
      
      api.getEntries.mockReturnValue(mockEntries);
      window.confirm = jest.fn(() => false);

      render(<App />);

      fireEvent.click(screen.getByText(">> Records"));
      fireEvent.click(screen.getByText("Delete All"));

      expect(window.confirm).toHaveBeenCalled();
      expect(api.deleteEntry).not.toHaveBeenCalled();
      expect(screen.queryByText("✅ All Entries Deleted Successfully")).not.toBeInTheDocument();
    }
  );
});

  // ============================
  // 4️⃣ DELETE ONE — always runs
  // ============================
  test("should delete an entry", () => {
    api.getEntries.mockReturnValue([
      { id: 1, amount: 100, description: "Coffee", date: "2025-01-01" },
    ]);

    render(<App />);

    fireEvent.click(screen.getByText(">> Records"));
    fireEvent.click(screen.getByText("Delete"));

    expect(api.deleteEntry).toHaveBeenCalledWith(1);
  });

  // ============================
  // 5️⃣ PAGINATION — always runs
  // ============================
  test("pagination shows correct number of pages", () => {
    const mockEntries = Array.from({ length: 12 }).map((_, i) => ({
      id: i + 1,
      amount: (i + 1) * 10,
      description: `Item-${i + 1}`,
      date: "2025-01-01",
    }));

    api.getEntries.mockReturnValue(mockEntries);

    render(<App />);

    fireEvent.click(screen.getByText(">> Records"));

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  // ============================
  // 6️⃣ PAGE NAVIGATION — always runs
  // ============================
  test("should navigate between pages", () => {
    api.getEntries.mockReturnValue([]);

    render(<App />);

    fireEvent.click(screen.getByText(">> Records"));
    expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();

    fireEvent.click(screen.getByText(">> Insights"));
    expect(
      screen.getByText("Insights - Spending Chart")
    ).toBeInTheDocument();

    fireEvent.click(screen.getByText("<< Records"));
    expect(screen.getByText("MoneyLag Records")).toBeInTheDocument();
  });
});