import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function (ComposedComponent) {
  class Authenticate extends React.Component {
    state = {
      valid: false,
    }

    componentWillMount() {
      if (!this.props.logged) {
        this.props.history.push('/login');
      } else {
        this.setState({ valid: true });
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.logged) {
        this.props.history.push('/login');
      }
    }

    render() {
      const { valid } = this.state;
      const { user } = this.props;
      return (
        valid
        && <ComposedComponent {...this.props} user={user} />
      );
    }
  }

  const mapStateToProps = store => ({
    logged: store.AppReducer.logged,
    user: store.AppReducer.user,
  });

  return connect(mapStateToProps)(withRouter(Authenticate));
}
