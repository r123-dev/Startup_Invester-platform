
// import * as React from 'react';
// import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import FormControl from '@mui/material/FormControl';
// import Link from '@mui/material/Link';
// import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import Stack from '@mui/material/Stack';
// import MuiCard from '@mui/material/Card';
// import { styled } from '@mui/material/styles';
// import ForgotPassword from '../components/ForgotPassword';
// import AppTheme from '../shared-theme/AppTheme';
// import ColorModeSelect from '../shared-theme/ColorModeSelect';
// import { GoogleIcon, SitemarkIcon } from '../components/CustomIcons';
// import {jwtDecode} from 'jwt-decode'; // install: npm install jwt-decode

// // Styled components
// const Card = styled(MuiCard)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   [theme.breakpoints.up('sm')]: {
//     maxWidth: '450px',
//   },
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

// const SignInContainer = styled(Stack)(({ theme }) => ({
//   height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
//   minHeight: '100%',
//   padding: theme.spacing(2),
//   [theme.breakpoints.up('sm')]: {
//     padding: theme.spacing(4),
//   },
//   '&::before': {
//     content: '""',
//     display: 'block',
//     position: 'absolute',
//     zIndex: -1,
//     inset: 0,
//     backgroundImage:
//       'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//     backgroundRepeat: 'no-repeat',
//     ...theme.applyStyles('dark', {
//       backgroundImage:
//         'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//     }),
//   },
// }));

// export default function SignIn(props) {
//   const navigate = useNavigate();

//   const [emailError, setEmailError] = React.useState(false);
//   const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
//   const [passwordError, setPasswordError] = React.useState(false);
//   const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
//   const [open, setOpen] = React.useState(false);

//   // ✅ Check token validity and redirect if already logged in
//   React.useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         if (decoded.exp * 1000 > Date.now()) {
//           navigate('/Mainpage');
//         } else {
//           localStorage.removeItem('authToken');
//         }
//       } catch (error) {
//         localStorage.removeItem('authToken');
//       }
//     }
//   }, [navigate]);

//   const handleClickOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   // ✅ Input validation
//   const validateInputs = () => {
//     const email = document.getElementById('email');
//     const password = document.getElementById('password');
//     let isValid = true;

//     if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
//       setEmailError(true);
//       setEmailErrorMessage('Please enter a valid email address.');
//       isValid = false;
//     } else {
//       setEmailError(false);
//       setEmailErrorMessage('');
//     }

//     if (!password.value || password.value.length < 6) {
//       setPasswordError(true);
//       setPasswordErrorMessage('Password must be at least 6 characters long.');
//       isValid = false;
//     } else {
//       setPasswordError(false);
//       setPasswordErrorMessage('');
//     }

//     return isValid;
//   };

//   // ✅ Handle login API call
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     if (!validateInputs()) return;

//     const data = new FormData(event.currentTarget);
//     const user = {
//       email: data.get('email'),
//       password: data.get('password'),
//     };

//     try {
//       const response = await fetch('http://localhost:8080/api/auth/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(user),
//       });

//       if (response.ok) {
//         const result = await response.json();

//         // assuming backend returns { token: "JWT_TOKEN" }
//         if (result.token) {
//           localStorage.setItem('authToken', result.token);
//           navigate('/Mainpage');
//         } else {
//           alert('Login failed: token not received');
//         }
//       } else {
//         const errorData = await response.json();
//         alert(errorData.message || 'Invalid email or password');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Something went wrong. Please try again later.');
//     }
//   };

//   return (
//     <AppTheme {...props}>
//       <CssBaseline enableColorScheme />
//       <SignInContainer direction="column" justifyContent="space-between">
//         <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
//         <Card variant="outlined">
//           <SitemarkIcon />
//           <Typography
//             component="h1"
//             variant="h4"
//             sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
//           >
//             Sign in
//           </Typography>

//           <Box
//             component="form"
//             onSubmit={handleSubmit}
//             noValidate
//             sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
//           >
//             <FormControl>
//               <FormLabel htmlFor="email">Email</FormLabel>
//               <TextField
//                 error={emailError}
//                 helperText={emailErrorMessage}
//                 id="email"
//                 type="email"
//                 name="email"
//                 placeholder="your@email.com"
//                 autoComplete="email"
//                 required
//                 fullWidth
//                 variant="outlined"
//                 color={emailError ? 'error' : 'primary'}
//               />
//             </FormControl>

