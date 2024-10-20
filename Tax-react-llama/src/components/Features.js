import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import CalculateIcon from '@mui/icons-material/Calculate';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';

const items = [
  {
    icon: <CalculateIcon />,
    title: 'Tax saving Calculator',
    description:
      'Our Tax Saving Calculator helps you estimate your potential savings by inputting various financial details. It provides a detailed breakdown of how different deductions, investments, and exemptions can impact your overall tax liability',
    imageLight: 'url("/assets/calc.png")',
    imageDark: 'url("/assets/calc.png")',
  },
  {
    icon: <LibraryBooksIcon />,
    title: 'Personalized tax plans',
    description:
      'With Personalized Tax Saving Plans, our app generates tailored strategies based on your financial profile. Leveraging advanced AI, it suggests specific actions and investments that maximize your savings and optimize your tax outcomes.',
    imageLight: 'url("/assets/books.png")',
    imageDark: 'url("/assets/books.png")',
  },
  {
    icon: <SupervisorAccountIcon />,
    title: 'Profession-specific tax advice',
    description:
      'Receive expert tax advice tailored to your profession, whether you\'re an IT employee, entrepreneur, or freelancer. Our app offers specialized tips and deductions relevant to your job role, ensuring you make the most of your tax-saving opportunities.',
    imageLight: 'url("/static/images/templates/templates-images/devices-light.png")',
    imageDark: 'url("/static/images/templates/templates-images/devices-dark.png")',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 2, sm: 10 } }}>
      <Typography component="h2" variant="h4" color="text.primary" sx={{ mb: 2 }}>
        Product features
      </Typography>

      {/* Stack for mobile layout */}
      <Stack
        direction="column"
        spacing={2}
        sx={{ width: '100%', display: { xs: 'flex', sm: 'none' } }}
      >
        {items.map(({ icon, title, description }, index) => (
          <Card
            key={index}
            variant="outlined"
            component={Button}
            onClick={() => handleItemClick(index)}
            sx={{
              p: 2,
              height: 'fit-content',
              backgroundColor:
                selectedItemIndex === index ? 'action.selected' : undefined,
              borderColor: (theme) => {
                if (theme.palette.mode === 'light') {
                  return selectedItemIndex === index
                    ? 'primary.light'
                    : 'grey.200';
                }
                return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'left',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  color: (theme) => {
                    if (theme.palette.mode === 'light') {
                      return selectedItemIndex === index
                        ? 'primary.main'
                        : 'grey.300';
                    }
                    return selectedItemIndex === index
                      ? 'primary.main'
                      : 'grey.700';
                  },
                }}
              >
                {icon}
              </Box>
              <Box>
                <Typography
                  color="text.primary"
                  variant="body2"
                  fontWeight="bold"
                >
                  {title}
                </Typography>
                <Typography
                  color="text.secondary"
                  variant="body2"
                  sx={{ my: 0.5 }}
                >
                  {description}
                </Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Stack>

      {/* Grid for desktop layout */}
      <Grid container spacing={2} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        {items.map(({ icon, title, description }, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              component={Button}
              onClick={() => handleItemClick(index)}
              sx={{
                p: 2,
                height: 'fit-content',
                backgroundColor:
                  selectedItemIndex === index ? 'action.selected' : undefined,
                borderColor: (theme) => {
                  if (theme.palette.mode === 'light') {
                    return selectedItemIndex === index
                      ? 'primary.light'
                      : 'grey.200';
                  }
                  return selectedItemIndex === index ? 'primary.dark' : 'grey.800';
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  textAlign: 'left',
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    color: (theme) => {
                      if (theme.palette.mode === 'light') {
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.300';
                      }
                      return selectedItemIndex === index
                        ? 'primary.main'
                        : 'grey.700';
                    },
                  }}
                >
                  {icon}
                </Box>
                <Box>
                  <Typography
                    color="text.primary"
                    variant="body2"
                    fontWeight="bold"
                  >
                    {title}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    sx={{ my: 0.5 }}
                  >
                    {description}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
