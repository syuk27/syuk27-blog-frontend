
const PostContent = (props) => {
  const { page, content, imageUrl, setTotalPages, setContents, setFeatures } = props;

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
          {content.title}
        </h3>
        <p className="text-coolGray-500 font-medium">{content.description}</p>
      </div>
    </div>
  );
};

export default PostContent;
