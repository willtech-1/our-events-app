// hooks
import { useState, useEffect } from "react";
// import react scroll link
import { Link } from "react-router-dom";
// react icon for mobile view
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { API } from "../config";

const Navbar = () => {
  let navigate = useNavigate();
  // toggle mobile nav state
  const [openNav, setOpenNav] = useState(false);
  // nav shadow state
  const [navShadow, setNavShadow] = useState(false);
  // dynamically navbar background style
  const [navBcg, setNavBcg] = useState("#F4F6F6");
  const [linkColour, setLinkColour] = useState("#1f2837");

  // toggle nav function
  const handleMenu = () => setOpenNav(!openNav);

  // nav shadow logic
  useEffect(() => {
    const handleShadow = () => {
      if (window.scrollY >= 90) {
        setNavShadow(true);
      } else {
        setNavShadow(false);
      }
    };

    //add event listener
    window.addEventListener("scroll", handleShadow);
  }, []);

  const signout = (next) => {
    // check if something exist on the localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      next();

      //make a request to the backend
      return fetch(`/api/signout`, {
        method: "GET",
      })
        .then((response) => {
          console.log("signed out successfully!" + response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // conditionally render signout, signin, signup
  const isAuthenticated = () => {
    // check if something exist on the localStorage
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return JSON.parse(localStorage.getItem("token"));
    } else {
      return false;
    }
  };

  return (
    <>
      <div
        style={{ backgroundColor: `${navBcg}` }}
        className={
          navShadow
            ? "fixed w-full h-20 shadow-xl z-[100] ease-in-out duration-300"
            : "fixed w-full h-20 z-[100]"
        }
      >
        <div className="flex justify-between items-center w-full h-full px-2 2xl:px-24">
          {/* nav logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div className="nav-logo">
              <span className="span1">Our</span>
              <span className="span2">Events™</span>
            </div>
          </Link>

          {/* Navbar links with react script smooth scroll */}
          <div>
            <ul className="hidden md:flex">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <li className="ml-10 text-sm uppercase hover:border-b">Home</li>
              </Link>
              <Link to="/events" style={{ textDecoration: 'none' }}>
                <li className="ml-10 text-sm uppercase hover:border-b">
                  Events
                </li>
              </Link>

              {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <Link to="/user/dashboard" style={{ textDecoration: 'none' }}>
                  <li className="ml-10 text-sm uppercase hover:border-b">
                    Dashboard
                  </li>
                </Link>
              )}

              {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                  <li className="ml-10 text-sm uppercase hover:border-b">
                    Dashboard
                  </li>
                </Link>
              )}

              {!isAuthenticated() && (
                <>
                  <Link to="/signup" style={{ textDecoration: 'none' }}>
                    <li className="ml-10 text-sm uppercase hover:border-b">
                      Signup
                    </li>
                  </Link>
                  <Link to="/signin" style={{ textDecoration: 'none' }}>
                    <li className="ml-10 text-sm uppercase hover:border-b border-white">
                      Signin
                    </li>
                  </Link>
                </>
              )}

              {isAuthenticated && (
                <span
                  onClick={() =>
                    signout(() => {
                      navigate("/signin");
                    })
                  }
                >
                  <li className="ml-10 text-sm uppercase hover:border-b border-white cursor-pointer">
                    Signout
                  </li>
                </span>
              )}
            </ul>

            {/* mobile navbar */}
            <div
              style={{ color: `${linkColour}` }}
              onClick={handleMenu}
              className="md:hidden"
            >
              <AiOutlineMenu size={25} />
            </div>
          </div>
        </div>

        {/* slide menu for mobile devices */}
        {/* overlay style */}
        <div
          className={
            openNav
              ? "md:hidden fixed left-0 top-0 w-full h-screen bg-black/70"
              : ""
          }
        >
          {/* mobile device menu style slider half way mobile conditional logic*/}
          <div
            className={
              openNav
                ? "fixed left-0 top-0 w-[75%] sm:w-[60%] md:w-[45%] h-screen bg-[#ecf0f3] p-10 ease-in duration-500"
                : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
            }
          >
            {/* portfolio logo on mobile devices */}
            <div>
              <div className="flex w-full items-center justify-between">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <div className="nav-logo">
                    <span className="span1">Our</span>
                    <span className="span2">Events™</span>
                  </div>
                </Link>

                {/* close mobile menu button */}
                <div
                  onClick={handleMenu}
                  className="rounded-full shadow-lg shadow-gray-400 p-3 cursor-pointer"
                >
                  <AiOutlineClose />
                </div>
              </div>

              {/* text */}
              <div className="border-b border-gray-300 my-4">
                <p className="w-[85%] md:w-[90%] py-4">
                  Let&apos;s come together.
                </p>
              </div>
            </div>

            {/* mobile device links */}
            <div className="py-4 flex flex-col">
              <ul className="uppercase">
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <li
                    onClick={() => setOpenNav(false)}
                    className="py-4 text-sm"
                  >
                    Home
                  </li>
                </Link>
                <Link to="/events" style={{ textDecoration: 'none' }}>
                  <li  onClick={() => setOpenNav(false)} className="py-4 text-sm">
                    Events
                  </li>
                </Link>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                  <Link to="/user/dashboard" style={{ textDecoration: 'none' }}>
                    <li
                      onClick={() => setOpenNav(false)}
                      className="py-4 text-sm"
                    >
                      Dashboard
                    </li>
                  </Link>
                )}

                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                  <Link to="/admin/dashboard" style={{ textDecoration: 'none' }}>
                    <li
                      onClick={() => setOpenNav(false)}
                      className="py-4 text-sm"
                    >
                      Dashboard
                    </li>
                  </Link>
                )}

                {!isAuthenticated() && (
                  <>
                    <Link to="/signup" style={{ textDecoration: 'none' }}>
                      <li
                        onClick={() => setOpenNav(false)}
                        className="py-4 text-sm"
                      >
                        Signup
                      </li>
                    </Link>
                    <Link to="/signin" style={{ textDecoration: 'none' }}>
                      <li
                        onClick={() => setOpenNav(false)}
                        className="py-4 text-sm cursor-pointer"
                      >
                        Signin
                      </li>
                    </Link>
                  </>
                )}

                {isAuthenticated && (
                  <span
                    onClick={() =>
                      signout(() => {
                        navigate("/signin");
                      })
                    }
                  >
                    <li
                      onClick={() => setOpenNav(false)}
                      className="py-4 text-sm"
                    >
                      Signout
                    </li>
                  </span>
                )}
              </ul>

             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
