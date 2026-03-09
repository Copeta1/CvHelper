export default function CVPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>CV: {params.id}</h1>
    </div>
  );
}
