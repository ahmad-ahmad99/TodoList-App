import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TodoListStatus from './TodoListStatus';
import { withStyles } from '@material-ui/core/styles';

function TodoList(props) {
  return (
    <Box sx={{ flexGrow: 0, padding: '20px' }}>
      <Grid container sx={{ gap: 4, flexGrow: 0 }} rowSpacing={2} columnSpacing={2} justifyContent='center'>
        <Grid item xs={12} sm={12} md={4} lg={2.5} xl={2.5} className='box-style'>
          <TodoListStatus item iconEdit items={props.items} status='todo' color='#F66568' titleSec='TO Do' subtitleSec='Things that need to be done.' />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2.5} xl={2.5} className='box-style'>
          <TodoListStatus item items={props.items} status='doing' color='#FFC773' titleSec='Doing' subtitleSec='What you are doing.' />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2.5} xl={2.5} className='box-style'>
          <TodoListStatus item items={props.items} status='done' color='#6BE795' titleSec='Done' subtitleSec='Things that need to be done.' />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2.5} xl={3} className='box-style'>
          <TodoListStatus item items={props.items} status='archive' color='#7389FF' titleSec='Archive' subtitleSec='Things that need to be done.' />
        </Grid>
      </Grid>
    </Box>
  );
}
export default withStyles()(TodoList);
