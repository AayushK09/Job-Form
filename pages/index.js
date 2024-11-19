import { useState } from 'react';
import { TextField, Button, Typography, Container, Alert, Paper } from '@mui/material';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobTitle: '',
  });

  const [alert, setAlert] = useState({
    message: '',
    severity: '', // 'success' or 'error'
    open: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
    } else {
      setAlert({
        message: `Error: ${data.message}`,
        severity: 'error',
        open: true,
      });
    }
    setTimeout(() => {
      setAlert({ ...alert, open: false });
    }, 5000); // 5000ms = 5 seconds

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
            required
            variant="outlined"
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
            required
            variant="outlined"
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Job Title"
            placeholder="Enter your preferred job"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            fullWidth
            required
            variant="outlined"
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
            }}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Home;
