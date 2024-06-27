import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Show() {
  const [batch, setBatch] = React.useState([]);
  const [expanded, setExpanded] = React.useState({});

  React.useEffect(() => {
    fetch('http://localhost:3001/admin/courses', {
      method: 'GET',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then((res) => res.json())
    .then((data) => {
      setBatch(data.courses);
      // Initialize the expanded state for each course
      const initialExpandedState = {};
      data.courses.forEach(course => {
        initialExpandedState[course.id] = false;
      });
      setExpanded(initialExpandedState);
    });
  }, []);

  const handleExpandClick = (courseId) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [courseId]: !prevExpanded[courseId],
    }));
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {batch.map((course) => (
        <Box id={course.id}>
            <Card sx={{ maxWidth: 345, margin: '10px' }} key={course.id}>
          <CardMedia
            component="img"
            height="210"
            image={course.imageLink}
            alt="100xdev"
            style={{
                objectFit: 'cover',      
              }}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <b>Title:</b><br />
              <i>{course.title}</i><br />
              <b>Price:</b><br />
              <i>$</i>{course.price}<br />
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded[course.id]}
              onClick={() => handleExpandClick(course.id)}
              aria-expanded={expanded[course.id]}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[course.id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph><b>Description:</b></Typography>
              <Typography paragraph>
                <i>{course.description}</i>
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        </Box>
      ))}
    </div>
  );
}

export default Show;
