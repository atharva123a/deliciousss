import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Searched = () => {
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  const params = useParams();

  useEffect(() => {
    getSearchedItems(params.search);
  }, [params.search]);

  const getSearchedItems = async (query) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&number15`
    );
    const recipes = await data.json();

    setSearchedRecipes(recipes.results);
  };
  return (
    <Grid>
      {searchedRecipes.map((item) => {
        return (
          <Card>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        );
      })}
    </Grid>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
    height: 100%;
    object-fit: cover;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    font-size: 1rem;
  }
`;

export default Searched;
