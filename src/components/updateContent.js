import React, { Component } from 'react';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Colors, {green600, fullWhite} from 'material-ui/styles/colors';
import UpdateForm from './updateForm'

  var dataBaseRef = null;
  var key = false

class updateNotes extends Component {

  constructor() {
    super();
    this.state={
      userId: null,
      allNotes: [],
      selected: [],
      notesEmpty: null,
      itemSelected: false,
      lastSelected: null,
      editComponent: [],
      rendered: 0
    }

    this.loadSelectedItem = this.loadSelectedItem.bind(this);
    this.handleRowSelection = this.handleRowSelection.bind(this);

  }

  componentWillMount(){
    this.setState({
      userId: this.props.userId
    })


    var userId = this.props.userId;

    var thisHere = this;
    firebase.database().ref('notes').child(userId).once('value', function(snapshot) {
      if (snapshot.exists()) {
        thisHere.setState({
          notesEmpty: false
        })
      }
      else {
        thisHere.setState({
          notesEmpty: true
        })
      }
    })





    dataBaseRef = firebase.database().ref('notes/'+userId+'/');
    dataBaseRef.on('child_added', snapchot =>{
      this.setState({
        allNotes: this.state.allNotes.concat(snapchot.val())
      })
    })


  }

  componentWillUnmount() {
    dataBaseRef.off();
  }

  calcule(e){

    var prom = 0;
    for (var i = 0; i < e.numberOfNotes; i++) {
      let nota = e["nota"+i];
      let percent = e["percent"+i]
      prom += (nota * (percent/100))

    }
    return(
      <div>{prom.toFixed(2)}</div>
    )
  }

  isSelected = (index) => {
    return this.state.selected.indexOf(index) !== -1;
  };

  handleRowSelection = (selectedRows) => {
    this.setState({
      selected: selectedRows,
    });

    if (selectedRows.length > 0) {
      var allNotes = this.state.allNotes;

      this.setState({
        itemSelected: true,
        editComponent: allNotes[selectedRows]
      })
    }
    else {
      this.setState({
        itemSelected: false
      })
    }

  };



  loadSelectedItem(){
    if(this.state.itemSelected== true){

      var lastSelected = this.state.editComponent;
        return(
          <UpdateForm userId={this.state.userId} info={lastSelected} />
        )
    }
    else{
      return(
        <div>Seleccione uno de los ítems de la lista para comenzar a editarlo.</div>
      )
    }
  }

  loadContent(){

    if(this.state.notesEmpty == true){
      return(
        <div>
          <h2>Aun no tienes s registrada ninguna asignatura. </h2><p>Dirígete a "Crear asignatura" en el menú principal para comenzar.</p>
        </div>
      )
    }
    else if(this.state.notesEmpty == false){
      return(
        <div className='tableEspace'>
          <div className='tableS'>
            <Table onRowSelection={this.handleRowSelection}>
              <TableHeader>
                <TableRow>
                  <TableHeaderColumn>Nombre de la asignatura</TableHeaderColumn>
                  <TableHeaderColumn>Nota #1 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #2 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #3 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #4 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #5 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #6 - %</TableHeaderColumn>
                  <TableHeaderColumn>Nota #7 - %</TableHeaderColumn>
                  <TableHeaderColumn>Promedio final</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody deselectOnClickaway={false}>
                {
                  this.state.allNotes.map( (asignatura, index) => (
                    <TableRow key={index} selected={this.isSelected(index)}>
                      <TableRowColumn>{asignatura.name}</TableRowColumn>
                      <TableRowColumn>{asignatura.nota0} - {asignatura.percent0}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota1} - {asignatura.percent1}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota2} - {asignatura.percent2}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota3} - {asignatura.percent3}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota4} - {asignatura.percent4}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota5} - {asignatura.percent5}%</TableRowColumn>
                      <TableRowColumn>{asignatura.nota6} - {asignatura.percent6}%</TableRowColumn>
                      <TableRowColumn>{
                        this.calcule(asignatura)
                      }</TableRowColumn>
                    </TableRow>
                  ))
                }

              </TableBody>
            </Table>
          </div>
        </div>
      )
    }
  }


  render(){
    return(
      <Paper>
        <div className='cout'>
          <div className='notesHeader'>
            <h1>Actualizador de notas</h1>
            <br/>
            <p>En este espacio podrás editar las asignaturas que haya creado previamente.</p>
          </div>
          <br />
          <Divider />
          <br />
          {this.loadContent()}
          <br />
          <Divider />
          <br />
          {this.loadSelectedItem()}
        </div>
      </Paper>
    )
  }
}


export default updateNotes;
