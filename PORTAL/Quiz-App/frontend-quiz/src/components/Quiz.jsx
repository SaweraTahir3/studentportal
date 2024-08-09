import React, { Link, useEffect, useState } from 'react';
import axios from 'axios';
// import Quiz from './components/Quiz';
import { Button, Typography, Container, Grid, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Result from './Result';
import {setCorrectOption} from './Admindashboard'
import { CircularProgress, Link as MuiLink } from '@mui/material';


const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showResult, setShowResult] = useState(false); // New state for showing result
  let [score, setScore] = useState(0); 
  const [correctOption, setCorrectOption] = useState('');

  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { selectedSubject } = location.state || {};


  // const location = useLocation();
  const query = new URLSearchParams(location.search);
  const subject = query.get('subject');

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        const filteredQuestions = response.data.filter(q => q.subject === subject);
        setQuestions(filteredQuestions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [subject]);
  
  // const handleAnswer = (selectedAnswer) => {
  //   setSelectedOption(selectedAnswer);
  //   console.log(selectedAnswer)
  //   setIsQuestionAnswered(true);
  //   console.log(isQuestionAnswered)
  //   console.log(questions[currentQuestionIndex].correctOption)
  //   console.log(selectedAnswer)
  //   if (selectedAnswer == questions[currentQuestionIndex].correctOption) {

  //     setScore(score++); // Increase score if correct
  //   }console.log(score)
  

  // };
  let handleAnswer = (selectedAnswer) => {
    console.log("Selected Answer", selectedAnswer)
    // setSelectedOption(selectedAnswer);
    // console.log('Selected Option:', selectedOption);

    setIsQuestionAnswered(true);
    // console.log('Is Question Answered:', isQuestionAnswered);
      


    // Debugging logs for questions and currentQuestionIndex
    // console.log('Questions:', questions);
    // console.log('Current Question Index:', currentQuestionIndex);

    let currentQuestion = questions[currentQuestionIndex];
  // console.log('Current Question:', currentQuestion); // Log the current question
    console.log(currentQuestion.correct)
  try {
    if (selectedAnswer === currentQuestion.correct) {
      setScore(prevScore => prevScore + 1); // Use prevScore to ensure proper state update
      console.log('Score:', score + 1);
      
    } 
  } catch (error) {
    console.error('An error occurred:', error.message);
    
  }
  console.log('Final Score:', score);
  return score;
};
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsQuestionAnswered(false);
      setSelectedOption(null);
    } else {
      setIsQuizFinished(true);
      // Save result to the database
      axios.post('http://localhost:5000/api/results/submit', {
        userId: 'sampleUserId', // Replace with actual user ID
        score,
        totalQuestions: questions.length
      })
      .then(response => console.log('Result saved:', response.data))
      .catch(error => console.error('Error saving result:', error));
    }
  };

  const handleReset = () => {
    setCurrentQuestionIndex(0);
    setIsQuestionAnswered(false);
    setSelectedOption(null);
    setIsQuizFinished(false);
    setScore(0); // Reset score
    setShowResult(true); // Show result after quiz completion
  };

  if (showResult) {
    return <Result score={score} totalQuestions={questions.length} />;
  }

  if (questions.length === 0) {
    return <Typography>Loading questions...</Typography>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const percentage = (score / totalQuestions) * 100;
  return (
     <Box display="flex" flexDirection="column" alignItems="flex-start" sx={{ mt: 2, ml: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
      </Box>
      <Container maxWidth="md" sx={{ mt: isSmallScreen ? 1 : 4 }}>
        <Paper elevation={3} sx={{ padding: isSmallScreen ? '16px' : '24px', borderRadius: '12px', width: '100%' }}>
          {isQuizFinished ? (
            // <Box sx={{ textAlign: 'center' }}>
            //   <Typography variant="h4" component="h2" gutterBottom>
            //     Quiz Finished!
            //   </Typography>
            //   <Typography variant="body1" gutterBottom>
            //     Your score is: {score}/{questions.length}
            //   </Typography>
            //   <Button variant="contained" onClick={handleReset}  sx={{ padding: '10px 20px', borderRadius: '8px' }}>
            //     Check Result
            //   </Button>
            // </Box>
            <div style={{ 
              height: '100vh', 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              backgroundColor: '#f8f9fa' 
            }}>
              
              <Container
                sx={{
                  width: { xs: '90%', sm: '80%', md: '60%' }, // Responsive width
                  minHeight: { xs: '50%', sm: '60%', md: '60%' }, // Reduced height for mobile view
                  boxShadow: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontWeight: 'medium',
                  gap: 3,
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: { xs: '20px', sm: '30px', md: '40px' }, // Responsive padding
                  border: '1px solid #dee2e6',
                }}
              >
                <Typography variant="h4" sx={{ 
                  color: '#0D6DB7', 
                  marginBottom: '15px', 
                  fontWeight: 'bold', 
                  textAlign: 'center' 
                }}>
                  Congratulations! 
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: '#495057', 
                  marginBottom: '15px', 
                  textAlign: 'center' 
                }}>
                  You have completed the quiz.
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: '#495057', 
                  marginBottom: '5px', 
                  textAlign: 'center' 
                }}>
                  Total Questions: {totalQuestions}
                </Typography>
                <Typography variant="h6" sx={{ 
                  color: '#495057', 
                  marginBottom: '20px', 
                  textAlign: 'center' 
                }}>
                  Correct Questions: {score}
                </Typography>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: '40px',
                  }}
                >
                  <CircularProgress variant="determinate" value={percentage} size={120} sx={{ color: '#0D6DB7' }} />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h5" component="div" sx={{ color: 'black', fontWeight: 'bold' }}>
                      {`${Math.round(percentage)}%`}
                    </Typography>
                  </Box>
                </Box>
                <MuiLink
                  component={Link}
                  to="/start"
                  underline="none"
                  sx={{
                    backgroundColor: '#0D6DB7',
                    '&:hover': {
                      backgroundColor: '#7aa94f',
                    },
                    color: 'white',
                    fontSize: { xs: '2rem', sm: '1rem' }, // Responsive font size
                    padding: '20px 30px',
                    borderRadius: '5px',
                    textAlign: 'center',
                  }}
                >
                  Return to Home
                </MuiLink>
              </Container>
            </div>
          ) : (
            <>
              <Typography variant="h5" component="h2" gutterBottom align="left">
                {currentQuestion.question}
              </Typography>
              <Grid container spacing={2} justifyContent="center" sx={{ marginTop: '16px' }}>
                {['a', 'b', 'c', 'd'].map(optionKey => (
                  <Grid item xs={12} sm={6} md={5} key={optionKey} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleAnswer(currentQuestion[optionKey])}
                      sx={{
                        width: '100%',
                        maxWidth: '250px',
                        backgroundColor: selectedOption === currentQuestion[optionKey] ? 'secondry.light' : 'primary.light',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: selectedOption === currentQuestion[optionKey] ? 'secondary.dark' : 'primary.dark',
                        },
                      }}
                      disabled={isQuestionAnswered}
                    >
                      {currentQuestion[optionKey]}
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

export default Quiz;
