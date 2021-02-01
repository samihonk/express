import React from "react";
import { useForm } from "react-hook-form";
import { addTodo } from "../../redux/actions/todoActions";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./todos.css";

const AddTodo = () => {
	const dispatch = useDispatch();
	const { handleSubmit, register, errors, reset } = useForm();

	const onSubmit = (e) => {
		dispatch(addTodo(e));
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<table className="table table-bordered table-striped table-sm todos-table table-odd">
				<tbody>
					<tr>
						<td className="table-h-title">
							<input
								className="form-table-input"
								id="title"
								type="text"
								name="title"
								placeholder="Enter title"
								ref={register({
									required: "Title required",
								})}
							/>
							{errors.title && (
								<div className="invalid-feedback">
									{errors.title.message}
								</div>
							)}
						</td>
						<td className="table-h-message">
							<input
								className="form-table-input table-input-message"
								id="message"
								type="text"
								name="message"
								placeholder="Enter message"
								ref={register({
									required: "Message required",
								})}
							/>
							{errors.message && (
								<div className="invalid-feedback">
									{errors.message.message}
								</div>
							)}
						</td>
						<td className="table-control">
							<button type="submit" className="btn center-icon">
								<FontAwesomeIcon icon={faPlus} />
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	);
};

export default AddTodo;
