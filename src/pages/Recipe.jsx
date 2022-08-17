import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Recipe = () => {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const params = useParams();

  useEffect(() => {
    getRecipeDetails(params.id);
  }, [params.id]);

  const getRecipeDetails = async (id) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
    );
    const detailData = await data.json();
    console.log(detailData, 'detail Data');
    setDetails(detailData);
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          onClick={(e) => setActiveTab('instructions')}
          className={activeTab === 'instructions' ? 'active' : ''}
        >
          Instructions
        </Button>
        <Button
          onClick={(e) => setActiveTab('ingredients')}
          className={activeTab === 'ingredients' ? 'active' : ''}
        >
          Ingredients
        </Button>
        {activeTab === 'instructions' && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {activeTab === 'ingredients' && (
          <ul>
            {details.extendedIngredients.map((ingredient) => {
              return <li key={ingredient.id}>{ingredient.original}</li>;
            })}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
};

const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  div {
    width: 37vw;
  }

  h2 {
    margin-top: 2rem;
    margin-bottom: 2rem;
    font-size: 1.1rem;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }

  h3 {
    margin-bottom: 2rem;
    font-size: 0.8rem;
  }
  img {
    width: 100%;
    height: 50vh;
  }
  li {
    font-size: 0.9rem;
    line-height: 2rem;
  }
  ul {
    margin-top: 2rem;
    width: 37vw;
  }
`;

const Button = styled.button`
  padding: 0.8rem 1rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  font-weight: 60;
  margin-left: 1.5rem;
`;

const Info = styled.div`
  margin-left: 10rem;
  padding: 2rem;
`;

export default Recipe;
