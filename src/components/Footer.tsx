import React from 'react';

interface Props {
  footerMessage: string;
  social: SocialItem[];
}

const Footer: React.FC<Props> = function Footer({
  footerMessage,
  social,
}) {
  return (
    <footer className="flex flex-col bg-gray-800 items-center w-full text-white space-y-8 py-16">
      <h2 className="text-2xl">{footerMessage}</h2>
      <div className="flex">
        {social.map(({ icon, link }) => (
          <a key={icon} className="text-2xl mx-2" href={link} target="_blank" rel="noreferrer">
            <i className={icon} />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
