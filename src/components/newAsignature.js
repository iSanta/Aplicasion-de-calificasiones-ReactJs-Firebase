import React, { Component } from 'react';
import firebase from 'firebase';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import RaisedButton from 'material-ui/RaisedButton';

import Colors, {lightGreen500, deepOrange500, green600, fullWhite} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

class newAsignature extends Component {
  constructor(){
    super();
    this.state={
      numberOfNotes: 0,
      arrayNotes: [],
      userId: null,
      open: false
    }


    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.inputs = this.inputs.bind(this);
    this.suma = this.suma.bind(this);
    this.resta = this.resta.bind(this);
    this.pseudoComponent = this.pseudoComponent.bind(this);
    this.saveInfo = this.saveInfo.bind(this);
  }

  handleRequestClose(){
    this.setState({
      open: false,
    });
  };


  componentWillMount(){
    this.setState({
      userId: this.props.userId
    })
  }


  pseudoComponent(e){
    var arrayNotesVar = []
    var inputs = e;


    for (var i = 1; i < inputs+1; i++) {
      arrayNotesVar.push("Nota #"+i);
    }
    this.setState({
      arrayNotes: arrayNotesVar
    })
  }

  inputs(i){
    var notaText = "Nota #"+i;
      return(
        <TextField floatingLabelText={notaText} />
      );
  }

  suma(){
    var tem = this.state.numberOfNotes;
    if(tem >=7){
      var tem2= 7;
    }else{
      var tem2 = tem+1;
    }

    this.setState({
      numberOfNotes: tem2
    })

    this.pseudoComponent(tem2);
  }
  resta(){
    var tem = this.state.numberOfNotes;
    if(tem <= 0){
      var tem2 = 0;
    }
    else{
      var tem2 = tem-1;
    }

    this.setState({
      numberOfNotes: tem2
    })
    this.pseudoComponent(tem2);
  }

  saveInfo(){
    let notes = this.state.numberOfNotes;
    let signatureName = document.getElementById("nameAs").value;
    let userId = this.state.userId;

    let randomNumber = Math.floor((Math.random() * 100) + 1);

    var nota1, nota2, nota3, nota4, nota5, nota6, nota7, nota8, nota9, nota10 = 0;
    var percent1, percent2, percent3, percent, percent5, percent6, percent7, percent8, percent9, percent10 = 0;

    var record = {
      name: signatureName,
      numberOfNotes: notes,
      nota1: 0,
      nota2: 0,
      nota3: 0,
      nota4: 0,
      nota5: 0,
      nota6: 0,
      nota7: 0,
      nota8: 0,
      nota9: 0,
      nota0: 0,
      percent1: 0,
      percent2: 0,
      percent3: 0,
      percent4: 0,
      percent5: 0,
      percent6: 0,
      percent7: 0,
      percent8: 0,
      percent9: 0,
      percent0: 0,
      asignatureId: userId+signatureName+randomNumber
    }

    for (var i = 0; i < notes; i++) {
      let nota = document.getElementById("nota"+i).value;
      let percent = document.getElementById("porcentaje"+i).value;

      nota = nota.replace(",", ".");
      percent = percent.replace("%", "");

      let name = "nota"+i;
      let name2 = "percent"+i;

      record[name] = nota;
      record[name2] = percent;
    }




    const dbRef = firebase.database().ref('notes/'+userId+'/'+userId+signatureName+randomNumber);
    dbRef.set(record);
    console.log(record);
    this.setState({
      open: true,
    })
  }

  render(){

    return(
      <Paper>
        <div className='cout'>
        <div className='notesHeader'>
          <h1>Asignatura</h1>
          <br/>
          <p>Cree una asignatura nueva, con esta podrá hacer un seguimiento a un conjunto de notas.</p>
        </div>
          <br />
          <Divider />
          <br />

          <TextField
            id="nameAs"
            floatingLabelText="Nombre de la asignatura"
            floatingLabelFocusStyle={{color: green600}}
            underlineFocusStyle={{borderColor: green600}}
          />
          {
            this.state.arrayNotes.map(function(item, i){
              return (
                <div>
                  <TextField
                    floatingLabelFocusStyle={{color: green600}}
                    underlineFocusStyle={{borderColor: green600}}
                    floatingLabelText={item}
                    id={"nota"+i}
                  />
                  <TextField
                    floatingLabelFocusStyle={{color: green600}}
                    underlineFocusStyle={{borderColor: green600}}
                    style={{marginLeft: "20px"}}
                    floatingLabelText={"Porcentaje de la nota #" + (i+1)}
                    id={"porcentaje"+i}
                  />
                  <br />
                </div>
              )
            })
          }
          <div className='transition'>
            <br />
            <FloatingActionButton onClick={this.suma} style={{margin: "5px"}} backgroundColor={lightGreen500}>
              <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton onClick={this.resta} style={{margin: "5px"}} backgroundColor={deepOrange500}>
              <ContentRemove />
            </FloatingActionButton>
          </div>
          <div className='transition'>
            <br />
            <RaisedButton
              backgroundColor={green600}
              label="Guardar"
              labelPosition="before"
              labelColor={fullWhite}
              icon={<FileFileUpload />}
              onClick={this.saveInfo}
            />
            <Snackbar
              open={this.state.open}
              message="La asignatura ha sido guardada correctamente."
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
          </div>
          <br />
        </div>
      </Paper>
    )
  }
}

export default newAsignature;
