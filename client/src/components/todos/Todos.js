import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos } from "../../redux/actions/todoActions";
import TodoItem from "./TodoItem";
import LoadingSpinner from "../layout/LoadingSpinner";
import "./todos.css";

const Todos = ({ todo: { todos, loading }, getTodos }) => {
	useEffect(() => {
		getTodos();
	}, [getTodos]);

	if (loading || (todos === null && !loading)) {
		return <LoadingSpinner />;
	}

	return (
		<Fragment>
			{!loading && todos.length === 0 ? (
				<p>Can't find Todos!</p>
			) : (
				<table className="table table-bordered table-striped table-sm todos-table">
					<thead>
						<tr>
							<th className="table-h-title">Title</th>
							<th className="table-h-message">Message</th>
						</tr>
					</thead>
					<tbody>
						{todos.map((todo) => (
							<TodoItem key={todo.id} contact={todo} />
						))}
					</tbody>
				</table>
			)}
		</Fragment>
	);
};

Todos.propTypes = {
	todo: PropTypes.object.isRequired,
	todos: PropTypes.object,
	getTodos: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	todo: state.todo,
});

export default connect(mapStateToProps, { getTodos })(Todos);
