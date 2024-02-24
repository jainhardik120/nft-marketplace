"use client"

import classNames from "classnames";
import EmptyState from "../components/EmptyState";
import useNFTMarket from "../state/nft-market";
import useSigner from "../state/signer";
import { ChangeEvent, useState } from "react"
import { btnClasses } from "../components/NavBar";

interface NFTFormProps {
  onSubmit: (formData: FormData) => void;
}

const NFTForm: React.FC<NFTFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = e.target.files?.[0] || null;
    setImage(selectedImage);

    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImagePreview(imageUrl);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4  rounded-md">
      <label className="block mb-4">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <br />
      <label className="block mb-4">
        <span className="text-gray-700">Description:</span>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      <br />
      <label className="block mb-4">
        <span className="text-gray-700">Image:</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 p-2 w-full border rounded-md"
        />
      </label>
      {imagePreview!==null && (
        <div className="mb-4">
          <span className="text-gray-700">Image Preview:</span>
          <img src={imagePreview} alt="Preview" className="mt-2 w-full rounded-md shadow-md" />
        </div>
      )}
      <br />
      <button type="submit" className={btnClasses}>
        Submit
      </button>
    </form>

  );
};


const CreationPage = () => {
  const { signer } = useSigner();
  const { createNFT } = useNFTMarket();

  const onSubmit = async (values: FormData) => {
    try {
      await createNFT(values);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={classNames("flex h-full w-full flex-col")}>
      {!signer && <EmptyState>Connect your wallet</EmptyState>}
      {signer && <NFTForm onSubmit={onSubmit} />}
    </div>
  );
};

export default CreationPage;
