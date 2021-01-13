import React from "react";
import PropTypes from "prop-types";
import "./todos.css";

const Contact = ({ contact: { title, message } }) => {
	return (
		<tr>
			<td>{title}</td>
			<td>
				<div className="table-message">{message}</div>
			</td>
		</tr>
	);
};

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
