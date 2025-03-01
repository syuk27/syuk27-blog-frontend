import React from "react";

const Home = () => {
  const mobileNavOpen = false;

  return (
    <section
      className="relative bg-white overflow-hidden"
      style={{
        backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-transparent">
        {/* Navigation */}
        {/* <nav className="flex justify-between p-6 px-4">
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 xl:w-1/3">
              <a className="block max-w-max" href="#">
                <img
                  className="h-8"
                  src="flex-ui-assets/logos/flex-ui-green-light.svg"
                  alt="Logo"
                />
              </a>
            </div>
            <div className="w-1/2 xl:w-1/3">
              <ul className="hidden xl:flex xl:justify-center">
                {["Product", "Features", "Resources", "Pricing"].map(
                  (item, index) => (
                    <li key={index} className="mr-12">
                      <a
                        className="text-coolGray-500 hover:text-coolGray-900 font-medium"
                        href="#"
                      >
                        {item}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div className="w-1/2 xl:w-1/3">
              <div className="hidden xl:flex items-center justify-end">
                <a
                  className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md"
                  href="#"
                >
                  Log In
                </a>
                <a
                  className="inline-block py-2 px-4 text-sm leading-5 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
                  href="#"
                >
                  Sign Up
                </a>
              </div>
            </div>
          </div> */}

        {/* Mobile Menu Button */}
        {/* <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="navbar-burger self-center xl:hidden"
          >
            <svg width="35" height="35" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="6" fill="currentColor"></rect>
              <path
                className="text-coolGray-500"
                d="M7 12H25..."
                fill="currentColor"
              ></path>
            </svg>
          </button>
        </nav> */}

        {/* Mobile Menu */}
        {mobileNavOpen && (
          <div className="navbar-menu fixed top-0 left-0 z-50 w-full h-full bg-coolGray-900 bg-opacity-50">
            <div className="fixed top-0 left-0 bottom-0 w-4/6 max-w-xs bg-white">
              <nav className="relative p-6 h-full overflow-y-auto">
                <div className="flex flex-col justify-between h-full">
                  <a className="inline-block" href="#">
                    <img
                      className="h-8"
                      src="flex-ui-assets/logos/flex-ui-green-light.svg"
                      alt="Logo"
                    />
                  </a>
                  <ul className="py-6">
                    {["Product", "Features", "Pricing", "Resources"].map(
                      (item, index) => (
                        <li key={index}>
                          <a
                            className="block py-3 px-4 text-coolGray-500 hover:text-coolGray-900 font-medium hover:bg-coolGray-50 rounded-md"
                            href="#"
                          >
                            {item}
                          </a>
                        </li>
                      )
                    )}
                  </ul>
                  <div className="flex flex-wrap">
                    <div className="w-full mb-2">
                      <a
                        className="inline-block py-2 px-4 w-full text-sm leading-5 text-coolGray-500 hover:text-coolGray-900 font-medium text-center rounded-md"
                        href="#"
                      >
                        Log In
                      </a>
                    </div>
                    <div className="w-full">
                      <a
                        className="inline-block py-2 px-4 w-full text-sm leading-5 text-white bg-green-500 hover:bg-green-600 font-medium text-center rounded-md"
                        href="#"
                      >
                        Sign Up
                      </a>
                    </div>
                  </div>
                </div>
              </nav>
              <button
                onClick={() => setMobileNavOpen(false)}
                className="navbar-close absolute top-5 p-4 right-3"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6.94 6L11.14 1.80667..." fill="#556987"></path>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <div className="py-20 md:py-28">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap xl:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
              <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-white bg-green-500 uppercase rounded-9xl">
                Header
              </span>
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
                A small business is only as good as its tools.
              </h1>
              <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
                We’re different. Flex is the only SaaS business platform that
                lets you run your business on one platform, seamlessly across
                all digital channels.
              </p>
              <div className="flex flex-wrap">
                <div className="w-full md:w-auto py-1 md:py-0 md:mr-4">
                  <a
                    className="inline-block py-5 px-7 w-full text-base md:text-lg text-green-50 bg-green-500 hover:bg-green-600 rounded-md"
                    href="#"
                  >
                    Request a Demo
                  </a>
                </div>
                <div className="w-full md:w-auto py-1 md:py-0">
                  <a
                    className="inline-block py-5 px-7 w-full text-base md:text-lg text-coolGray-800 bg-white hover:bg-coolGray-100 rounded-md"
                    href="#"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="relative mx-auto md:mr-0 max-w-max">
                <img
                  className="relative rounded-7xl"
                  src="flex-ui-assets/images/headers/header.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
