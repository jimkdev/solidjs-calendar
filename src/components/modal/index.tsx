import { Component } from "solid-js";
import { createNewDate } from "../../utils/date-utils";
import { ReservationProps } from "../calendar";

export const Modal:Component<ReservationProps> = (props:ReservationProps) => {
	const saveReservation = () => {
		props.reservations.push({
			startTime: props.startTime,
			endTime: props.endTime,
			day: props.selectedDate,
			month: props.selectedMonth,
			year: props.selectedYear,
			fullDate: createNewDate(props.selectedDate, props.selectedMonth.index + 1, props.selectedYear)
		});
		console.log(props.reservations);
		props.setVisible(false);
	};

	return(
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
									<label
										for="start-time">From</label>
								</td>
								<td>
									<input
										name="start-time"
										type="time"
										onchange={(event) => {
											const element = event.target as HTMLInputElement;
											if(!element.value) return;
											props.setStartTime(element.value);  
										}}/>
								</td>
							</tr>

							<tr>
								<td>
									<label for="end-time">To</label>
								</td>
								<td>
									<input
										name="end-time"
										type="time"
										onchange={(event) => {
											const element = event.target as HTMLInputElement;
											if(!element.value) return;
											props.setEndTime(element.value);
										}}/>
								</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>

			<footer class="modal-footer">
				<span>
					<button
						onclick={() => props.setVisible(false)}
						type="button">Discard</button>
				</span>
				<span>
					<button
						onclick={saveReservation}
						type="button">Reserve</button>
				</span>
			</footer>
		</div>
	);
};