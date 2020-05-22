import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { getPersonalInformations } from '../../../actions/personalAction';
import Formik from '../globalComponents/formPersonalInformation';
import _ from 'lodash';

class UserForm extends Component {
  state = {
    validated: false,
    setValidated: false,
    initialData: { 
      pi_first_name: "",
      pi_second_name: "",
      pi_first_surname: "",
      pi_second_surname: "",
      pi_married_lastname: "",
      pi_DUI: "",
      pi_NIT: "",
      pi_birthdate: new Date(),
      pi_phone: "",
      pi_address: "",
      pi_email: "",
      pi_gender: "",
    },
  };

  componentDidMount() {
    const {
      dispatchGetPersonalInformation, personalInformation
      
    } = this.props;
 
    dispatchGetPersonalInformation()
    if (personalInformation) {
      this.populateForm()
    }
  }

  componentDidUpdate(prevProps) {
    const { personalInformation } = this.props;

    if (_.get(personalInformation, '_id') !== _.get(prevProps.personalInformation, '_id')) {
      this.populateForm()
    }

  }

  populateForm = () => {
    const { personalInformation } = this.props;
    this.setState({
        initialData: {
          pi_first_name: personalInformation.pi_first_name,
          pi_second_name: personalInformation.pi_second_name,
          pi_first_surname: personalInformation.pi_first_surname,
          pi_second_surname: personalInformation.pi_second_surname,
          pi_married_lastname: personalInformation.pi_married_lastname,
          pi_DUI: personalInformation.pi_DUI,
          pi_NIT: personalInformation.pi_NIT,
          pi_birthdate: new Date(personalInformation.pi_birthdate),
          pi_phone: personalInformation.pi_phone,
          pi_address: personalInformation.pi_address,
          pi_email: personalInformation.pi_email,
          pi_gender: _.get(personalInformation.pi_gender, '_id'), 
        },
    });  
  }

  render() {
      const { initialData } = this.state;
      const { personalInformation } = this.props;
    return (
      <div>
        <Formik
              initialData={initialData}
              personalInformation={personalInformation}
            />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  personalInformation: state.personalReducer.list[ownProps.match.params.id],
});


const mapDispatchToProps = {
  dispatchGetPersonalInformation: getPersonalInformations,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserForm));