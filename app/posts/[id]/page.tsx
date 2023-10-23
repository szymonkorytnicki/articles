import { Post } from "../../../components/post/post";

export const metadata = {
  title: "Article",
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  return <Post id={id} />;
}
