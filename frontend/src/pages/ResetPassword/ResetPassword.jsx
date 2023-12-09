import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!passwordMatch()) {
        return;
      }

      const resetPasswordRes = await axios.post(`http://localhost:5555/api/reset-password/${token}`, { password });

      if (resetPasswordRes.status === 200) {
        toast.success('Password successfully reset.');
        navigate('/login');
      }
      else {
        toast.error(resetPasswordRes.data.message);
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
            Reset Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, minWidth: 400 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Enter New Password"
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
                Complete Password Reset
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end" >
              <Grid item>
                <Link href="/forgot-password" variant="body2" sx={{ color: '#2a3447' }} underline="hover">
                  Expired token? Click here to request a new one.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default ResetPassword;