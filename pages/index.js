import {AppContext} from '@/context/userContext';
import React, {useContext} from 'react';

const Home = () => {
  const {myName} = useContext(AppContext);
  return (
    <div>
      <h1>{myName}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro ipsum, eaque velit quis nam ut! Minus aut maiores earum voluptates totam eaque hic nesciunt recusandae beatae, excepturi in ipsum doloribus omnis perferendis ipsam nihil adipisci veritatis ullam et cupiditate? Harum minus, aspernatur saepe accusamus est ipsam deserunt officia enim explicabo, ullam quas incidunt. Ipsam unde, ratione sint ipsa fuga cupiditate modi corrupti, voluptate in necessitatibus nam adipisci voluptatem distinctio quaerat magni amet soluta quibusdam sed placeat quod. Cumque, est. Doloribus magni nam ut impedit doloremque soluta tempora, deleniti veritatis ducimus nobis dicta saepe nihil iure hic! Ex minima possimus neque!
      </p>
    </div>
  );
};

export default Home;