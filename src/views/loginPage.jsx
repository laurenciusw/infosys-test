import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import revenue from "../assets/revenue.jpg";

export default function LoginPage() {
  // local state
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  // requirement
  const navigate = useNavigate();
  const userStorage = localStorage.user;
  // global state
  const { user } = useSelector((state) => {
    return state.user;
  });

  // function
  function handleForm(event) {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  }

  async function loginUser(payload) {
    const { email, password } = user;
    if (payload.email === "") {
      Swal.fire({
        icon: "error",
        text: "Email is empty",
      });
    } else if (payload.password === "") {
      Swal.fire({
        icon: "error",
        text: "Password is empty",
      });
    } else if (payload.email !== email || payload.password !== password) {
      Swal.fire({
        icon: "error",
        text: "Email or Password is wrong",
      });
    } else {
      localStorage.user = userData.email;
      Swal.fire({
        icon: "success",
        text: "Success login !",
      });
      navigate("/dashboard");
    }
  }

  async function handleLogin(e) {
    setIsLoading(true);
    e.preventDefault();
    loginUser(userData);
    setIsLoading(false);
  }

  useEffect(() => {
    if (userStorage) {
      navigate("/dashboard");
    }
  }, [user]);

  if (isLoading) {
    return (
      <img
        className="w-full pl-60 scale-50"
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"
        alt=""
      />
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen">
        <div className="md:w-1/2 bg-white">
          <div className="h-screen flex flex-col justify-center items-center">
            <div className="mx-auto max-w-lg bg-white p-8">
              <h2 className="text-3xl font-semibold mb-4 font-inter text-center">
                Sign In to Ember
              </h2>
              <h2 className="text-base font-semibold mb-4 text-slate-500 text-center font-inter">
                Send, spend, and save smarter
              </h2>

              <div class="flex items-center space-x-4">
                {/* Google login */}
                <button class="flex items-center bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 space-x-2 hover:bg-gray-100 transition duration-300">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                    alt="Google Logo"
                    class="w-6 h-6"
                  />
                  <span>Sign In with Google</span>
                </button>

                {/* Apple login */}
                <button class="flex items-center bg-white text-gray-700 border border-gray-300 rounded-lg px-4 py-2 space-x-2 hover:bg-gray-100 transition duration-300">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Apple Logo"
                    class="w-6 h-6"
                  />
                  <span>Sign In with Apple</span>
                </button>
              </div>

              <div className="flex items-center p-7">
                <hr className="flex-grow border-t border-gray-300 mr-4" />
                <span className="text-gray-400">or with email</span>
                <hr className="flex-grow border-t border-gray-300 ml-4" />
              </div>

              <form action="" className="space-y-4 pb-5 pt-5 ">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleForm}
                      value={userData.email}
                      type="email"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-inter"
                      placeholder="Enter email"
                      name="email"
                    />
                    <span className="absolute inset-y-0 end-0 flex items-center pr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          d="M18.3334 5.49998C18.3334 4.58331 17.5834 3.83331 16.6667 3.83331H3.33335C2.41669 3.83331 1.66669 4.58331 1.66669 5.49998M18.3334 5.49998V15.5C18.3334 16.4166 17.5834 17.1666 16.6667 17.1666H3.33335C2.41669 17.1666 1.66669 16.4166 1.66669 15.5V5.49998M18.3334 5.49998L10 11.3333L1.66669 5.49998"
                          stroke="#667085"
                          stroke-width="1.66667"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="sr-only pb-5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={handleForm}
                      value={userData.password}
                      type="password"
                      className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm font-inter"
                      placeholder="Enter password"
                      name="password"
                    />
                    <span className="absolute inset-y-0 end-0 flex items-center pr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_16_2532)">
                          <path
                            d="M9.9 4.74C10.5883 4.57888 11.2931 4.49834 12 4.5C19 4.5 23 12.5 23 12.5C22.393 13.6356 21.6691 14.7047 20.84 15.69M14.12 14.62C13.8454 14.9147 13.5141 15.1512 13.1462 15.3151C12.7782 15.4791 12.3809 15.5673 11.9781 15.5744C11.5753 15.5815 11.1752 15.5074 10.8016 15.3565C10.4281 15.2056 10.0887 14.981 9.80385 14.6962C9.51897 14.4113 9.29439 14.0719 9.14351 13.6984C8.99262 13.3248 8.91853 12.9247 8.92563 12.5219C8.93274 12.1191 9.02091 11.7218 9.18488 11.3538C9.34884 10.9859 9.58525 10.6546 9.88 10.38M1 1.5L23 23.5M17.94 18.44C16.2306 19.743 14.1491 20.4649 12 20.5C5 20.5 1 12.5 1 12.5C2.24389 10.1819 3.96914 8.15661 6.06 6.56L17.94 18.44Z"
                            stroke="#98A2B3"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_16_2532">
                            <rect
                              width="24"
                              height="24"
                              fill="white"
                              transform="translate(0 0.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                  </div>
                </div>

                <div class="flex items-center pb-5 pt-5">
                  <input
                    type="radio"
                    id="rememberMe"
                    name="rememberMe"
                    class="mr-2"
                  />
                  <label for="rememberMe" class="text-gray-700 font-inter">
                    Remember Me
                  </label>
                  <a
                    href="#"
                    class="ml-auto text-blue-600 hover:underline font-inter"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  onClick={handleLogin}
                  className="w-full bg-[#6941C6] text-white rounded-lg py-3 text-sm font-medium hover:bg-green-700 transition duration-300"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 bg-[#6941C6] border-white border-[20px] min-h-screen flex flex-col justify-center items-center relative">
          <img
            src={logo}
            alt="logo"
            className="max-w-full md:absolute top-5 left-5 w-max h-max md:w-max md:h-max"
          />

          <div className="max-w-md mt-4 text-center md:text-left">
            <img
              src={revenue}
              alt="logo"
              className="max-w-full rounded-md border border-white w-max h-max"
            />

            <h2 className="text-3xl md:text-3xl font-semibold mb-4 font-inter text-white mt-4 text-center">
              Get Better with Money
            </h2>
          </div>
        </div>
      </div>
    </>
  );
}
