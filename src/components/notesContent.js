import React, { Component } from 'react';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

var dataBaseRef = null;

class notesContent extends Component {
  constructor() {
      super();
      this.state={
        userId: null,
        allNotes: []
      };
  }

  componentWillMount(){
    this.setState({
      userId: this.props.userId,
      notesEmpty: null,
      allNotes: []
    })



    this.loadContent = this.loadContent.bind(this);

    // a veces el bindeo no funciona, asi que ponemos el this en contexto de esta otra forma
    var thisHere = this;

    var userId = this.props.userId;
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
    //-------- Es necesario desmontar la referencia de la base de datos, de no ser asi al volver a cargar el componente simplemente leera el primer registro de la base de datos por alguna razon
    dataBaseRef.off();
  }

  calcule(e){
    console.log(e);
    var prom = 0;
    for (var i = 0; i < e.numberOfNotes; i++) {
      let nota = e["nota"+i];
      let percent = e["percent"+i]
      prom += (nota * (percent/100))
      console.log("Nota: " + nota + " Porcentaje: " + percent/100 + " Promedio: " + prom);
    }
    return(
      <div>{prom.toFixed(2)}</div>
    )
  }

  loadContent(){

    if(this.state.notesEmpty == true){
      return(
        <div>

          <h2>Aun no tienes registrada ninguna asignatura.</h2><p>Dirígete a "Crear asignatura" en el menú principal para comenzar.</p>
        </div>
      )
    }
    else if(this.state.notesEmpty == false){





      return(
        <div className='tableEspace'>
          <div className='tableS'>
            <Table>
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
              <TableBody>
                {
                  this.state.allNotes.map(asignatura => (
                    <TableRow>
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
    else{
      <div>Cargando...</div>
    }



  }

  render(){
    return(
      <Paper>
        <div className='cout'>
          <div className='notesHeader'>
            <h1>Notas</h1>
            <br/>
            <p>En este espacio se podrán observar todas las notas asociadas a esta cuenta.</p>
          </div>
          <br />
          <Divider />
          <br />
          {this.loadContent()}

        </div>
      </Paper>
    );
  }





}




export default notesContent;
