import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from './store/history';
import store from './store/configureStore';
import App from './App';
import '@blueprintjs/core/lib/css/blueprint.css';

const MOUNT_NODE = document.querySelector('#app');

const render = () => {
	ReactDOM.render(
		<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</Provider>,
		MOUNT_NODE,
	);
};

render();
