import {
    Typography,
    List,
    ListItem,
    ListItemText
  } from '@mui/material';
  
  const ReviewInfo = ({ formik }) => {
    const { values } = formik;
    return (
      <>
        <Typography variant="overline" >
          Account Details
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={values.email}
            />
          </ListItem>
        </List>
        <Typography variant="overline">
          Personal Information
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="First Name"
              secondary={values.firstName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Name"
              secondary={values.lastName}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Phone Number"
              secondary={values.phone}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Residence"
              secondary={values.residence}
            />
          </ListItem>
        </List>
      </>
    )
  }
  
  export default ReviewInfo