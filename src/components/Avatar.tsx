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
    <div className="flex flex-col items-center justify-between mt-4 mb-2">
      <img
        className="object-cover w-64 h-64 mb-2 rounded-full"
        src={profileImageURL}
        alt={fullName}
      />
      <h1 className="text-3xl mb-1">{fullName}</h1>
      <p className="italic">{quote}</p>
    </div>
  );
};

export default Avatar;
