import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const accessTypes = [
  {
    value: 'senior',
    label: 'Student',
  },
  {
    value: 'advisor',
    label: 'Advisor',
  },
];

const navigate = useNavigate();
const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [accessType, setAccessType] = useState('student');

  const validateEmailAddress = () => {
    const uflEmailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@ufl.edu$");

    if (!uflEmailRegex.test(email)) {
      toast.error('Must Register With Valid UFL Email');
      return false;
    }
    return true;
  }

  const passwordMatch = () => {
    if (password !== '' && password !== confirmPassword) {
      toast.error('Passwords Do Not Match');
      return false;
    } else if (password === '' || confirmPassword === '') {
      toast.error('Please Enter Password');
      return false;
    }
    return true;
  }

  const nameValidation = () => {
    if (firstName === '' || lastName === '') {
      toast.error('Please Enter Your First and Last Name');
      return false;
    }
    return true;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(firstName, lastName, email, password, confirmPassword, accessType);
      if (validateEmailAddress() && passwordMatch() && nameValidation()) {
        const registerRes = axios.post('http://localhost:5555/api/register', {
          firstName,
          lastName,
          email,
          password,
          accessType,
        });
        console.log(registerRes);
        toast.success('Check your mail inbox for a verification code.');
        navigate('/verify');
      }
    } catch (error) {
      console.log(error.message);
    }
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
            Sign Up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12} sm={6} >
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                  sx={{ bgcolor: 'white' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  sx={{ bgcolor: 'white' }}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText="Please enter your UFL email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Role"
                  defaultValue="student"
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  required
                  onChange={(e) => setAccessType(e.target.value)}
                >
                  {accessTypes.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
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
                Sign Up
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Link href="login" variant="body2" sx={{ color: '#2a3447' }} underline="hover">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default SignUp;