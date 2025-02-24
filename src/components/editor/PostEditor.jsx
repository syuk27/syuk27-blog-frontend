import { useEffect, useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import { v4 as uuidv4 } from "uuid";
import { cloudinaryUpload, handleImageUpload } from "./ImageUploader";
import axios from "axios";

const PostEditor = () => {
  const [posts, setPosts] = useState([]);

  const [userPostBlockList, setUserPostBlockList] = useState([]);

  console.log("posts", posts);

  // 📝 새 블록 추가 (글 + 이미지 가능)
  const addPost = () => {
    setPosts((prevPosts) => [
      ...prevPosts,
      { id: uuidv4(), content: "", image: null, fontSize: "text-base" },
    ]);
  };

  // 📸 이미지 추가
  const addImage = async (e, id) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const newImage = URL.createObjectURL(file);
      console.log("addImage", file);

      /* 클라우드너리 테스트 */
      let signature;
      if (file) {
        console.log("111", file);
        signature = await cloudinaryUpload(file);
      }

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, image: newImage, formData: signature }
            : post
        )
      );
    }
  };

  // ✍️ 게시글 내용 변경
  const handleChange = (id, value) => {
    console.log("handleChange", id, value);
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, content: value } : post))
    );
  };

  // 🔤 글자 크기 변경
  const changeFontSize = (id, newSize) => {
    console.log("id, newSize", id, newSize);
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, fontSize: newSize } : post
      )
    );
  };

  // 🔄 드래그 후 순서 변경
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = posts.findIndex((item) => item.id === active.id);
      const newIndex = posts.findIndex((item) => item.id === over.id);
      setPosts(arrayMove(posts, oldIndex, newIndex));
    }
  };

  // 🗑️ 게시글 삭제
  const deletePost = (id) => {
    console.log("id", id);
    setPosts(posts.filter((post) => post.id !== id));
  };

  // 모든 블록 저장
  const allBlockSave = async () => {
    console.log("allBlockSave", posts);

    const updatedPosts = await Promise.all(
      posts.map(async (post) => {
        console.log("post.formData.has", post.formData.has("cloudName"));
        // post.formData instanceof FormData && post.formData.has("cloudName")
        //   ? { ...post, cloudImg_url: handleImageUpload(post.formData) }
        //   : post;
        if (
          post.formData instanceof FormData &&
          post.formData.has("cloudName")
        ) {
          return {
            ...post,
            cloudImg_url: await handleImageUpload(post.formData),
            id: ""
          };
        }
        return post;
      })
    );

    setUserPostBlockList(updatedPosts);
  };

  useEffect(() => {
    let userPost = {
      user: {
       id: 1
      }
    };
    console.log("userPostBlockList", userPostBlockList);
    if (userPostBlockList.length > 0) {
      userPost.userPostBlockList = userPostBlockList;
      console.log("userPost", userPost);

      axios
        .post("http://localhost:8080/user_posts", userPost)
        .then((response) => {
          console.log("response", response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
  }, [userPostBlockList]);

  return (
    <div className="p-4 space-y-4">
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
            {posts.length === 0 ? (
              <p className="text-gray-500">✏️ 글을 추가하세요!</p>
            ) : (
              posts.map((post) => (
                <SortableItem
                  key={post.id}
                  id={post.id}
                  post={post}
                  onChange={handleChange}
                  onDelete={deletePost}
                  onImageUpload={addImage}
                  onFontSizeChange={changeFontSize}
                />
              ))
            )}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default PostEditor;
