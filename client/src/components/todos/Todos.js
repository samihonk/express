import React, { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserTodos } from "../../redux/actions/todoActions";
import TodoItem from "./TodoItem";
import AddTodo from "./AddTodo";
import LoadingSpinner from "../layout/LoadingSpinner";
import "./todos.css";

const Todos = () => {
	const todos = useSelector((state) => state.todo.todos);
	const loading = useSelector((state) => state.todo.loading);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getUserTodos());
	}, [dispatch]);

	if (loading) {
		return <LoadingSpinner />;
	}

	return (
		<Fragment>
			{!loading && todos === null ? (
				<p>Can't find Todos!</p>
			) : (
				<Fragment>
					<table className="table table-bordered table-striped table-sm todos-table">
						<thead>
							<tr>
								<th className="table-h-title">Title</th>
								<th className="table-h-message">Message</th>
								<th className="table-control" />
							</tr>
						</thead>
					</table>
					<AddTodo />
					<table className="table table-bordered table-striped table-sm todos-table table-even">
						<tbody>
							{todos.map((todo) => (
								<TodoItem key={todo.id} contact={todo} />
							))}
						</tbody>
					</table>
				</Fragment>
			)}
		</Fragment>
	);
};

export default Todos;
