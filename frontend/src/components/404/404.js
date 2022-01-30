import React from "react";
import { Link } from "react-router-dom";
import styles from "./404.css";
import CSSModules from "react-css-modules";

const InvalidRoute = () => (
	<section className='wrapper' styleName='wrapper'>
		<div className='contentWrapper' styleName='contentWrapper'>
			<img src="./404.webp" />
			<Link to={'/'}><button text={"Back to main page"} onClick={() => {}} /></Link>
		</div>
	</section>
);

export default CSSModules(InvalidRoute, styles, {allowMultiple:true});
