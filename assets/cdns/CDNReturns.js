/**
 *
 *  This is used to return/get a url for a medias
 *
 */

const SERVER =
  "https://raw.githubusercontent.com/dynamicwebtech/client_CDNS/main/dynamic-web-technologies-clients-storage/";

function CDNBGReturn(bgSub, bgSubFile, fileExt) {
  let bgSrc;

  if (bgSub) {
    if (bgSubFile) {
      if (fileExt) {
        bgSrc = SERVER + "bgs/" + bgSub + "/" + bgSubFile + "." + fileExt;
      }
    }
  }

  return bgSrc;
}

function CDNImgReturn(imgSub, imgSubFile, fileExt) {
  let imgSrc;

  if (imgSub) {
    if (imgSubFile) {
      if (fileExt) {
        imgSrc = SERVER + "imgs/" + imgSub + "/" + imgSubFile + "." + fileExt;
      }
    }
  }

  return imgSrc;
}

function CDNIconReturn(iconSub, iconSubFile, fileExt) {
  let iconSrc;

  if (iconSub) {
    if (iconSubFile) {
      if (fileExt) {
        iconSrc =
          SERVER + "icons/" + iconSub + "/" + iconSubFile + "." + fileExt;
      }
    }
  }

  return iconSrc;
}

export { CDNBGReturn, CDNImgReturn, CDNIconReturn };
