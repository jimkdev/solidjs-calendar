import { Component, createSignal, For, Show } from 'solid-js';
import { getMonthName, getTotalMonthDays, getWeeks } from '../../utils/date-utils';
import { CalendarHeader } from '../calendar-header/index';
// import { DropdownMenu } from '../dropdown';

export interface monthProps {
	name:string;
	index:number;
};

export interface CalendarProps {
	day: number;
	month: monthProps;
	year:number;
	months:string[];
};

export interface DropdownProps {
	visible: boolean;
	startTime:string,
	endTime:string;
	reservations:object[]
};

export const Calendar: Component = () => {
	const weekDays = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	];

	const months = [
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
		"December"
	];

	const today = new Date();
	let day = today.getDay();
	let month = today.getMonth();
	let year = today.getFullYear();

	const [currentDay, setDay] = createSignal(new Date(year, month, 1).getDay());
	// const [currentDate, setDate] = createSignal(today.getDate());
	const [currentMonth, setMonth] = createSignal({
		name: getMonthName(month, months),
		index: month
	});
	const [currentYear, setYear] = createSignal(year);
	const [totalDays, setTotalDays] = createSignal(getTotalMonthDays(currentMonth().index, currentYear()));
	const [weeks, setWeeks] = createSignal(getWeeks(currentDay(), totalDays()));
	// const [visible, setVisible] = createSignal(false);
	// const [startTime, setStartTime] = createSignal();
	// const [endTime, setEndTime] = createSignal();
	// const [reservations, setReservations] = createSignal([]);

	// const showDropdown = (event:Event) => {
	// 	setDate(event.target.value);
	// 	if(visible()) setVisible(false);
	// 	setVisible(true);
	// };

	return (
		<div>
			<div class="vertical-container border">
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
									months={months}/>
							</th>
						</tr>
						<tr>
							<For each={weekDays}>{(weekDay) => {
								return (
									<th>{weekDay}</th>
								);
							}}</For>
						</tr>
					</thead>
					<tbody>
						<For each={weeks()}>{(week) => {
							return (
								<tr>
									<For each={week}>{(day, id) => {
										return (
											<Show when={day !== 0} fallback={
												<td class="inactive"></td>
											}>
												<Show
													when={
														day === today.getDate()
														&& currentMonth().index === month
														&& currentYear() === year}
													fallback={
														<td class="active">
															<div class="dropdown">
																<button
																	// onclick={showDropdown}
																	value={day}
																	class="cell-btn">{day}</button>
																{/* <Show when={
																	day === today.getDate()
																	&& currentMonth().index
																	&& currentYear()}>
																		<div>
																			<DropdownMenu
																				visible={visible()}
																				setVisible={setVisible}
																				startTime={startTime()}
																				setStartTime={setStartTime}
																				endTime={endTime()}
																				setEndTime={setEndTime}
																				reservations={reservations()}
																				setReservations={setReservations}
																				selectedDate={currentDate()}
																				selectedYear={currentYear()}
																				selectedMonth={currentMonth()}/>
																		</div>
																</Show> */}
															</div>
														</td>
												}>
													<td>
														<div class="dropdown">
															<button
																// onclick={showDropdown}
																value={day}
																class="current-day cell-btn">{day}</button>
															{/* <div class="dropdown-content">
																<DropdownMenu
																	visible={visible()}
																	setVisible={setVisible}
																	startTime={startTime()}
																	setStartTime={setStartTime}
																	endTime={endTime()}
																	setEndTime={setEndTime}
																	reservations={reservations()}
																	setReservations={setReservations}
																	selectedDate={currentDate()}
																	selectedYear={currentYear()}
																	selectedMonth={currentMonth()}/>
															</div> */}
														</div>
													</td>
												</Show>
											</Show>
										);
									}}</For>
								</tr>
							);
						}}</For>
					</tbody>
				</table>
			</div>
		</div>
	);
};
