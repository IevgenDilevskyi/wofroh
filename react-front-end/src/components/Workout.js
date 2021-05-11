import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Video from "./Video";
import Timer from "./Timer";
import { Button } from "./Button";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function Workout() {
  const { state } = useLocation();
  const classes = useStyles();
  const [data, setData] = React.useState([]);
  const [selectedExercise, setSelectedExercise] = React.useState([]);
  const [videoURL, setVideoURL] = React.useState(null);
  // const [workoutName, setWorkoutName] = React.useState("");

  console.log({ data });
  const handleVideoURL = (video) => {
    setVideoURL(video);
  };

  // const handleWorkoutName = () => {};

  const handleSaveWorkout = () => {
    const params = {
      exerciseIDs: data.map((ex) => ex.id),
      workoutName: "The Nally Express",
      workoutTime: data
        .map((obj) => obj.total_time)
        .reduce((total, num) => total + num, 0),
    };
    console.log({ params });
    axios
      .post("/api/workout", params)
      .then((res) => {
        console.log({ res });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  React.useEffect(() => {
    // console.log("state=", state);
    const params = {
      checked: state.checked,
    };
    axios
      .get("/api/workout", { params })
      .then((res) => {
        console.log("response=res", res);
        setData(res.data.exercises);
        setSelectedExercise(res.data.exercises);
        setVideoURL(res.data.exercises[0].exercise_video_url);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);
  console.log({ videoURL });

  let my_rows = data.map((item) => ({
    name: item.exercise_name,
    video: item.exercise_video_url,
  }));
  console.log("my rows=", my_rows, data);

  return (
    data.length > 0 && (
      <>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Exercise Name</TableCell>
                <TableCell align="right">Time(m)</TableCell>
                <TableCell align="right">Sets</TableCell>
                <TableCell align="right">Reps</TableCell>
                <TableCell align="right">Muscle Group</TableCell>
                <TableCell align="right">Intensity</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(
                ({
                  exercise_name,
                  total_time,
                  num_of_sets,
                  num_of_reps,
                  muscle_group_id,
                  intensity,
                  rating,
                  exercise_video_url,
                  title,
                  exercise_picture_url,
                  exercise_info,
                }) => (
                  <TableRow
                    key={exercise_name}
                    onClick={() => handleVideoURL(exercise_video_url)}
                  >
                    <IconButton edge="start">
                      <TableCell component="th" scope="row">
                        {exercise_name}
                      </TableCell>
                    </IconButton>
                    <TableCell align="right">{total_time}</TableCell>
                    <TableCell align="right">{num_of_sets}</TableCell>
                    <TableCell align="right">{num_of_reps}</TableCell>
                    <TableCell align="right">{title}</TableCell>
                    <TableCell align="right">{intensity}</TableCell>
                    <TableCell align="right">{rating}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Timer exerciseTimes={data.map((obj) => obj.total_time)} />
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSyze="btn--large"
          href="/savedworkouts"
          onClick={handleSaveWorkout}
        >
          Save Workout
        </Button>
        <Video videoURL={videoURL} />
      </>
    )
  );
}
