import { Component, createSignal, For, Setter, Show } from "solid-js";
import {
  getMonthName,
  getTotalMonthDays,
  getWeeks,
} from "../../utils/date-utils";
import { CalendarHeader } from "../calendar-header/index";
import { MonthsList } from "../months_list/index";
import { ReservationMenu } from "../reservation-menu";

interface monthProps {
  name: string;
  index: number;
}

export interface CalendarProps {
  day: number;
  month: monthProps;
  year: number;
  months: string[];
  totalDays: number;
  weeks: number[][];
  setMonth: Setter<object>;
  setYear: Setter<number>;
  setTotalDays: Setter<number>;
  setDay: Setter<number>;
  setWeeks: Setter<number[][]>;
  setMonthsVisible: Setter<boolean>;
}

export interface ReservationProps {
  visible: boolean;
  startTime: string | null;
  endTime: string | null;
  selectedDate: number;
  selectedMonth: monthProps;
  selectedYear: number;
  reservations: object[];
  setVisible: Setter<boolean>;
  setStartTime: Setter<string>;
  setEndTime: Setter<string>;
  setReservations: Setter<object>;
}

export interface MonthsListProps {
  year: number;
  setMonthsVisible: Setter<boolean>;
  setMonth: Setter<object>;
  setTotalDays: Setter<object>;
  setDay: Setter<object>;
  setWeeks: Setter<object>;
}

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const Calendar: Component = () => {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();

  const [currentDay, setDay] = createSignal(new Date(year, month, 1).getDay());
  const [currentDate, setDate] = createSignal(today.getDate());
  const [currentMonth, setMonth] = createSignal({
    name: getMonthName(month, months),
    index: month,
  });
  const [currentYear, setYear] = createSignal(year);
  const [totalDays, setTotalDays] = createSignal(
    getTotalMonthDays(currentMonth().index, currentYear())
  );
  const [weeks, setWeeks] = createSignal(getWeeks(currentDay(), totalDays()));
  const [visible, setVisible] = createSignal(false);
  const [monthsVisible, setMonthsVisible] = createSignal(false);
  const [startTime, setStartTime] = createSignal("7");
  const [endTime, setEndTime] = createSignal("8");
  const [reservations, setReservations] = createSignal([]);

  const makeReservation = (event: Event) => {
    if (!event.target) return;

    const element = event.target as HTMLInputElement;
    if (element.value) {
      let parsedDate: number | typeof NaN = NaN;
      // Try to convert dateValue from String to Number
      try {
        parsedDate = Number.parseInt(element.value);
      } catch (err) {
        console.log(err);
      } finally {
        if (Number.isNaN(parsedDate)) return;
        setDate(parsedDate);
        if (visible()) setVisible(false);
        setVisible(true);
      }
    }
  };

  return (
    <>
      <table class="calendar">
        <thead>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <th colSpan="7">
              <CalendarHeader
                day={currentDay()}
                month={currentMonth()}
                year={currentYear()}
                totalDays={totalDays()}
                weeks={weeks()}
                setDay={setDay}
                setMonth={setMonth}
                setYear={setYear}
                setTotalDays={setTotalDays}
                setWeeks={setWeeks}
                months={months}
                setMonthsVisible={setMonthsVisible}
              />
            </th>
          </tr>
          <tr>
            <For each={weekDays}>
              {(weekDay) => {
                return <th class="weekday-cell">{weekDay}</th>;
              }}
            </For>
          </tr>
        </thead>
        <tbody>
          <For each={weeks()}>
            {(week) => {
              return (
                <tr>
                  <For each={week}>
                    {(day, id) => {
                      return (
                        <Show
                          when={day !== 0}
                          fallback={<td class="no-date"></td>}
                        >
                          <Show
                            when={
                              day === today.getDate() &&
                              currentMonth().index === month &&
                              currentYear() === year
                            }
                            fallback={
                              <td class="other-date">
                                <button
                                  onclick={makeReservation}
                                  value={day.toString()}
                                >
                                  {day}
                                </button>
                              </td>
                            }
                          >
                            <td class="current-date">
                              <button
                                onclick={makeReservation}
                                value={day.toString()}
                              >
                                {day}
                              </button>
                            </td>
                          </Show>
                        </Show>
                      );
                    }}
                  </For>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
      {/*Show when visible is true*/}
      <Show when={visible()}>
        <ReservationMenu
          visible={visible()}
          startTime={startTime()}
          endTime={endTime()}
          selectedDate={currentDate()}
          selectedMonth={currentMonth()}
          selectedYear={currentYear()}
          reservations={reservations()}
          setVisible={setVisible}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setReservations={setReservations}
        />
      </Show>
      <Show when={monthsVisible()}>
        <MonthsList setMonthsVisible={setMonthsVisible} setMonth={setMonth} />
      </Show>
    </>
  );
};
