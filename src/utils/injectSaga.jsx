import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ReactReduxContext } from 'react-redux';

import getInjectors from './sagaInjectors';

export default ({ key, saga, mode }) => WrappedComponent => {
	class InjectSaga extends React.Component {
		static WrappedComponent = WrappedComponent;

		static contextType = ReactReduxContext;

		static displayName = `withSaga(${WrappedComponent.displayName ||
			WrappedComponent.name ||
			'Component'})`;

		injectors = getInjectors(this.context.store);

		constructor(props, context) {
			super(props, context);

			this.injectors = getInjectors(context.store);
			this.injectors.injectSaga(key, { saga, mode }, this.props);
		}

		componentWillUnmount() {
			this.injectors.ejectSaga(key);
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	return hoistNonReactStatics(InjectSaga, WrappedComponent);
};
