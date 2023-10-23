import { Post } from "../../../components/post/post";

export const metadata = {
  title: "Article",
};

export default async function Page({ params: { id } }: { params: { id: string } }) {
  /* @ts-expect-error Server Component */
  return <Post id={id} />;
}
