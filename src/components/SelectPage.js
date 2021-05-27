import React,{ useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useKey = (key, cb) =>{
  const callbackRef = useRef(cb);

  useEffect(()=>{
    callbackRef.current = cb;
  })

  useEffect(()=>{
    function handle(event){
      if(event.code === key){
        callbackRef.current(event);
      }
    }
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [key]);
}

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    //marginTop: theme.spacing(2),
  },
  formControl: {
    //margin: theme.spacing(1),
    width: 50,
    backgroundColor: "white",
    position: "fixed",
    marginLeft: "46.95vw",
    marginTop: "5vw"
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

  const handleNext = () => {
    if(!props.vert && props.counter < (props.pages.length - 1)){
      props.newCount(prev => prev + 1);
    }
  }

  const handlePrev = () => {
    if(!props.vert && props.counter > 0){
      props.newCount(prev => prev - 1);
    }
  }

  return (
    <div>
      {useKey("ArrowRight", handleNext)}
      {useKey("ArrowLeft", handlePrev)}
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