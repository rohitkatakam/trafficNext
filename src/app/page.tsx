import ImageUpload from "@/components/ImageUpload";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul className="list-inside text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li>Upload some png picture of a traffic sign</li>
          <li>As you can tell, this site is still very much under development</li>
          <li>Please visit again in a few days :)</li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <ImageUpload/>
        </div>
      </main>
    </div>
  );
}
