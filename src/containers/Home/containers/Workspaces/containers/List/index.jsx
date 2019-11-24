import React from 'react';
import Cookie from 'utils/cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { makeSelectWorkspace } from 'containers/Home/store/selectors';

const List = ({ workspaces }) => {
	const [activeWs, setActiveWs] = React.useState(null);

	React.useEffect(() => {
		const ws = Cookie.get('active_workspace');
		if (ws) {
			setActiveWs(parseInt(ws));
		}
	}, [])

	return (
		<div className={'workspaces'}>
			My Workspaces
			<table className={'workspace-table'}>
				<thead>
					<tr>
						<th></th>
						<th>Workspace</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{workspaces.map(ws => (
						<tr key={ws.id}>
							<td></td>
							<td>{ws.name} {ws.id === activeWs ? 'Default' : ''}</td>
							<td>{ws.archived_at ? 'Active' : 'Archived'}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="workspace-create">
				<div className="workspace-create_text">
					<Link to={'/'}>create new workspace</Link>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = createStructuredSelector({
	workspaces: makeSelectWorkspace(),
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(List);
