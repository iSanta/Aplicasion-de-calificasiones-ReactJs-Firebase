import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Gatete from '../img/gato.jpg'

class homeContent extends Component {

  render(){
    return(
      <Paper>
        <div className='cout'>
          <Card >
            <CardHeader
              title="Imagen de un gato."
              subtitle="Las imágenes de gatos son importantes."
            />
            <CardMedia
              overlay={<CardTitle title="Un gato en su máximo esplendor." subtitle="Un gato posa plácidamente ante la mirada atenta del fotógrafo." />}
            >
              <img src={Gatete} alt="" />
            </CardMedia>
            <CardTitle title="Información Importante." subtitle="O tal vez no..." />
            <CardText>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
              Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
              Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
            </CardText>
          </Card>
        </div>
      </Paper>
    )
  }
}

export default homeContent;
