import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../service/api";

interface TransactionProps {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  data: string;
  createAt: string;
}
interface TransactionsContextProps {
  children: ReactNode;
}

interface TransactionContextData {
  transactions: TransactionProps[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<TransactionProps, "id" | "data" | "createAt">;

const TransactionsContext = createContext<TransactionContextData>(
  {} as TransactionContextData
);

export function TransactionsProvider({ children }: TransactionsContextProps) {
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);

  useEffect(() => {
    api("transactions").then((response) =>
      setTransactions(response.data.transactions)
    );
  });

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transaction", {
      ...transactionInput,
      createAt: new Date(),
    });
    console.log(response.data);
    const { transaction } = response.data;
    setTransactions((oldState) => [...oldState, transaction]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  return useContext(TransactionsContext);
}
