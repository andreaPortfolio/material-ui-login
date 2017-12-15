import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {push} from 'react-router-redux';
import {connect} from 'react-redux';
import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
} from '@devexpress/dx-react-grid';

import {
  TableCell,

  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Table
} from 'material-ui';

import {
    Grid, TableHeaderRow, TableView,TableEditColumn,PagingPanel,
} from '@devexpress/dx-react-grid-material-ui';


import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';
import { withStyles } from 'material-ui/styles';



const styles = theme => ({
  commandButton: {
    minWidth: '40px',
  },
  lookupEditCell: {
    verticalAlign: 'top',
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit * 1.25,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
  inputRoot: {
    width: '100%',
  },
});


const AddButton = ({ onExecute }) => (
    <div style={{ textAlign: 'center' }}>
        <Button
            color="primary"
            onClick={onExecute}
            title="Create new row"
        >
            New
        </Button>
    </div>
);
AddButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
};

const EditButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Edit row">
        <EditIcon />
    </IconButton>
);
EditButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
};

const DeleteButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Delete roe">
        <DeleteIcon />
    </IconButton>
);
DeleteButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
};

const CommitButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Save changes">
        <SaveIcon />
    </IconButton>
);
CommitButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
};

const CancelButton = ({ onExecute }) => (
    <IconButton color="accent" onClick={onExecute} title="Cancel changes">
        <CancelIcon />
    </IconButton>
);
CancelButton.propTypes = {
    onExecute: PropTypes.func.isRequired,
};

//Buttons


const commandComponents = {
    add: AddButton,
    edit: EditButton,
    delete: DeleteButton,
    commit: CommitButton,
    cancel: CancelButton,
};


const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
        <CommandButton
            onExecute={onExecute}
        />
    );
};
Command.propTypes = {
    id: PropTypes.string.isRequired,
    onExecute: PropTypes.func.isRequired,
};

//////END BUTTON SECTION





const getRowId = row => row.id;

class Users extends React.PureComponent {
  constructor(props) {
      super(props);

      this.state = {
          users: [],
          pages: {current: 1, hasNext: false, hasPrev: false, next: 2, prev: 0, total: null},
          columns: [
              {name: 'firstName', title: 'Nome'},
              {name: 'lastName', title: 'Cognome'},
              {name: 'email', title: 'Email'},
              {name: 'lastLogin', title: 'Lastest Login'}
          ],
          rows: [],
          sorting: [],
          editingRows: [],
          addedRows: [],
          changedRows: {},
          currentPage: 0,
          deletingRows: [],
          pageSize: 0,
          allowedPageSizes: [5, 10, 0],
          columnOrder: ['firstName', 'lastName', 'email', 'lastLogin'],
      };
  }





  componentDidMount() {

      this.getUsers();



  }

  getUsers =() =>{

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

      axios.get(`http://localhost:8000/user`).then(response =>{
          console.log('response', response)
          const users = response.data.docs;
          const pages = response.data.pages;
          this.setState({users})
      }).catch((error ) => {


          if (error.response.status === 401) {
              //if request is unauthorized redirect to login page
              this.props.dispatch(push("/login"));
          }
      });
  }

    commitChanges = ({ added, changed, deleted }) => {
        let { rows } = this.state;
        if (added) {
            const startingAddedId = (rows.length - 1) > 0 ? rows[rows.length - 1].id + 1 : 0;
            rows = [
                ...rows,
                ...added.map((row, index) => ({
                    id: startingAddedId + index,
                    ...row,
                })),
            ];
        }
        if (changed) {
            rows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
        }
        this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
    };


  render() {
    const {
      classes,
    } = this.props;
    const {
      users,
      pages,
      rows,
      columns,
      sorting,
      editingRows,
      addedRows,
      changedRows,
      currentPage,
      deletingRows,
      pageSize,
      allowedPageSizes,
      columnOrder,
    } = this.state;

    return (
        <Grid
            rows={users}
            columns={columns}>


            <PagingState
                currentPage={pages.curent}
                onCurrentPageChange={this.changeCurrentPage}
                pageSize={10}
                onPageSizeChange={this.changePageSize}
            />

            <LocalPaging />
            <TableView />
            <EditingState
                editingRows={editingRows}
                onEditingRowsChange={this.changeEditingRows}
                changedRows={changedRows}
                onChangedRowsChange={this.changeChangedRows}
                addedRows={addedRows}
                onAddedRowsChange={this.changeAddedRows}
                onCommitChanges={this.commitChanges}
            />
            <TableEditColumn
                width={120}
                allowAdding={!this.state.addedRows.length}
                allowEditing
                allowDeleting
                commandComponent={Command}
            />
            <TableHeaderRow />
            <PagingPanel />
        </Grid>
    );
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {authenticated: state.reducers.auth.authenticated};
}

export default connect(mapStateToProps)(withStyles(styles)(Users));