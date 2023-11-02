import Link from "next/link";

export function Pagination({ page, total }) {
  const pageMax = Math.ceil(total / 10);
  return (
    <div>
      <br />
      {page > 1 ? (
        <Link href={`/${page - 1}`}>
          <button>Prev</button>
        </Link>
      ) : (
        <button disabled>Prev</button>
      )}
      Page {page}/{pageMax}
      {page < pageMax ? (
        <Link href={`/${page + 1}`}>
          <button>Next</button>
        </Link>
      ) : (
        <button disabled>Next</button>
      )}
    </div>
  );
}
