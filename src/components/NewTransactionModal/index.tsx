import { useState, FormEvent } from "react";

import Modal from "react-modal";

import { Container, TransactionTypeContainer, RadioBox } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}
export function NewTransactionModal({
  isOpen,
  onRequestClose,
}: NewTransactionModalProps) {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("deposit");

  const { createTransaction } = useTransactions();

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();
    await createTransaction({ title, amount: value, category, type });

    setTitle("");
    setValue(0);
    setCategory("");
    setType("");

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <h1>Cadastrar nova transação</h1>
      <button onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="Fechar modal" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <input
          type="text"
          name="titulo"
          value={title}
          onChange={(val) => setTitle(val.target.value)}
          placeholder="titulo"
        />
        <input
          type="number"
          name="valor"
          value={value}
          onChange={(val) => setValue(Number(val.target.value))}
          placeholder="valor"
        />
        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>
        <input
          type="text"
          name="categoria"
          value={category}
          onChange={(val) => setCategory(val.target.value)}
          placeholder="categoria"
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
