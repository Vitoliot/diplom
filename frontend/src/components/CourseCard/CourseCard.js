import React from "react";
import CSSModules from "react-css-modules";
import styles from './CourseCard.css'


const CourseCard = (props) => {

}

export default CSSModules(CourseCard, styles, {allowMultiple:true})
// TODO
// Содержит название, описание (до 100 символов), количество заданий, дату создания и автора 
// + кнопку на подробнее (там будет курс с модулями и заданиями) + кнопку на прохождение 
// если курс уже проходится, то кнопку на прохождение выделить другим цветом и текстом
// если курс уже закончен, то кнопку на прохождение выделить другим цветом и текстом
// Получение инфы как входные данные

// import React from "react";
// import Link from 'react-router-dom';
// import Box from '@material-ui/core/Box';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';

// const CourseCard = (course) => (
//   <React.Fragment>
//     <CardContent>
//       <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
//         {course.title}
//       </Typography>
//       <Typography variant="h5" component="div">
//         {course.title}
//       </Typography>
//       <Typography sx={{ mb: 1.5 }} color="text.secondary">
//         adjective
//       </Typography>
//       <Typography variant="body2">
//         well meaning and kindly.
//         <br />
//         {'"a benevolent smile"'}
//       </Typography>
//     </CardContent>
//     <CardActions>
//       <Button size="small">Подробнее</Button>
//       {/* <Button size="small">Д</Button> */}
//     </CardActions>
//   </React.Fragment>
// );

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{CourseCard}</Card>
//     </Box>
//   );
// }