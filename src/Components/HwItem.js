import React from 'react';
import {Link} from 'react-router-dom';
import './HwItem.css';

const HwItem = (props) => {
    return (
      <Link to={{
        pathname: `/homework/${props.type}/${props.title}`,
        state: {
          formHomeworkPage: true,
          content: props.content
        }
      }}>
        <div className="hwCard">
          <h1>{props.content.name}</h1>
          <p>{props.content.description}</p>
          <p><em>{props.content.type}</em></p>
        </div>
      </Link>
    )
}

export default HwItem;
