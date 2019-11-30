import React from 'react';

const Project = () => {
	const [count, increment] = React.useState(0)
	React.useEffect(() => {
		console.log('project mount')
		return () => {
			console.log('project unmount')
		}
	}, [])
	console.log('project update')
	return (
		<div>
			<h1>Project</h1>
			<button onClick={() => increment(count + 1)}>{count}</button>
		</div>
	)
}

export default Project;
