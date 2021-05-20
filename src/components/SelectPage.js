import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: "white"
  },
}));

function SelectPage(props) {
  const classes = useStyles();
  const [page, setPage] = useState(props.counter + 1);
  const [open, setOpen] = useState(false);
  const [total, setTotal] = useState(props.pages);

  useEffect(()=>{
    setPage(props.counter + 1);
  }, [props.counter]);

  const handleChange = (event) => {
    setPage(event.target.value -1);
    props.newCount(event.target.value - 1);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const keyPress = (e) => {
    e = e || window.event
    
    if(e.keyCode == '37') {
      props.counter > 0 && props.newCount(prev => prev - 1);
    }
    else if(e.keyCode == '39') {
      props.counter < (props.pages.length - 1) && props.newCount(prev => prev + 1);
    }
  }

  return (
    <div>
        <div onKeyDown={keyPress} style={{margin: "theme.spacing(1)"}}>
            <button onClick={() => {props.counter > 0 && props.newCount(prev => prev - 1)}}>{"<"}</button>
            <button onClick={() => {props.counter < (props.pages.length - 1) && props.newCount(prev => prev + 1)}}>{">"}</button>
        </div>
        
        <FormControl className={classes.formControl}>
            <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={page}
            onChange={handleChange}
            >
            {total.map((item, id) => <MenuItem value={id + 1}>{id+1}</MenuItem> )}
            </Select>
        </FormControl>
    </div>
  );
}

export default SelectPage;