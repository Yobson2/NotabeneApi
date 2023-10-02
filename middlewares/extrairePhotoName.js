function extractFilenames(req, res, next) {
    let photoData = [];
    const photos = req.body.photo_;
  
    if (photos && Array.isArray(photos)) {
      for (let index = 0; index < photos.length; index++) {
        const fileName = photos[index].substring(photos[index].lastIndexOf('/') + 1);
        photoData.push(fileName);
      }
    }
  
    req.photoData = photoData; 
  
    next(); 
  }
  
  module.exports = extractFilenames;
  