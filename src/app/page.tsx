import ImageUpload from "@/components/ImageUpload";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <header className="text-center mb-2">
          <h1 className="text-3xl font-bold text-sky-600 font-[family-name:var(--font-geist-mono)]">Traffic Sign Classifier</h1>
        </header>
        <ul className="list-disc list-inside text-sm text-sky-800 text-left font-[family-name:var(--font-geist-mono)] space-y-2 bg-gray-300 p-4 rounded-lg">
          <li>Upload some PNG picture of a traffic sign (this model is trained on EU traffic images)</li>
          <li>The saved Pytorch CNN called through Flask and hosted on Render, so the initial upload will take a minute or two</li>
          <li>Due to somewhat limited training data (found with labels on Kaggle), the accuracy of this model is ~70</li>
          <li>This model was trained using two convolutional layers (with Leaky ReLu as activation) and one hidden layer</li>
          <li>Training used Adam gradient descent until validation accuracy stopped increasing to prevent overfitting</li>
        </ul>

        <div className="flex gap-4 items-center flex-col sm:flex-row mt-4">
          <ImageUpload/>
        </div>
      </main>
    </div>
  );
}
