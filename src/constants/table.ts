import { DataType, Column } from "../types";

export const ITEMS_PER_PAGE = 10;

export const COLUMNS: Record<DataType, Column[]> = {
  posts: [
    { key: "id", header: "ID" },
    { key: "userId", header: "User ID" },
    { key: "title", header: "Title" },
    { key: "body", header: "Content" },
  ],
  comments: [
    { key: "id", header: "ID" },
    { key: "postId", header: "Post ID" },
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "body", header: "Comment" },
  ],
};
