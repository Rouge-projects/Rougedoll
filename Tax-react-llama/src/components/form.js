import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import AppBar from './AppAppBar'
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  IconButton,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { Snackbar } from '@mui/material';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  grossSalary: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative({ message: "Gross Salary must be a positive number." })
  ),
  city: z.string().nonempty({ message: "City is required." }),
  state: z.string().nonempty({ message: "State is required." }),
  ageGroup: z.enum(["0-60", "60-80", "80+"], {
    message: "Age group is required.",
  }),
  investmentRisk: z.enum(["Low", "Medium", "High"], {
    message: "Investment risk is required.",
  }),
  monthlyRent: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative({ message: "Monthly Rent must be a positive number." })
  ),
  pension: z.preprocess(
    (val) => Number(val),
    z.number().nonnegative({ message: "Pension must be a positive number." })
  ),
  investmentSpecific: z.string().nonempty({ message: "Investment Specific is required." }),
  financialCondition: z.string().nonempty({ message: "Financial Condition is required." }),
});

export default function TaxForm() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [apiResponse, setApiResponse] = useState(null);

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    // Construct the prompt from the form data
    const prompt = `
      Name: ${data.name}
      Gross Salary: ${data.grossSalary}
      City: ${data.city}
      State: ${data.state}
      Age Group: ${data.ageGroup}
      Investment Risk: ${data.investmentRisk}
      Monthly Rent: ${data.monthlyRent}
      Pension: ${data.pension}
      Investment Specific: ${data.investmentSpecific}
      Financial Condition: ${data.financialCondition}

      Based on the above information, provide a details on how to save tax.
    `;

    try {
      const response = await axios.post('	https://taxes-saver-flask-app-ob7bmou7ra-uc.a.run.app/palm2?user_input=', {
        prompt: prompt,
        // Add any other required parameters for your API
      }, {
        headers: {
          'Content-Type': 'application/json',
          // Add any required headers, e.g., authorization
          // 'Authorization': 'Bearer YOUR_API_KEY'
        }
      });

      setApiResponse(response.data);
      setOpenSnackbar(true);
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error submitting to API:", error);
      setOpenSnackbar(true); // You might want to show an error message instead
    } finally {
      setIsLoading(false);
    }
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  // const onSubmit = (data) => {
  //   console.log("Form Data:", data);
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //     setOpenSnackbar(true);
  //   }, 5000);
  // };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar/>

      <Box sx={{
        minHeight: '100vh',
        margin:'100px 0px 0px 0px',
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}>
        <IconButton
          onClick={toggleDarkMode}
          sx={{ position: 'absolute', top: 16, right: 16 }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            maxWidth: 600,
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
            bgcolor: 'background.paper',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Taxes Form
          </Typography>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="grossSalary"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Gross Salary"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.grossSalary}
                helperText={errors.grossSalary?.message}
              />
            )}
          />
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="City"
                fullWidth
                margin="normal"
                error={!!errors.city}
                helperText={errors.city?.message}
              />
            )}
          />
          <Controller
            name="state"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="State"
                fullWidth
                margin="normal"
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            )}
          />
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <Controller
              name="ageGroup"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.ageGroup}>
                  <InputLabel>Age Group</InputLabel>
                  <Select {...field} label="Age Group">
                    <MenuItem value="">Select Age Group</MenuItem>
                    <MenuItem value="0-60">0-60</MenuItem>
                    <MenuItem value="60-80">60-80</MenuItem>
                    <MenuItem value="80+">80+</MenuItem>
                  </Select>
                  {errors.ageGroup && (
                    <Typography variant="caption" color="error">
                      {errors.ageGroup.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
            <Controller
              name="investmentRisk"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.investmentRisk}>
                  <InputLabel>Investment Risk</InputLabel>
                  <Select {...field} label="Investment Risk">
                    <MenuItem value="">Select Investment Risk</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="High">High</MenuItem>
                  </Select>
                  {errors.investmentRisk && (
                    <Typography variant="caption" color="error">
                      {errors.investmentRisk.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </Box>
          <Controller
            name="monthlyRent"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Monthly Rent"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.monthlyRent}
                helperText={errors.monthlyRent?.message}
              />
            )}
          />
          <Controller
            name="pension"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Pension"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.pension}
                helperText={errors.pension?.message}
              />
            )}
          />
          <Controller
            name="investmentSpecific"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Investment Specific"
                fullWidth
                margin="normal"
                error={!!errors.investmentSpecific}
                helperText={errors.investmentSpecific?.message}
              />
            )}
          />
          <Controller
            name="financialCondition"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Financial Condition"
                fullWidth
                margin="normal"
                error={!!errors.financialCondition}
                helperText={errors.financialCondition?.message}
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isLoading}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
          message="Form submitted successfully!"
        />
      </Box>
    </ThemeProvider>
  );
}