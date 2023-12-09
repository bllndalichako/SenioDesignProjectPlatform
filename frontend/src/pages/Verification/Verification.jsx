import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthProvider';

const Verification = ({ fName, lName, uflEmail, pass, role }) => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const { storeRegisteredEmail, login } = useAuth();

  const handleSubmit = async (event) => {
    console.log("In handleSubmit");
    try {
      event.preventDefault();
      console.log(uflEmail, role);
      const verificationRes = await axios.post(`http://localhost:5555/api/register/verify/${verificationCode}`, {
        firstName: fName,
        lastName: lName,
        email: uflEmail,
        password: pass,
        accessType: role,
      });

      console.log(verificationRes);
      if (verificationRes.status === 200) {
        // console.log("In verificationRes.status === 200")
        storeRegisteredEmail(uflEmail);
        const loginRes = await login(uflEmail, pass);
        console.log(loginRes);
        toast.success(verificationRes.data.message);
        navigate('/profile-setup');
      } else if (verificationRes.status === 100) {
        // console.log("In verificationRes.status === 100")
        toast.error(verificationRes.data.message);
        navigate('/login');
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
            Enter Verification Code
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, minWidth: 400 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="code"
                  label="Verification Code"
                  name="code"
                  autoComplete="code"
                  onChange={(e) => setVerificationCode(e.target.value)}
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
                Verify
              </Button>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Verification;