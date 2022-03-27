import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import Link from 'next/link';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ModelEditOrUpdate from '../ModelDynamic/ModelEditOrUpdate';
import { useMutation } from 'react-query';
import { deleteTodo } from '../../pages/api/todo';
import { useDrag, useDrop } from 'react-dnd';

export default function TodoItemStatus({ status, items, color, titleSec, subtitleSec, iconEdit }) {
  const [todoList, setTodoList] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemId, setItemId] = useState('');
  const [todoItem, setTodoItem] = useState(null);

  const deleteTodoItem = useMutation((id) => deleteTodo(id));
  const [openModel, setOpenModel] = React.useState(false);
  const [openModelEdit, setOpenModelEdit] = React.useState(false);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'type',
      item: { ...todoItem },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),
    }),
    [todoItem]
  );

  const [collectedProps, drop] = useDrop(() => ({
    accept: 'type',
    drop(item, monitor) {},
  }));
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setItemId(id);
    const todoItem = items && items?.find((item) => item._id === id);
    setTodoItem(todoItem);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModel = () => {
    setOpenModel(true);
  };
  const handleOpenModelEdit = () => {
    setOpenModelEdit(true);
  };
  const handleClosedModel = () => {
    setOpenModel(false);
  };
  const handleClosedModelEdit = () => {
    setOpenModelEdit(false);
  };

  const handleDeleteTodo = () => {
    deleteTodoItem.mutate(itemId);
  };
  useEffect(() => {
    const itemsBasedOnStatus = items?.filter((item) => item.status == status);
    setTodoList(itemsBasedOnStatus);
  }, [items]);
  return (
    <div>
      <div>
        <div style={{ borderLeft: `7px solid ${color}`, display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ margin: '0px 16px' }}>
            <h3 className='title-sec'>{titleSec}</h3>
            <p className='subtitle-sec'>{subtitleSec}</p>
          </div>
          {iconEdit ? (
            <Fab aria-label='edit' style={{ width: '40px', height: '40px', backgroundColor: '#3DA623', color: '#fff', borderRadius: '50%' }} onClick={handleOpenModel}>
              <EditIcon fontSize='20px' />
            </Fab>
          ) : (
            ''
          )}
        </div>
        <div ref={drop}>
          {todoList && todoList.length > 0 ? (
            todoList.map((item) => {
              return (
                <>
                  <div className='task-style' ref={dragRef} style={{ opacity }} key={item._id}>
                    <Link href={`todo/${item._id}`} passHref>
                      {item.title}
                    </Link>
                    <div>
                      <IconButton aria-controls='simple-menu' aria-haspopup='true' onClick={(e) => handleClick(e, item._id)} style={{ padding: '0px' }}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu id='simple-menu' anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon className='list-item-menu' onClick={() => handleDeleteTodo(item._id)}>
                            <Typography variant='inherit' className='text-icon'>
                              Delete
                            </Typography>
                            <IconButton aria-controls='simple-menu' aria-haspopup='true' style={{ padding: '0px' }}>
                              <DeleteIcon fontSize='small' style={{ color: '#BE0909' }} />
                            </IconButton>
                          </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon className='list-item-menu' onClick={handleOpenModelEdit}>
                            <Typography variant='inherit' className='text-icon'>
                              Edit
                            </Typography>
                            <IconButton aria-controls='simple-menu' aria-haspopup='true' style={{ padding: '0px' }}>
                              <EditIcon fontSize='small' style={{ color: '#1695BD' }} />
                            </IconButton>
                          </ListItemIcon>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <p className='text-icon'>No Todo Task Found</p>
          )}
        </div>
      </div>

      <div>
        <ModelEditOrUpdate addTask open={openModel} handleClosedModel={handleClosedModel} />
        <ModelEditOrUpdate id={itemId} item={todoItem} open={openModelEdit} handleClosedModel={handleClosedModelEdit} />
      </div>
    </div>
  );
}
