import { Show } from "solid-js";
import { Component } from "solid-js";
import { createNewDate, getMonthName, getNextMonth, getNextYear, getPreviousMonth, getPreviousYear, getTotalMonthDays, getWeeks } from "../../utils/date-utils";
import { CalendarProps } from "../calendar";

export const CalendarHeader: Component<CalendarProps> = (props: CalendarProps) => {
	const previous = () => {
		const currentMonth = getPreviousMonth(props.month.index);
		props.setMonth({
			name: getMonthName(currentMonth, props.months),
			index: currentMonth
		});
		// console.log(`New month ${props.month}`);
		props.setYear(getPreviousYear(currentMonth, props.year));
		// console.log(`New year ${props.year}`);
		props.setTotalDays(getTotalMonthDays(currentMonth, props.year));
		const newDate = createNewDate(1, currentMonth + 1, props.year);
		console.log(newDate)
		props.setDay(newDate.getDay());
		props.setWeeks(getWeeks(props.day, props.totalDays));
		// console.log(newDate);
	};

	const next = () => {
		const currentMonth = getNextMonth(props.month.index);
		props.setMonth({
			name: getMonthName(currentMonth, props.months),
			index: currentMonth
		});
		props.setYear(getNextYear(currentMonth, props.year));
		props.setTotalDays(getTotalMonthDays(currentMonth, props.year));
		const newDate = createNewDate(1, currentMonth + 1, props.year);
		console.log(newDate);
		props.setDay(newDate.getDay());
		props.setWeeks(getWeeks(props.day, props.totalDays));
	};

	return (
		<div>
			<span>
				<button
					type="button"
					onclick={previous}
					class="calendar-btn">&lt;</button>
			</span>
			<Show
				when={props.month && props.year}
				fallback={
					<span>Month, year</span>
				}
			>
					<span>
						<button
							type="button"
							class="calendar-btn wpx-350">{props.month.name} {props.year}</button>
					</span>
			</Show>
			<span>
				<button
					type="button"
					onclick={next}
					class="calendar-btn">&gt;</button>
			</span>
		</div>
	);
};


