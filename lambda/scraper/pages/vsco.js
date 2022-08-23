/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

export const getPictures = async (page) => {
  const vscoPictures = await page.evaluate(async () => {
    const getBase64Image = (img) => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const dataURL = canvas.toDataURL('image/jpeg');

      return dataURL;
    };

    const figureSelector = document.querySelectorAll('figure');

    const images = Array.from(figureSelector).slice(0, 16).map((fig) => ({
      img: fig.querySelector('img'),
      shareURL: fig.querySelector('a').href,
    }));

    return images.map(({ img, shareURL }) => ({
      data: getBase64Image(img),
      shareURL,
    }));
  });

  return vscoPictures;
};
