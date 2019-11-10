import React from 'react';

const Sidebar = ({ style = {} }) => (
	<svg width="16" height="20" viewBox="0 0 16 20" style={style} xmlns="http://www.w3.org/2000/svg">
		<path
			d="M2 0H14C14.5304 0 15.0391 0.210714 15.4142 0.585786C15.7893 0.960859 16 1.46957 16 2V18C16 18.5304 15.7893 19.0391 15.4142 19.4142C15.0391 19.7893 14.5304 20 14 20H2C1.46957 20 0.960859 19.7893 0.585786 19.4142C0.210714 19.0391 0 18.5304 0 18V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0V0ZM2 6V14H6V6H2Z"
		/>
	</svg>
);

export default Sidebar;