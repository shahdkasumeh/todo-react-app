import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { TodosContext } from "./TodosContext";

//Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

//Dialog

export default function Todo({ todo, handleCheck }) {
  const [ShowDeleteDialog, setShowDeleteDialog] = useState(false);
  const [ShowUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const { todos, setTodos } = useContext(TodosContext);

  //--------functions---------------
  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  //---------functions---------------

  return (
    <>
      {/*Delete Dialog */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={ShowDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo the operation after it is completed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Undo</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/*Delete Dialog */}
      {/*-------------------------------------------- */}
      {/*Update Dialog */}
      <Dialog
        onClose={handleUpdateClose}
        open={ShowUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Update The Task:</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="Title"
            label="Task Title"
            fullWidth
            variant="standard"
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
            }}
          />

          <TextField
            margin="dense"
            id="Details"
            label="Task Details"
            fullWidth
            variant="standard"
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Undo</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
      {/*Update Dialog */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#DE998E",
          marginTop: 5,
          color: "white",
          fontFamily: "num2",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*Update Button */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  background: "white",
                  color: "#4a4cc3ff",
                  border: "solid #4a4cc3ff 3px ",
                }}
              >
                <EditIcon />
              </IconButton>
              {/*Update Button */}
              {/*------------------------------------------*/}
              {/*Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  background: "white",
                  color: "#b21717ff",
                  border: "solid #b21717ff 3px ",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {/*Delete Button */}
              {/*---------------------------------------------------- */}
              {/*check icon */}
              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  border: "solid #8bc34a 3px ",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/*check icon */}
            </Grid>

            <Grid item xs={8}>
              <Typography
                variant="h4"
                sx={{
                  color: "black",
                  textAlign: "right",
                  marginTop: "15px",
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "black", textAlign: "right" }}
              >
                {todo.details}
              </Typography>{" "}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
