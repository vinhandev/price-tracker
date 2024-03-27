import Tab from '@/HOCs/Tab';
import { Label } from '@/components/atoms';
import TextInput from '@/components/atoms/Inputs/TextInput/TextInput';
import { useUser } from '@/store';
import { addRating, getRating } from '@/utils';
import { Box, Button, Rating } from '@mui/material';
import { useEffect, useState } from 'react';

export default function RatingTab() {
  const uid = useUser((state) => state.user?.uid);
  const [star, setStar] = useState(5);
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = async () => {
    if (uid) {
      addRating(uid, star, feedback);
      alert('update feedback success');
    }
  };

  useEffect(() => {
    async function fetchFeedback() {
      if (uid) {
        const data = await getRating(uid);
        if (data !== null) {
          setStar(() => data.rating);
          setFeedback(() => data.description);
        }
      }
    }
    void fetchFeedback();
  }, [uid]);

  return (
    <Tab title="Rating">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingTop: '20px',
        }}
      >
        <Box>
          <Label label="It's great that you can add some feedbacks for us to improve our website" />
          <Rating
            value={star}
            onChange={(_, rate) => setStar(rate ?? 0)}
            name="half-rating"
            precision={0.5}
          />
        </Box>
        <TextInput
          multiline
          placeholder="Enter your feedbacks here"
          rows={5}
          value={feedback}
          onChange={setFeedback}
          label="Let's leaving some feedbacks"
          isError={false}
          errorText=""
        />
        <Button onClick={handleSubmitFeedback} variant="contained">
          Submit your feedback
        </Button>
      </Box>
    </Tab>
  );
}
