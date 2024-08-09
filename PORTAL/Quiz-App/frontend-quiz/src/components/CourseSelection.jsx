import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Paper, Box, Grid, Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
// import logo from './images/smit.png';
// import { motion } from 'framer-motion'; 

const CourseSelection = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const navigate = useNavigate();
  const screenRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      screenRef.current,
      { y: '100%' },
      { y: '0%', duration: 1, ease: 'power2.out' }
    );

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        const uniqueSubjects = [...new Set(response.data.map(q => q.subject))];
        setSubjects(uniqueSubjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, []);

  const handleStartQuiz = () => {
    navigate(`/quiz?subject=${selectedSubject}`);
  };


  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      sx={{ mt: 2, ml: 2 }} // Adjust the margins as needed
    >
      {/* <img src={logo} alt="Logo" style={{ width: isSmallScreen ? '100px' : '150px' }} /> Logo positioned top left */}
      <Container maxWidth="md" sx={{ mt: isSmallScreen ? 1 : 4 }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 5 }}
        >
          <Box
            ref={screenRef}
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ mt: 4 }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: 700,
                boxShadow: 3,
                borderRadius: 2,
                p: isSmallScreen ? 2 : 4,
                backgroundColor: 'white'
              }}
            >
              <Box
                textAlign="center"
                mb={4}
                sx={{
                  maxWidth: '700px',
                  mx: 'auto'
                }}
              >
                <Typography variant="h4" color="primary" gutterBottom fontWeight="900">
                  SELECT YOUR COURSE
                </Typography>
                <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
                  {subjects.map(subject => (
                    <Grid item xs={12} sm={6} md={4} key={subject}>
                      <Paper
                        elevation={6}
                        onClick={() => setSelectedSubject(subject)}
                        sx={{
                          p: isSmallScreen ? 4 : 6,
                          backgroundColor: selectedSubject === subject ? '#7aa94f' : '#0D6DB7', // Change color based on selection
                          color: 'white',
                          textAlign: 'center',
                          borderRadius: 2,
                          minHeight: { xs: 80, sm: 100 } // Responsive height
                        }}
                      >
                        <Typography variant="h6">
                          {subject}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
                <Button
                  variant="contained"
                  onClick={handleStartQuiz}
                  disabled={!selectedSubject}
                  sx={{ mt: 4, backgroundColor: '#0D6DB7', color: 'white' }}
                >
                  Next
                </Button>
              </Box>
            </Box>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CourseSelection;
