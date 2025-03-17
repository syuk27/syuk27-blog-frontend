import { useEffect, useState } from "react";
import { getAdminPosts } from "../../api/posts/post";
import PostContent from "../../components/posts/content/PostContent";
import usePostDetailV1 from "./usePostDetailV1";

const usePostV1 = (page) => {
  const [totalpages, setTotalPages] = useState(1);
  const [contents, setContents] = useState([]);
  const [features, setFeatures] = useState([]);
  const { handleOnClick } = usePostDetailV1();

  useEffect(() => {
    getAdminPosts(page).then((response) => {
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
    setFeatures(
      contents.map((content) => {
        const data = content.postBlockList[0];

        let imageUrl = "/non_image.svg";
        if (data.cloudImg_url !== "") {
          imageUrl = data.cloudImg_url;
        }
        return (
          <PostContent
            key={content.id}
            content={content}
            imageUrl={imageUrl}
            handleOnClick={handleOnClick}
          />
        );
      })
    );
  }, [contents]);

  return { totalpages, features };
};

export default usePostV1;
