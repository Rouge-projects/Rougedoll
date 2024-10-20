import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import HouseIcon from '@mui/icons-material/House';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SavingsIcon from '@mui/icons-material/Savings';
import PaymentIcon from '@mui/icons-material/Payment';


const items = [
  {
    icon: <CurrencyRupeeIcon />,
    title: 'Income Tax basics',
    description:
      'Income up to ₹2.5 lakh is tax-free, and you can save more by investing in tax-saving instruments under Section 80C.',
  },
  {
    icon: <HouseIcon />,
    title: 'Home Loan Benefits',
    description:
      'Interest on a home loan can save you up to ₹2 lakh per year in tax deductions under Section 24(b).',
  },
  {
    icon: <MonitorHeartIcon />,
    title: 'Health Insurance(80-D)',
    description:
      'You can claim up to ₹25,000 for health insurance premiums under Section 80D, and an additional ₹50,000 if insuring parents.',
  },
  {
    icon: <SavingsIcon />,
    title: 'House rental allowance',
    description:
      'You can claim HRA exemption if you live in a rented house, even if you own property, provided you meet certain conditions.',
  },
  {
    icon: <ShowChartIcon />,
    title: 'Capital Gains Tax',
    description:
      'Long-term capital gains on equity above ₹1 lakh are taxed at 10%, but you can save tax by reinvesting in specified assets.',
  },
  {
    icon: <PaymentIcon />,
    title: 'Tax Deduction(80-C)',
    description:
      'Investments in PPF, ELSS, and NSC can help you save up to ₹1.5 lakh per year in taxes under Section 80C.',
  },
];

export default function dyk() {
  return (
    <Box
      id="dyk"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        color: 'black',
        bgcolor: '#ffffff',
      }}
    >
      <Container
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: { xs: 3, sm: 6 },
        }}
      >
        <Box
          sx={{
            width: { sm: '100%', md: '60%' },
            textAlign: { sm: 'left', md: 'center' },
          }}
        >
          <Typography component="h2" variant="h4">
            Did you Know?
          </Typography>
          {/* <Typography variant="body1" sx={{ color: 'grey.400' }}>
            Explore why our product stands out: adaptability, durability,
            user-friendly design, and innovation. Enjoy reliable customer support and
            precision in every detail.
          </Typography> */}
        </Box>
        <Grid container spacing={2.5}>
          {items.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Stack
                direction="column"
                color="inherit"
                component={Card}
                spacing={1}
                useFlexGap
                sx={{
                  p: 3,
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.800',
                  background: 'transparent',
                  backgroundColor: 'grey.100',
                }}
              >
                <Box sx={{ opacity: '50%',color:'black.800' }}>{item.icon}</Box>
                <div>
                  <Typography fontWeight="medium" variant="body2" sx={{ color: 'black' }} gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'black' }}>
                    {item.description}
                  </Typography>
                </div>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
