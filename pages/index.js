import { useState } from 'react';
import { TextField, Button, Typography, Container, Alert, Paper, CircularProgress, FormControl } from '@mui/material';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });

  const [alert, setAlert] = useState({
    message: '',
    severity: '',
    open: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.jobTitle) {
      setAlert({
        message: 'All fields are required!',
        severity: 'error',
        open: true,
      });

      setTimeout(() => {
        setAlert({ ...alert, open: false });
      }, 3000);

      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setAlert({
          message: 'Registration successful!',
          severity: 'success',
          open: true,
        });

        setFormData({
          name: '',
          email: '',
          jobTitle: '',
        });
      } else {
        setAlert({
          message: `Error: ${data.message}`,
          severity: 'error',
          open: true,
        });
      }
    } catch (error) {
      setAlert({
        message: 'Registration failed. Please try again later.',
        severity: 'error',
        open: true,
      });
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setAlert({ ...alert, open: false });
    }, 2000);
  };

  return (
    <Container maxWidth="xs" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%', maxWidth: 400 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', marginBottom: 3 }}>
          Register for Tech Jobs
        </Typography>

        {/* Alert message */}
        {alert.open && (
          <Alert
            severity={alert.severity}
            sx={{ marginBottom: 2 }}
            onClose={() => setAlert({ ...alert, open: false })}
          >
            {alert.message}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            autoComplete="off"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Email Address"
            placeholder="Enter your email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            autoComplete="off"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Job Title"
            placeholder="Enter your preferred job"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            autoComplete="off"
            sx={{ marginBottom: 2 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              padding: '10px',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {loading ? <CircularProgress size={24} color='white' /> : 'Submit'}
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Home;
