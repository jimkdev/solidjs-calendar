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
		props.setYear(getPreviousYear(currentMonth, props.year));
		props.setTotalDays(getTotalMonthDays(currentMonth, props.year));
		const newDate = createNewDate(1, currentMonth + 1, props.year);
		props.setDay(newDate.getDay());
		props.setWeeks(getWeeks(props.day, props.totalDays));
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
		props.setDay(newDate.getDay());
		props.setWeeks(getWeeks(props.day, props.totalDays));
	};

	return (
		<div>
			<button
				type="button"
				onclick={previous}
				class="header-btn">&lt;</button>
			{/* <span>
			</span> */}
			<Show
				when={props.month && props.year}
				fallback={
					<span>Month, year</span>
				}
			>
				<button
					type="button"
					class="header-month-btn">{props.month.name} {props.year}</button>
				{/* <span>
				</span> */}
			</Show>
			<button
				type="button"
				onclick={next}
				class="header-btn">&gt;</button>
			{/* <span>
			</span> */}
		</div>
	);
};


