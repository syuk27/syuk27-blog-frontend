import { useState } from "react";
import Pagination from "../../components/Pagination";
import usePostV1 from "../../hooks/posts/usePostV1";

const BlogPostsPage = () => {
  const [page, setPage] = useState(1);
  const {totalpages, features} = usePostV1(page);

  return (
    <section
      className="bg-white"
      style={{
        backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
        backgroundPosition: "center",
      }}
    >
      <div>
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
