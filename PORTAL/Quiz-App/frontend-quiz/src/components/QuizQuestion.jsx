import React, { useState } from 'react';
import { Button, Typography, Container, Grid, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import logo from '../Components/Images/smit.png'; 

const QuizQuestion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const questions = [
    {
      question: 'Q1. What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'Hyperlinks Text Markup Language',
        'Home Tool Markup Language',
        'Hyperlinking Text Mark Language',
      ],
    },
    {
      question: 'Q2. What is the purpose of a front-end web development framework like React or Angular?',
      options: [
        'To manage databases and server-side logic',
        'To handle server-side routing',
        'To create a visually appealing user interface',
        'To interact with web servers',
      ],
    },
    {
      question: 'Q3. What does CSS stand for?',
      options: [
        'Creative Style Sheets',
        'Cascading Style Sheets',
        'Computer Style Sheets',
        'Custom Style Sheets',
      ],
    },
  ];

  const handleAnswer = (selectedAnswer) => {
    setAnswer(selectedAnswer);
    setIsQuestionAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsQuestionAnswered(false);
      setAnswer('');
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setIsQuestionAnswered(false);
    setAnswer('');
    setIsQuizFinished(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2, ml: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
        <img src={logo} alt="Logo" style={{ width: isSmallScreen ? '100px' : '150px' }} />
      </Box>
      <Container maxWidth="md" sx={{ mt: isSmallScreen ? 1 : 4 }}>
        <Paper elevation={3} sx={{ padding: isSmallScreen ? '16px' : '24px', borderRadius: '12px', width: '100%' }}>
          {isQuizFinished ? (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Quiz Finished!
              </Typography>
              <Typography variant="body1" gutterBottom>
                Thank you for completing the quiz.
              </Typography>
              <Button variant="contained" onClick={handleReset} sx={{ padding: '10px 20px', borderRadius: '8px' }}>
                Check Result
              </Button>
            </Box>
          ) : (
            <>
              <Typography variant="h5" component="h2" gutterBottom align="left">
                {questions[currentQuestionIndex].question}
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '16px' }}>
                {questions[currentQuestionIndex].options.map((option, index) => (
                  <Grid item xs={12} sm={6} md={5} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleAnswer(option)}
                      sx={{ width: '100%', maxWidth: '250px' }}
                      disabled={isQuestionAnswered}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ padding: '10px 20px', borderRadius: '8px' }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default QuizQuestion;
