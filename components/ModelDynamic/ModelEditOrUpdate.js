import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import { useMutation } from 'react-query';
import { Checkbox, Grid, TextField, FormControlLabel, Paper, Button } from '@material-ui/core';
import { addTodo, updateTodo } from '../../pages/api/todo';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    background: '#F8F9FA',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '37px',
  },
}));

export default function ModelEditOrUpdate({ addTask, item, id, open, handleClosedModel }) {
  const classes = useStyles();
  const [titleTask, setTitleTask] = useState('');
  const [subjectTask, setSubjectTask] = useState('');
  const [error, setError] = useState(true);
  const addTodoNew = useMutation((newTitle, newSubject) => addTodo(newTitle, newSubject));
  const editTodo = useMutation((id, newTitle, newSubject) => updateTodo(id, newTitle, newSubject));
  const { isLoading } = addTodoNew;

  const handleChangeTitleTask = (e) => {
    setTitleTask(e.target.value);
  };
  const handleChangeSubjectTask = (e) => {
    setSubjectTask(e.target.value);
  };

  const handleAddTodo = () => {
    if (titleTask && subjectTask) {
      addTodoNew.mutate({ title: titleTask, subject: subjectTask });
      setError(false);
      setSubjectTask('');
      setTitleTask('');
    } else {
      setError(true);
    }
  };
  const handleUpdateTodo = () => {
    if (titleTask && subjectTask) {
      editTodo.mutate({ id, title: titleTask, subject: subjectTask });
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setTitleTask(item?.title);
    setSubjectTask(item?.subject);
    if (item?.title && item?.subject) {
      setError(false);
    }
  }, [item]);

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={handleClosedModel}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className='model-width'>
          <div className={classes.paper}>
            <div style={{ padding: 30 }}>
              <Typography variant='headline' component='h1' align='left' className='model-title'>
                {addTask ? 'Add a New Task' : 'Edit Task'}
              </Typography>
              <div style={{ marginBottom: '20px' }}>
                <TextField
                  name='title'
                  fullWidth
                  id='title'
                  label='Title'
                  type={'text'}
                  variant='filled'
                  className='text-filed'
                  required
                  onChange={(e) => handleChangeTitleTask(e)}
                  value={titleTask}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  name='subject'
                  id='subject'
                  label='Subject'
                  type={'text'}
                  variant='filled'
                  className='text-filed'
                  size='medium'
                  style={{ height: '173px' }}
                  required
                  onChange={(e) => handleChangeSubjectTask(e)}
                  value={subjectTask}
                />
              </div>
              {error ? <span style={{ color: 'red', marginTop: '15px', fontFamily: 'sans-serif' }}>please title and subject should not be empty</span> : ''}

              <div style={{ textAlign: 'right' }}>
                {addTask ? (
                  <Button
                    className='button-model'
                    onClick={() => {
                      handleAddTodo();
                    }}
                  >
                    {!isLoading ? 'Add' : 'Loading...'}{' '}
                  </Button>
                ) : (
                  <Button
                    className='button-model'
                    onClick={() => {
                      handleUpdateTodo();
                    }}
                  >
                    {!editTodo.isLoading ? 'Edit' : 'Loading...'}{' '}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </Modal>
  );
}
