import React,{Component} from 'react';
import Swal from 'sweetalert2'

import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component';
import { getPersonalInformations, desactivePersonalInformation } from '../../../actions/personalAction'
import { FaList, FaRegEdit, FaTrash, FaSearch, FaUndoAlt } from 'react-icons/fa';
import { Dropdown, Container, Row, Col, Button, InputGroup, FormControl, Form } from 'react-bootstrap';
import _ from 'lodash';
import './css/styles.css';

const customStyles = {
  headRow: {
    style: {
      border: 'none',
    },
  },
  headCells: {
    style: {
      color: '#202124',
      fontSize: '14px',
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: 'rgb(230, 244, 244)',
      borderBottomColor: '#FFFFFF',
      borderRadius: '25px',
      outline: '1px solid #FFFFFF',
    },
  },
  pagination: {
    style: {
      border: 'none',
    },
  },
};

class PersonalInformationListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      searchText: '',
      foundPersonalInformations: [],
      searchTextIsEmpty: true,
      searchOptions: [
        {
            title: 'Primer Nombre',
            value: 'pi_first_name',
        },
        {
            title: 'Primer Apellido',
            value: 'pi_first_surname',
        },
        {
            title: 'Correo E.',
            value: 'pi_email',
        },
        {
            title: 'Genero',
            value: 'pi_gender',
        }
      ],
      selectedOptionSearch: 'pi_first_name',
    };
  }

  componentDidMount(){
    const { dispatchPersonalInformationList } = this.props
    dispatchPersonalInformationList().then((response) => {
        this.setPersonalInformationData(response)
    })
  }

  setPersonalInformationData = (data) => {
    this.setState({
        data,
        foundPersonalInformations: data
    });
  }

  findPI = (curatedSearchString, personalsinformations) => {
    const {
      selectedOptionSearch,
    } = this.state

    return personalsinformations.filter(
      (personalinf) => {
        let curatedPIValue = selectedOptionSearch === 'pi_gender'
          ? personalinf[selectedOptionSearch].role_name.toLowerCase()
          : personalinf[selectedOptionSearch].toLowerCase()
          curatedPIValue = _.deburr(curatedPIValue)

        return curatedPIValue.includes(curatedSearchString)
      },
    )
  }

  handleSearchInputChange = (event) => {
    const targetValue = event.target.value;
    this.setState({ searchText: targetValue });
    this.setState({ searchTextIsEmpty: targetValue === '' })
  }

  handleChangeOption = (event) => {
    const targetValue = event.target.value;
    this.setState({ selectedOptionSearch: targetValue });
  }
  
  handleReset = (event) => {
    event.preventDefault();
    const { data } = this.state
    this.setState({
      foundPersonalInformations: data,
      searchText: '',
      searchTextIsEmpty: true,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      searchText, data,
    } = this.state

    let curatedSearchString = searchText.toLowerCase()
    curatedSearchString = _.deburr(curatedSearchString)

    const foundPersonalInformations = this.findPI(curatedSearchString, data)

    this.setState({ foundPersonalInformations })
  }

  searchText = () => {
    const {
      searchText, searchTextIsEmpty, selectedOptionSearch, searchOptions
    } = this.state
    return (
      <Col xs={12} lg={12}>
        <Row>
          <Col xs={6} sm={4} lg={2} className="mb-2 offset-3 offset-sm-4 offset-lg-0">
            <Link className="btn btn-outline-success" to="/panel/personal-information" style={{width: '100%'}}>Agregar PI</Link>
          </Col>
          <Col xs={12} sm={12} lg={6} className="offset-lg-3">
            <form onSubmit={this.handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <Form.Control as="select" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0', zIndex: '1'}} onChange={(e) => this.handleChangeOption(e)} value={selectedOptionSearch}>
                        {searchOptions.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.title}
                        </option>
                        ))}
                    </Form.Control>
                </InputGroup.Prepend>
                <FormControl value={searchText} onChange={this.handleSearchInputChange} placeholder="Enter a Word" aria-describedby="basic-addon1" />
                <InputGroup.Append>
                    <Button onClick={this.handleSubmit} variant="outline-secondary"><FaSearch style={{ pointerEvents: 'none' }} /></Button>
                    <Button onClick={this.handleReset} hidden={searchTextIsEmpty} variant="outline-secondary"><FaUndoAlt  style={{ pointerEvents: 'none' }}/></Button>
                </InputGroup.Append>
              </InputGroup>
            </form>
          </Col>
        </Row>
      </Col>
    )
  }

  removePersonalInformation = (id) => {
    const { dispatchDeletePersonalInformation } = this.props;

    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: '¡Sí, bórralo!'
    }).then(async (result) => {
      if (result.value) {
        const resp = await dispatchDeletePersonalInformation(id);
        
        if (resp.data.success) {
          Swal.fire(
            'Eliminado!',
            'Su archivo ha sido eliminado.',
            'success'
          )

          const { personalInformationList, test } = this.props
          console.log('test: ', test);

          this.setPersonalInformationData(personalInformationList);

        } else {
          Swal.fire(
            'Error!',
            'Su archivo no fue eliminado.',
            'error'
          )
        }
      }
    });
  }

  columnsDataTable = ([
    {
      name: 'Nombre Completo',
      cell: row => (
        `${row.pi_prefix} ${row.pi_first_name} ${row.pi_second_name} ${row.pi_first_surname} ${row.pi_second_surname}`
      ),
      allowOverflow: true,
      sortable: true,
    },
    {
      name: 'Genero',
      selector: 'pi_gender.gender_name',
      sortable: true,
    },
    {
        name: 'DUI',
        selector: 'pi_DUI',
        sortable: true,
    },
    {
        name: 'NIT',
        selector: 'pi_NIT',
        sortable: true,
    },
    {
      name: 'Fecha Nacimiento',
      selector: 'pi_birthdate',
      sortable: true,
    },
    {
      name: 'Actions',
      cell: row => (
        <Dropdown >
          <Dropdown.Toggle      
            className="ddl-menu"   
          >
            <FaList className="icon-ddl-menu" />
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            <Dropdown.Item href={`/panel/personal-information/${_.get(row, '_id')}`}><FaRegEdit className="icon-ddl-menu" /> Editar</Dropdown.Item>
            <Dropdown.Item onClick={() => this.removePersonalInformation(_.get(row, '_id')) }><FaTrash className="icon-ddl-menu" /> Desactivar</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ),
      allowOverflow: true,
      button: true,
    },
  ]);

  render() {
    const { loading, foundPersonalInformations } = this.state;
        
    return (
      <Container>
        <Row style={{ borderColor: 'rgb(0,0,0,0.5) !important' }}>
          <Col>
            <DataTable
              columns={this.columnsDataTable}
              progressPending={loading}
              data={foundPersonalInformations}
              pagination
              customStyles={customStyles}
              highlightOnHover
              pointerOnHover
              subHeader
              subHeaderComponent={this.searchText()}
            />
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = state => ({personalInformationList: _.values(state.personalReducer.list), test: state})
  

const mapDispatchToProps = dispatch => ({
    dispatchPersonalInformationList: () => dispatch(getPersonalInformations()),
    dispatchDeletePersonalInformation: (id) => dispatch(desactivePersonalInformation(id)),
  });
  
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PersonalInformationListPage));

