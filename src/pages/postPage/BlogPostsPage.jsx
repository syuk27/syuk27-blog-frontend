import { useEffect, useState } from "react";
import { getAdminPosts } from "../../api/posts/post";
import Pagination from "../../components/Pagination";

const BlogPostsPage = () => {
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(1);
  const [contents, setContents] = useState([]);
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    getAdminPosts(page).then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        let tmpTotalPages = 1;
        if (response.data.totalPages > 1) {
          tmpTotalPages = response.data.totalPages;
        }
        setTotalPages(tmpTotalPages);
        setContents(response.data.content);
      }
    });
  }, [page]);

  useEffect(() => {
    console.log("contents", contents);
    setFeatures(
      contents.map((content) => {
        console.log("content", content);
        const data = content.userPostBlockList[0];

        let imageUrl = "/non_image.svg";
        if (data.cloudImg_url !== "") {
          imageUrl = data.cloudImg_url;
        }

        return (
          <div
            key={content.id}
            className="w-full lg:w-1/2 2xl:w-1/3 px-4 cursor-pointer"
          >
            <div className="h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200">
              <div className="inline-flex h-80 w-[25rem] mb-6 mx-auto items-center justify-center text-white bg-green-100 rounded-lg">
                <img src={imageUrl} className="h-72" />
              </div>
              <h3 className="mb-4 text-xl md:text-2xl leading-tight font-bold">
                {data.title}
              </h3>
              <p className="text-coolGray-500 font-medium">
                {data.description}
              </p>
            </div>
          </div>
        );
      })
    );
  }, [contents]);

  return (
    <section
      className="bg-white"
      style={{
        backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
        backgroundPosition: "center",
      }}
    >
      <div className="container px-4 mx-auto">
        {/* Section Title */}
        <div className="md:max-w-4xl mb-12 mx-auto text-center">
          <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm">
            SYUK27BLOG
          </span>
          <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
            SYUK27의 풀스택 개발 블로그
          </h1>
          <p className="text-lg md:text-xl text-coolGray-500 font-medium">
            React & Spring Boot로 개발한 블로그입니다.
            <br />
            풀스택 개발 전반의 기술과 경험을 포스팅합니다.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-wrap -mx-4">{features}</div>
        <Pagination
          currentPage={page}
          totalPages={totalpages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
};

export default BlogPostsPage;
