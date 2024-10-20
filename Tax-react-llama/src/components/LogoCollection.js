import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/system';

const whiteLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
  'https://icon.icepanel.io/GCP/svg/Vertex-AI.svg',
  'https://icon.icepanel.io/GCP/svg/Cloud-Run.svg',
  'https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-ar21.svg',
  'https://www.svgrepo.com/show/452092/react.svg'
];

const darkLogos = [
  'https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg',
  'https://icon.icepanel.io/GCP/svg/Vertex-AI.svg',
  'https://icon.icepanel.io/GCP/svg/Cloud-Run.svg',
  'https://www.vectorlogo.zone/logos/pocoo_flask/pocoo_flask-ar21.svg',
  'https://www.svgrepo.com/show/452092/react.svg'
];

const logoStyle = {
  width: '100px',
  height: '80px',
  margin: '0 32px',
  opacity: 0.9,
};

export default function LogoCollection() {
  const theme = useTheme();
  const logos = theme.palette.mode === 'light' ? darkLogos : whiteLogos;

  return (
    <Box id="logoCollection" sx={{ py: 4 }}>
      <Typography
        component="p"
        variant="subtitle2"
        align="center"
        color="text.secondary"
      >
        Tech Stack
      </Typography>
      <Grid container justifyContent="center" sx={{ mt: 0.5, opacity: 0.9 }}>
        {logos.map((logo, index) => (
          <Grid item key={index}>
            <img
              src={logo}
              alt={`Tech ${index + 1}`}
              style={logoStyle}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
