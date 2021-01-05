import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./layout/Header";
import "./app.css";

const App = () => {
	return (
		<Router>
			<Header />
			<div className="row">
				<div className="col-sm-2 d-sm-none d-md-block" />
				<div className="content col-sm">
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Exercitationem fugiat soluta sit dignissimos
						minima dolore qui totam temporibus eum facilis delectus,
						aspernatur asperiores voluptates unde nobis sunt, ipsam
						incidunt nulla.
					</p>
					<p>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Nesciunt vitae, ab inventore, id nobis vero iste
						et, recusandae quidem veritatis cum veniam asperiores.
						Accusamus, ea nulla? Quo hic doloremque natus?
					</p>
					<p>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit. Reiciendis minus impedit earum quo harum ducimus
						temporibus laboriosam atque, porro ut fuga perferendis
						illum dolore enim quasi qui! Quidem, sapiente laborum?
					</p>
				</div>
				<div className="col-sm-2 d-none d-xl-block" />
			</div>
		</Router>
	);
};

export default App;
