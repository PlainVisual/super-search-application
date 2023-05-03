import jwt_decode from 'jwt-decode';

function jwtTokenValid(jwtToken) {
  const decodedToken = jwt_decode(jwtToken);
  const expUnix = decodedToken.exp; 

  const currentStamp = new Date().getTime(); 
  const currentStampUnix = Math.round(currentStamp / 1000); 

  if (expUnix - currentStampUnix > 0) {
    return true;
  } else {
    window.location.href = "/";
    return false;
  }

}

export default jwtTokenValid;