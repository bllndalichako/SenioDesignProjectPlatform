import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

const accessTypes = [
  {
    value: 'Advisor',
    label: 'Advisor',
  },
  {
    value: 'Student',
    label: 'Student',
  },
];

const SignUp = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" >
                <TextField
                  id="outlined-select-currency-native"
                  select
                  label="Role"
                  defaultValue="Student"
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                  required
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