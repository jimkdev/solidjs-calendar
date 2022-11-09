import { Component } from "solid-js";
import { ReservationProps } from "../calendar";
import { Modal } from "../modal";

export const ReservationMenu:Component<ReservationProps> = (props:ReservationProps) => {
	return (
		<>
			<Modal
				visible={props.visible}
				startTime={props.startTime}
				endTime={props.endTime}
				selectedDate={props.selectedDate}
				selectedMonth={props.selectedMonth}
				selectedYear={props.selectedYear}
				reservations={props.reservations}
				setVisible={props.setVisible}
				setStartTime={props.setStartTime}
				setEndTime={props.setEndTime}
				setReservations={props.setReservations}/>
		</>
	);
};