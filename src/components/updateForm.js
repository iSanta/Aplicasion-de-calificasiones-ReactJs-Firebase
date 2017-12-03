import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import Colors, {green600, fullWhite} from 'material-ui/styles/colors';
import Item from './individualItem'
import RaisedButton from 'material-ui/RaisedButton';
import FileFileUpload from 'material-ui/svg-icons/file/file-upload';
import firebase from 'firebase';
import Snackbar from 'material-ui/Snackbar';

class updateForm extends Component {
  constructor() {
    super();
    this.state={
      info: null,
      userId: null,
      open: false
    }

    this.saveInfo = this.saveInfo.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this)
  }
  componentWillMount(){
    this.setState({
      info: this.props.info,
      userId: this.props.userId
    })
  }

  handleRequestClose(){
      this.setState({
        open: false,
      });
    };

  saveInfo(){

    //Captura las pocisiones de los inputs que no estan vacias, ademas que saca la cantidad de inputs no vacios
    var count = document.getElementsByClassName("porcentajeItem");
    var positions = [];
    for (var i = 0; i < count.length; i++) {
      var count2 = count[i].children;

      if (count2[1].value != "") {
        //console.log("Porcentaje: " + count2[1].value);
        positions.push(i)
      }
    }


    let asignatureId = this.state.info.asignatureId;
    let notes = positions.length;
    //console.log(notes);
    let signatureName = document.getElementById("nameAs").value;
    let userId = this.state.userId;

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
      asignatureId: asignatureId
    }

    let counter = 0;
    positions.forEach(function(element) {
      let nota = document.getElementById("nota"+element).value;
      let percent = document.getElementById("porcentaje"+element).value;

      nota = nota.replace(",", ".");
      percent = percent.replace("%", "");

      let name = "nota"+counter;
      let name2 = "percent"+counter;

      record[name] = nota;
      record[name2] = percent;

      counter += 1;
    });

    const dbRef = firebase.database().ref('notes/'+userId+'/'+asignatureId);
    dbRef.set(record);


    console.log(record);
    this.setState({
      open: true,
    })


  }

  createAllInputs(){

    var allItems = [];
    for (var i = 0; i < 7; i++) {

      var text1 = "nota"+ i;
      var text2 = "percent"+ i;
      var array = this.state.info;

      allItems.push(<Item index={i} actualNote={array[text1]} actualPercentage={array[text2]}  />);

    }

    return(allItems)
  }

  load(){
    return(
      <div>
        <TextField
          id="nameAs"
          defaultValue={this.state.info.name}
          floatingLabelFocusStyle={{color: green600}}
          underlineFocusStyle={{borderColor: green600}}
        />


          {
            this.createAllInputs()
          }

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
            message="El registro de notas ha sido actualizado."
            autoHideDuration={4000}
            onRequestClose={this.handleRequestClose}
          />


      </div>
    )
  }
  render(){
      return(
        <div>
          {this.load()}


        </div>
      )
  }

}



export default updateForm;
