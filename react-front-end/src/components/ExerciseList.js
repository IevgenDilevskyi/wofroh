import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import { makeStyles, styled } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Checkbox from "@material-ui/core/Checkbox";
import Avatar from "@material-ui/core/Avatar";
import CreateWorkoutButton from "./CreateWorkoutButton";
import Timer from "./Timer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    justifyContent: "center",
  },
  alignItemsAndJustifyContent: {
    width: 500,
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function CheckboxListSecondary({ exercises }) {
  const history = useHistory();
  const classes = useStyles();
  const [generatedWorkout, setWorkout] = React.useState([]); // for rendering workout
  const [checked, setChecked] = React.useState([]);
  const exerciseNames = exercises.map((ex) => ex.exercise_name);
  const exerciseTimes = exercises.map((ex) => ex.total_time);
  const exerciseImages = exercises.map((ex) => ex.exercise_picture_url);
  // console.log({ exercises });
  // console.log({ checked });

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleCreateWorkout = () => {
    history.push("/workout", {
      checked: checked.map((obj) => obj.exercise_name),
    });
  };

  const MyButton = styled(Button)({
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  });

  return (
    <List dense className={classes.root}>
      <h1>Exercise List:</h1>
      {exercises.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value.exercise_name}`;
        return (
          <ListItem key={value.exercises_name} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${value.exercises_name}`}
                src={value.exercise_picture_url}
              />
            </ListItemAvatar>
            <ListItemText id={labelId} primary={`${value.exercise_name}`} />

            <ListItemText>{`Exercise Time: ${value.total_time}`}</ListItemText>

            <ListItemSecondaryAction>
              <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "20vh" }}
      >
        <Timer exerciseTimes={checked.map((ex) => ex.total_time)} />
        <CreateWorkoutButton onClick={handleCreateWorkout} />
      </Grid>
    </List>
  );
}

// const handleGenerateExercise = () => {
//   // access endpoint/query with the state value
//   const params = {
//     muscleGroups: selectedMuscleGroups.map((group) => group.id),
//   };
//   axios
//     .get("/api/exercises", { params })
//     //.then((res) => console.log({ res }));
//     .then((res) => {
//       setExercises(res.data.exercises);
//     });
//   // request from server
//   // add responce to state

//   //redirects to exercises page
//   history.push("/exercises");
//   console.log({ generatedExercises });
// };

// const handleCreateWorkout = () => {

//   const params = {
//     checked,
//   };
//   axios
//     .get("/api/workout", { params })
//     .then((res) => {
//       // console.log(res);
//       setWorkout(res.data.workout);
//     })
//     .catch((err) => {
//       console.log({ err });
//     });
//   history.push("/workout");

//   history.push("/workout", { checked })

// };
