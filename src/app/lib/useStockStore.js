import { create } from 'zustand';

const useStore = create((set) => ({
  budget: 0,
  expenses: 0,
  balance: 0,
  history: [],
  setBudget: (budget) => set((state) => ({ budget, balance: budget - state.expenses })),
  setExpenses: (expenses) => set((state) => ({ expenses, balance: state.budget - expenses })),
  setHistory: (history) => set({ history }),
}));

export default useStore;