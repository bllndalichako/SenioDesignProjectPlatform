import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const skills = [
  'JavaScript',
  'TypeScript',
  'C++',
  'Java',
  'Flutter',
  'React',
  'React Native',
  'Angular',
  'Python',
  'Django',
  'Node.js',
  'Express.js',
  'MongoDB',
  'MySQL',
  'PostgreSQL',
  'Kotlin',
  'Swift',
  'Go',
  'Ruby',
  'CSS',
  'HTML',
  'PHP',
  'Bootstrap',
  'Tailwind CSS',
  'Material UI',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ProfileSetUp = () => {
  const [ideasCount, setIdeasCount] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [personName, setPersonName] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div className="main">
      <Container component="main" maxWidth="sm" sx={{ bgcolor: "white" }}>
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            p: 5,
            borderRadius: 2,
            minWidth: 550,
          }}
        >
          <Typography component="h1" variant="h4" sx={{ color: '#2a3447' }}>
            Set Up Profile
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, minWidth: 400 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  fullWidth
                  id="firstName"
                  label="Project Idea"
                  autoFocus
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
                <FormControl sx={{ m: 1 }} required>
                <InputLabel id="demo-multiple-chip-label">Skills</InputLabel>
                <Select
                  labelId="demo-multiple-chip-label"
                  id="demo-multiple-chip"
                  multiple
                  value={personName}
                  sx={{ minWidth: 400 }}
                  onChange={handleChange}
                  input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {skills.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    // style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
            <Button
              type="submit"
              variant="contained"
              size='large'
              display='flex'
              justifyContent="center" alignItems="center"
              sx={{ mt: 3, mb: 2, bgcolor: '#2a3447', color: 'white' }}
            >
              Complete Setup
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
    </div >
  );
}

export default ProfileSetUp;