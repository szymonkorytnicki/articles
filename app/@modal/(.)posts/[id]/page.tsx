import { Post } from "../../../../components/post/post";
import { Modal } from "../../../../components/modal/modal";

export default async function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <Modal>
      {/* @ts-expect-error Server Component */}
      <Post id={id} />
    </Modal>
  );
}
