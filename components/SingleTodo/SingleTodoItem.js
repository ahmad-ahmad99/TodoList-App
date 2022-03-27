import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Link from 'next/link';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
function SingleTodo(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container direction='row' justifyContent='center'>
        <Grid item xs={12} sm={12} md={12} lg={8} xl={8} justifyContent='center' alignContent='center'>
          <Typography variant='headline' component='h1' align='left' className='detail-title'>
            Task Details
          </Typography>
          <Card className='box-single-todo'>
            <CardContent>
              <Typography variant='headline' component='h3' className='box-single-todo-titles'>
                Name
              </Typography>
              <Typography component='p' className='box-single-todo-par'>
                {props.title}
              </Typography>

              <Typography variant='headline' component='h3' className='box-single-todo-titles'>
                subject
              </Typography>
              <Typography component='p' className='box-single-todo-par'>
                {props.subject}
              </Typography>
              <Typography variant='headline' component='h3' className='box-single-todo-titles'>
                Status
              </Typography>
              <Typography component='p' className='box-single-todo-par' style={{ display: 'flex' }}>
                <FiberManualRecordIcon style={{ color: '#5EB149', width: '0.9rem', marginRight: '1.2rem' }} />
                {props.status}
              </Typography>
            </CardContent>
          </Card>
          <div style={{ textAlign: 'right' }}>
            <Link href='/' passHref>
              <Button className='button-link'>back</Button>
            </Link>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
export default withStyles(styles)(SingleTodo);
