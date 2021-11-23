

export function isBSCNetwork(etherum) {
  if(!etherum) {
    console.log('install metamask!');
    return null;
  }
  if(etherum.chainId !== '0x38') {
    return false;
  }
  return true;
}