"use client"

import { Form, Formik } from "formik";
import * as Yup from "yup";
import FormikInput from "../components/Input";
import ImagePicker from "./ImagePicker";
import SubmitButton from "./SubmitButton";
import TextArea from "./TextArea";
import classNames from "classnames";
import EmptyState from "../components/EmptyState";
import useNFTMarket from "../state/nft-market";
import useSigner from "../state/signer";
import {useState} from "react"

interface NFTFormProps {
  onSubmit: (formData: FormData) => void;
}

const NFTForm: React.FC<NFTFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (image) formData.append('image', image);

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Image:
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] || null)} />
      </label>
      <button type="submit">Submit</button>
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
