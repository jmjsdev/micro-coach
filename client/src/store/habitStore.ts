import { create } from 'zustand';
import type { Habit } from '@shared/types';

interface HabitState {
  habits: Habit[];
  selectedHabit: Habit | null;
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  removeHabit: (id: string) => void;
  setSelectedHabit: (habit: Habit | null) => void;
}

export const useHabitStore = create<HabitState>((set) => ({
  habits: [],
  selectedHabit: null,
  setHabits: (habits) => set({ habits }),
  addHabit: (habit) => set((state) => ({ habits: [habit, ...state.habits] })),
  updateHabit: (id, updates) =>
    set((state) => ({
      habits: state.habits.map((h) => (h.id === id ? { ...h, ...updates } : h)),
    })),
  removeHabit: (id) =>
    set((state) => ({
      habits: state.habits.filter((h) => h.id !== id),
    })),
  setSelectedHabit: (habit) => set({ selectedHabit: habit }),
}));
