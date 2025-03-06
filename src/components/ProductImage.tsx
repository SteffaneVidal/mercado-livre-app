import { useEffect, useState, useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width?: string;
};

function ProductImage({ src, alt, width = "100" }: Props) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  if (!loaded) {
    return <div ref={imgRef} style={{ width, height: width, backgroundColor: "#f0f0f0" }} />;
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      width={width}
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
    />
  );
}

export default ProductImage;
