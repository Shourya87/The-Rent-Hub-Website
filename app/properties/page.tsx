async function getProperties() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/property`, {
    cache: "no-store",
  });

  if (!response.ok) return [];
  const json = await response.json();
  return json.data || [];
}

export default async function PropertiesPage() {
  const properties = await getProperties();

  return (
    <main className="container">
      <h1>Public Property Listings</h1>
      <div className="grid">
        {properties.map((item: any) => (
          <article className="card" key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <p>₹{item.price} • {item.location} • {item.owner}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
