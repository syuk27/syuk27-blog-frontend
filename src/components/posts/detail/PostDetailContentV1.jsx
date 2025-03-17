import { Fragment } from "react";

const PostDetailContentV1 = ({ data }) => {
  return (
    <>
      {data.postBlockList.map((postBlock, index) => {
        return (
          <Fragment key={index}>
            {postBlock.cloudImg_url && <img src={postBlock.cloudImg_url} />}
            <div
              dangerouslySetInnerHTML={{ __html: postBlock.content }}
              className="text-gray-800 leading-relaxed"
            />
          </Fragment>
        );
      })}
    </>
  );
};

export default PostDetailContentV1;
