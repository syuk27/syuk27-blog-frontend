import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createAdminPost } from "../../api/posts/post";
import { cloudinaryUpload, handleImageUpload } from "./ImageUploader";
import SortableItem from "./SortableItem";

const PostEditor = () => {
  const [posts, setPosts] = useState([]);
  const [postBlockList, setPostBlockList] = useState([]);

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    titleRef.current.focus(); // 컴포넌트가 마운트되면 자동으로 포커스
  }, []);

  //📝 🗑️ 📸 ✍️ 🔤 🔄

  // 새 블록 추가 (글 + 이미지 가능)
  const addPost = () => {
    setPosts((prevPosts) => [
      ...prevPosts,
      {
        id: uuidv4(),
        content: "",
        image: null,
        blockOrder: ++prevPosts.length,
      },
    ]);

    console.log("posts", posts);
  };

  // 이미지 추가
  const addImage = async (e, id) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImage = URL.createObjectURL(file);

      /* 클라우드너리 테스트 */
      let signatureFormData = new FormData();
      if (file) {
        signatureFormData = await cloudinaryUpload(file);
      }

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, image: newImage, formData: signatureFormData }
            : post
        )
      );
    }
  };

  // 게시글 내용 변경
  const handleChange = (id, value) => {
    console.log("text", value);
    // setPosts((prev) =>
    //   prev.map((post) => (post.id === id ? { ...post, content: value } : post))
    // );
  };

  // 드래그 후 순서 변경
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = posts.findIndex((item) => item.id === active.id);
      const newIndex = posts.findIndex((item) => item.id === over.id);

      console.log("oldIndex", oldIndex, newIndex);

      let beforeOrder = newIndex;
      let afterOrder = oldIndex;

      setPosts(
        arrayMove(posts, oldIndex, newIndex).map((post) => {
          return post.id === active.id
            ? { ...post, blockOrder: ++beforeOrder }
            : post.id === over.id
            ? { ...post, blockOrder: ++afterOrder }
            : post;
        })
      );
    }
  };

  // 게시글 삭제
  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  // 모든 블록 저장
  const allBlockSave = async () => {
    // console.log("ref", quillRef.current.value)
    let isReady = true;
    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        const response = await handleImageUpload(post.formData);
        if (response === "error") {
          isReady = false;
        }

        return {
          ...post,
          cloudImg_url: response,
          id: "",
        };
      })
    );

    if (isReady) {
      setPostBlockList(updatedPosts);
    }
    console.log("updatedPosts", updatedPosts);
  };

  useEffect(() => {
    let updatePost = {
      user: {
        id: 1,
      },
      title : titleRef.current.value,
      description : descriptionRef.current.value,
    };

    console.log("postBlockList", postBlockList);
    if (postBlockList.length > 0) {
      updatePost.postBlockList = postBlockList;
      console.log("updatePost", updatePost);

      createAdminPost(updatePost)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [postBlockList]);

  return (
    <>
      <button
        onClick={addPost}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        ✍️ 새 블록 추가
      </button>

      <button
        onClick={allBlockSave}
        className="bg-blue-500 text-white px-4 py-2 rounded-md ml-5"
      >
        모든 블록 저장
      </button>

      {/* 드래그 정렬 가능한 게시글 리스트 */}
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={posts} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            <div className="space-y-2">
              <label className="text-lg">📝 포스트 제목</label>
              <input
                type="text"
                placeholder="제목을 입력해 주세요."
                className="w-full px-4 py-3 text-base font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                ref={titleRef}
              />

              <label className="text-lg">📝 포스트 요약</label>
              <textarea
                placeholder="내용을 간략히 작성해주세요."
                className="w-full px-4 py-3 text-base font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                ref={descriptionRef}
              />
            </div>
            {posts.length === 0 ? (
              <p className="text-gray-500 text-base font-semibold">
                ✏️ 글을 추가하세요!
              </p>
            ) : (
              posts.map((post) => (
                <SortableItem
                  key={post.id}
                  id={post.id}
                  post={post}
                  onChange={handleChange}
                  onDelete={deletePost}
                  onImageUpload={addImage}
                  quillRef={quillRef}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default PostEditor;
