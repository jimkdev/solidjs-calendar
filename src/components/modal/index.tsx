import { Component } from "solid-js";
import { createNewDate } from "../../utils/date-utils";
import { ReservationProps } from "../calendar";

export const Modal: Component<ReservationProps> = (props: ReservationProps) => {
  const saveReservation = () => {
    props.reservations.push({
      startTime: props.startTime,
      endTime: props.endTime,
      day: props.selectedDate,
      month: props.selectedMonth,
      year: props.selectedYear,
      fullDate: createNewDate(
        props.selectedDate,
        props.selectedMonth.index + 1,
        props.selectedYear
      ),
    });
    console.log(props.reservations);
    props.setVisible(false);
  };

  return (
    <div class="modal">
      <header class="modal-header">
        <h2>Reservation Menu</h2>
      </header>

      <div class="modal-content">
        <form noValidate>
          <table>
            <thead>
              <tr>
                <th></th>
              </tr>
              <tr></tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <label for="start-time">From</label>
                </td>
                <td>
                  <select
                    name="start-time"
                    onchange={(event) => {
                      const element = event.target as HTMLInputElement;
                      if (!element.value) return;
                      props.setStartTime(element.value);
                    }}
                  >
                    <option value="7">07:00</option>
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                  </select>
                </td>
              </tr>

              <tr>
                <td>
                  <label for="end-time">To</label>
                </td>
                <td>
                  <select
                    name="end-time"
                    onchange={(event) => {
                      const element = event.target as HTMLInputElement;
                      if (!element.value) return;
                      props.setEndTime(element.value);
                    }}
                  >
                    <option value="7">07:00</option>
                    <option value="8">08:00</option>
                    <option value="9">09:00</option>
                    <option value="10">10:00</option>
                    <option value="11">11:00</option>
                    <option value="12">12:00</option>
                    <option value="13">13:00</option>
                    <option value="14">14:00</option>
                    <option value="15">15:00</option>
                    <option value="16">16:00</option>
                    <option value="17">17:00</option>
                    <option value="18">18:00</option>
                    <option value="19">19:00</option>
                    <option value="20">20:00</option>
                    <option value="21">21:00</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>

      <footer class="modal-footer">
        <span>
          <button onclick={() => props.setVisible(false)} type="button">
            Discard
          </button>
        </span>
        <span>
          <button onclick={saveReservation} type="button">
            Reserve
          </button>
        </span>
      </footer>
    </div>
  );
};
