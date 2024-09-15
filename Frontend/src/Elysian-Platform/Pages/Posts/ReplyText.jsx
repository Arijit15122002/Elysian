import React from 'react';
import { Link } from 'react-router-dom';

function ReplyText({ text }) {
  // Split the text into words and punctuation
  const words = text.split(/(\s+|[.,!?;])/);
  const styledWords = words.map((word, index) => {
    if (word.startsWith('@')) {
      return <Link key={index} className='text-blue-600'>{word}</Link>;
    } else {
      return <span key={index}>{word}</span>;
    }
  });

  return (
    <div className="text-[0.85rem] radio pt-1 pr-4">
      {styledWords}
    </div>
  );
}

export default ReplyText;
