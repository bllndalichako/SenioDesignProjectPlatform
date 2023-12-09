import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useAuth } from '../../context/AuthProvider'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();
  // console.log(useAuth());

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const loginRes = await login(email, password);
      console.log(loginRes);
      navigate('/');
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
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2} >
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
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
                Sign In
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Link href="register" variant="body2" sx={{ color: '#2a3447' }} underline="hover">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Link href="reset-password" variant="body2" sx={{ color: '#2a3447' }} underline="hover">
                 Forgot Password? Reset Password
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Login;