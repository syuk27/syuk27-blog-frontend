import { useEffect, useState } from "react";
import { getAdminPosts } from "../../api/posts/post";
import PostContent from "../../components/posts/contentV1/PostContent";

const usePostV1 = (page) => {
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
        setFeatures(
          contents.map((content) => {
            const data = content.postBlockList[0];
        
            let imageUrl = "/non_image.svg";
            if (data.cloudImg_url !== "") {
              imageUrl = data.cloudImg_url;
            }
            return <PostContent key={content.id} content={content} imageUrl={imageUrl}/>
          })
        );
    
        console.log("features", features)
      }, [contents]);

      return {totalpages, features}
}

export default usePostV1;