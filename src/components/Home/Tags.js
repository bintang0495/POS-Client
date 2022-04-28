import { Button, Typography } from '@mui/material';

// import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTag } from '../../actions/product';

const BtnTags = (props) => {
  const { value, variant, tagValue, setTagValue } = props;
  const [newVariant, setNewVariant] = useState(variant);
  const newTag = tagValue?.filter((tag) => tag !== value);

  const changeVariant = () => {
    if (newVariant === 'contained') {
      setTagValue(newTag);
      setNewVariant('outlined');
    } else {
      setTagValue([...tagValue, value]);
      setNewVariant('contained');
    }
  };

  return (
    <Button
      size='small'
      color='success'
      variant={newVariant}
      sx={{ borderRadius: '10px', marginRight: '5px' }}
      onClick={changeVariant}>
      #{value}
    </Button>
  );
};

const Tags = ({ tagValue, setTagValue }) => {
  const tags = useSelector((state) => state.tagReducers);

  return (
    <>
      <Typography sx={{ fontWeight: 'bold' }} variant='body2' mb={3} mt={5}>
        Tags :{' '}
        {tags?.map((tag) => {
          return (
            <BtnTags
              value={tag.name}
              variant='outlined'
              key={tag._id}
              tagValue={tagValue}
              setTagValue={setTagValue}
            />
          );
        })}
      </Typography>
    </>
  );
};

export default Tags;
