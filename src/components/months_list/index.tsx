import { Component, For } from "solid-js";
import { getMonthName } from "../../utils/date-utils";
import { MonthsListProps, months } from "../calendar";

export const MonthsList: Component<MonthsListProps> = (
  props: MonthsListProps
) => {
  return (
    <div class="modal">
      <header class="modal-header">
        <h2>Months</h2>
      </header>

      <div class="modal-content">
        <table style="width:100%;text-align:center;">
          <tbody>
            <tr>
              <For each={months}>
                {(month, index) => {
                  if (index() >= 0 && index() < 4) {
                    return <td>{month}</td>;
                  }
                  return <></>;
                }}
              </For>
            </tr>
            <tr>
              <For each={months}>
                {(month, index) => {
                  if (index() >= 4 && index() < 8) {
                    return <td>{month}</td>;
                  }
                  return <></>;
                }}
              </For>
            </tr>
            <tr>
              <For each={months}>
                {(month, index) => {
                  if (index() >= 8 && index() < 12) {
                    return <td>{month}</td>;
                  }
                  return <></>;
                }}
              </For>
            </tr>
          </tbody>
        </table>
      </div>

      <footer class="modal-footer">
        <button
          type="button"
          onclick={() => {
            props.setMonthsVisible(false);
          }}
          class="header-month-btn"
        >
          Close
        </button>
      </footer>
    </div>
  );
};
