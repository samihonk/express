import React from "react";
import PropTypes from "prop-types";

const Contact = ({ contact: { title, message } }) => {
	return (
		<tr>
			<td>{title}</td>
			<td>{message}</td>
		</tr>
	);
};

Contact.propTypes = {
	contact: PropTypes.object.isRequired,
};

export default Contact;
