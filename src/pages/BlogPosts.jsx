import { useEffect, useState } from "react";
import { getUserPosts } from "../api/userpost/userpost";

const features = [
  {
    title: "Measure your performance",
    description:
      "Stay connected with your team and make quick decisions wherever you are.",
    icon: (
      <svg width="24" height="21" viewBox="0 0 24 21" fill="none">
        <path
          d="M17 18.63H5C4.20435 18.63 3.44129 18.3139 2.87868 17.7513..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: "Custom analytics",
    description:
      "Get a complete sales dashboard in the cloud. See activity, revenue and social metrics all in one place.",
    icon: (
      <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
        <path
          d="M20.71 1.29C20.617 1.19627 20.5064 1.12188..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: "Team Management",
    description:
      "Our calendar lets you know what is happening with customer and projects so you can manage efficiently.",
    icon: (
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
        <path
          d="M11.3 9.22C11.8336 8.75813 12.2616 8.18688..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: "Build your website",
    description:
      "A tool that lets you build a dream website even if you know nothing about web design or programming.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 18H9.24C9.37161 18.0008 9.50207 17.9755..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: "Connect multiple apps",
    description:
      "The first business platform to bring together all of your products from one place.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M8 11H1C0.734784 11 0.48043 11.1054 0.292893 11.2929..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
  {
    title: "Easy setup",
    description:
      "End to End Business Platform, Sales Management, Marketing Automation, Help Desk.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M19.32 7.55L17.43 6.92L18.32 5.14C18.4102 4.95369..."
          fill="currentColor"
        ></path>
      </svg>
    ),
  },
];

const BlogPosts = () => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    getUserPosts(1).then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        setContents(response.data);
      }
    });
  }, []);

  useEffect(() => {
    contents.map((content) => {
      
      if(content.userPostBlockList[0].cloudImg_url !== "") {

      }
      

    });
  }, [contents]);

  return (
    <section
      className="py-24 md:pb-32 bg-white"
      style={{
        backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-4 mx-auto">
        {/* Section Title */}
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
            Features
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
            Gain more insight into how people use your
          </h1>
          <p className="text-lg md:text-xl text-coolGray-500 font-medium">
            With our integrated CRM, project management, collaboration and
            invoicing capabilities, you can manage every aspect of your business
            in one secure platform.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap -mx-4">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/3 px-4">
              <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="inline-flex h-16 w-16 mb-6 mx-auto items-center justify-center text-white bg-green-500 rounded-lg">
                  {feature.icon}
                </div>
                <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold">
                  {feature.title}
                </h3>
                <p className="text-coolGray-500 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPosts;
