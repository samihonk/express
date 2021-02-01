import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { removeTodo } from "../../redux/actions/todoActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./todos.css";

const Contact = ({ contact: { id, title, message } }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(removeTodo(id));
	};

	return (
		<tr>
			<td className="table-h-title">{title}</td>
			<td className="table-h-message">
				<div className="table-message">{message}</div>
			</td>
			<td className="table-control">
				<button onClick={handleClick} className="btn center-icon">
					<FontAwesomeIcon icon={faTrash} />
				</button>
			</td>
		</tr>
	);
};

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
