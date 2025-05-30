// Rendering the landing page from '@public/render.html' which is using the script from hosted cdn

export default function Test() {
  return (
    <>
      <iframe
        src="/render.html"
        style={{ width: '100%', minHeight: '100dvh', border: 'none', }}
      />
    </>
  );
}