//             <FormControl>
//               <FormLabel htmlFor="password">Password</FormLabel>
//               <TextField
//                 error={passwordError}
//                 helperText={passwordErrorMessage}
//                 name="password"
//                 placeholder="••••••"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 required
//                 fullWidth
//                 variant="outlined"
//                 color={passwordError ? 'error' : 'primary'}
//               />
//             </FormControl>

//             <ForgotPassword open={open} handleClose={handleClose} />
//             <Button type="submit" fullWidth variant="contained">
//               Sign in
//             </Button>

//             <Link
//               component="button"
//               type="button"
//               onClick={handleClickOpen}
//               variant="body2"
//               sx={{ alignSelf: 'center' }}
//             >
//               Forgot your password?
//             </Link>
//           </Box>

//           <Divider>or</Divider>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//             <Button
//               fullWidth
//               variant="outlined"
//               onClick={() => alert('Sign in with Google')}
//               startIcon={<GoogleIcon />}
//             >
//               Sign in with Google
//             </Button>

//             <Typography sx={{ textAlign: 'center' }}>
//               Don&apos;t have an account?{' '}
//               <Link href="/SignupEnthusiast" variant="body2">
//                 Sign up
//               </Link>
//             </Typography>
//           </Box>
//         </Card>
//       </SignInContainer>
//     </AppTheme>
//   );
// }
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import ForgotPassword from '../components/ForgotPassword';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { GoogleIcon, SitemarkIcon } from '../components/CustomIcons';
import { jwtDecode } from 'jwt-decode';

// 🎨 Styled components
const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: { maxWidth: '450px' },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(4) },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const navigate = useNavigate();

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);

  // ✅ Auto redirect if token already valid
  React.useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          navigate('/Mainpage');
        } else {
          localStorage.removeItem('authToken');
        }
      } catch {
        localStorage.removeItem('authToken');
      }
    }
  }, [navigate]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ✅ Validate inputs
  const validateInputs = (email, password) => {
    let valid = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return valid;
  };

  // ✅ Handle login
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   const email = data.get('email');
  //   const password = data.get('password');

  //   if (!validateInputs(email, password)) return;

  //   try {
  //     const response = await fetch('http://localhost:8080/api/auth/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     let tokenData;
  //     try {
  //       tokenData = await response.json();
  //     } catch {
  //       tokenData = await response.text();
  //     }

  //     const token =
  //       typeof tokenData === 'string' ? tokenData : tokenData.token;

  //     if (response.ok && token) {
  //       localStorage.setItem('authToken', token);
  //       navigate('/Mainpage');
  //     } else {
  //       const message =
  //         (tokenData && tokenData.message) || 'Invalid email or password';
  //       alert(message);
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     alert('Something went wrong. Please try again later.');
  //   }
  // };
  const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const email = data.get('email');
  const password = data.get('password');

  if (!validateInputs(email, password)) return;

  try {
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    // ✅ Read content type safely — avoid reading twice
    const contentType = response.headers.get('content-type');
    let tokenData;

    if (contentType && contentType.includes('application/json')) {
      tokenData = await response.json();
    } else {
      tokenData = await response.text();
    }

    const token =
      typeof tokenData === 'string' ? tokenData : tokenData.token;

    if (response.ok && token) {
      localStorage.setItem('authToken', token);
      
      navigate('/Mainpage');
    } else {
      const message =
        (tokenData && tokenData.message) || 'Invalid email or password';
      alert(message);
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('Something went wrong. Please try again later.');
  }
};

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <SignInContainer direction="column" justifyContent="space-between">
        <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                fullWidth
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                id="password"
                name="password"
                type="password"
                placeholder="••••••"
                autoComplete="current-password"
                required
                fullWidth
              />
            </FormControl>

            <ForgotPassword open={open} handleClose={handleClose} />

            <Button type="submit" fullWidth variant="contained">
              Sign in
            </Button>

            <Link
              component="button"
              type="button"
              onClick={handleClickOpen}
              variant="body2"
              sx={{ alignSelf: 'center' }}
            >
              Forgot your password?
            </Link>
          </Box>

          <Divider>or</Divider>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => alert('Sign in with Google')}
              startIcon={<GoogleIcon />}
            >
              Sign in with Google
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
              Don’t have an account?{' '}
              <Link href="/SignupEnthusiast" variant="body2">
                Sign up
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}