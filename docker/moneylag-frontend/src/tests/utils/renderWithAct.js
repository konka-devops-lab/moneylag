import { act, render } from "@testing-library/react";

/**
 * Wraps RTL `render()` inside React's `act()` automatically.
 * Prevents all act() warnings for async state updates (setState inside useEffect).
 */
export async function renderWithAct(ui) {
  let utils;

  await act(async () => {
    utils = render(ui);
  });

  return utils;
}
