/**
 *
 *  This is the CheckValidPageRoute function
 *
 */

export default function CheckValidPageRoute(router, route) {
  if (router.pathname !== route) {
    return true;
  } else {
    return false;
  }
}
