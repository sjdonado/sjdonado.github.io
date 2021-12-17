import React from 'react';

interface Props {
  profileImageURL: string;
  fullName: string;
  quote: string;
}

const Avatar: React.FC<Props> = function Avatar({
  profileImageURL,
  fullName,
  quote,
}) {
  return (
    <div className="flex flex-col items-center space-y-1 justify-between mb-4 mx-2">
      <img
        className="object-cover w-64 h-64 my-2 rounded-full"
        src={profileImageURL}
        alt={fullName}
      />
      <h1 className="text-3xl text-center">{fullName}</h1>
      <p className="italic text-center">{quote}</p>
    </div>
  );
};

export default Avatar;
