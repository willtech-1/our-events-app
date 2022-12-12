export const isAuthenticated = () => {
    // check if something exist on the localStorage
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      // get token
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };
