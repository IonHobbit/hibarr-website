import Subheading from "@/components/Subheading";

export default function SubheadingDemo() {
  return (
    <div className="section mt-20 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Subheading demo</h1>
      <Subheading _type="subheading" label="Did you know?" align="left" variant="solid" tone="brand" size="md" />
      <Subheading _type="subheading" label="Heads up" align="center" variant="subtle" tone="info" size="sm" />
      <Subheading _type="subheading" label="Warning" align="right" variant="outline" tone="warning" size="lg" />
      <Subheading _type="subheading" label="Success State" align="left" variant="solid" tone="success" size="sm" />
      <Subheading _type="subheading" label="Danger Zone" align="center" variant="solid" tone="danger" size="md" />
      <Subheading _type="subheading" label="Accent Tag" align="right" variant="subtle" tone="accent" size="lg" />
    </div>
  );
}
